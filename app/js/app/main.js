angular.module('emailApp', [
    'emailApp.services',
    'ngSanitize',
    angularDragula(angular)
])
.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}])
.controller('MainController', [
    '$scope', 'appCache', '$timeout', '$interval',
    '$window', '$http','$q','emailBuilder', 'jqSelectOnFocus',
    MainController
]);

function MainController($scope, appCache, $timeout,
    $interval, $window, $http, $q, emailBuilder, jqSelectOnFocus
){
    var mainVM = this;
    mainVM.resetData = resetData;
    mainVM.importData = importData;
    mainVM.exportData = exportData;
    mainVM.page = null;
    mainVM.sectionsTemplates = null;
    mainVM.elementsTemplates = null;
    mainVM.localDev = ($window.location.hostname === 'localhost');
    mainVM.baseURL = document.URL.substr(0,document.URL.lastIndexOf('/'));
    mainVM.iframeMode = inIframe();
    var dirty = true;
    mainVM.showHTML = showHTML;
    mainVM.preview = preview;
    mainVM.closeBuilder = closeBuilder;
    mainVM.emailPreview = false;
    mainVM.previewParams = null;

    var unbind = null; // variable used for watching mainVM.page
    var timeoutWatch = null; // A Timeout used for syncing

    handlePage();

    ///////////////////
    function handlePage(){
        getData().then(function (response) {
            var defaultPage = response[0];
            mainVM.sectionsTemplates = response[1];
            mainVM.elementsTemplates = response[2];

            // fill page with default content or previous version
            mainVM.page = initPage(defaultPage);

            // save page automatically every 3 seconds
            $interval(function () {
                $timeout.cancel(timeoutWatch);
                save();
            }, 3000);

            // watch page for changes
            unbind = $scope.$watch('mainVM.page', syncData, true);
        });
    }
    function getData(){
        return $q.all([
            appCache.get('default-page'),
            appCache.get('sections-templates'),
            appCache.get('elements-templates')
        ]);
    }
    function initPage(defaultPage){
        if(window.parent['email-builder-data']){
            return window.parent['email-builder-data'];
        }
        var page = store.get('page');
        if(!page){
            store.set('page', defaultPage);
            page = defaultPage;
        }
        return page;
    }
    function save(){
        if(!dirty){
            return;
        }
        store.set('page', mainVM.page);
        dirty = false;
        mainVM.saving = true;
        $timeout(function () {
            mainVM.saving = false;
        }, 2000);
    }
    function syncData() {
        $timeout.cancel(timeoutWatch);
        dirty = true;
        timeoutWatch = $timeout(function () {
            save();
        }, 2000);
    }
    function resetData() {
        unbind();
        store.clear();
        $timeout(function () {
            window.location.reload(false);
        });
    }
    function importData(){
        mainVM.page = JSON.parse($('#import-data').val());
    }
    function exportData(){
        var data = "text/json;charset=utf-8,"
            + encodeURIComponent(JSON.stringify(mainVM.page));
        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'email-builder_data.json';
        document.body.appendChild(a);
        a.click();
    }
    function buildHTML(){
        var result = emailBuilder.run(mainVM.page);
        mainVM.emailHtml = result.compiledHtml;
        return result;
    }
    function showHTML(){
        buildHTML();
        var modalHTML = '<div class="remodal" data-remodal-id="modal">\n  <button data-remodal-action="close" class="remodal-close"></button>\n  <h1>Copy the email\'s HTML</h1>\n  <textarea class=\'auto-select html-export\' autofocus>'+mainVM.emailHtml+'</textarea>\n  <button data-remodal-action="close" class="remodal-confirm">OK</button>\n</div>\n';
        var modal = $(modalHTML);
        jqSelectOnFocus(modal.find('.auto-select'));
        var instance = modal.remodal({hashTracking:false});
        instance.open();
        $(document).on('closed', '.remodal', function (e) {
            instance.destroy();
        });
    }
    function preview(){
        var previewIFrame = $('#preview');
        previewIFrame.attr('src','');
        mainVM.emailPreview = !mainVM.emailPreview;
        if(!mainVM.emailPreview){
            return;
        }

        var result = buildHTML();
        mainVM.previewParams = {
            pageStyles: result.pageStyles,
            sections: result.content
        };

        $timeout(function(){
            previewIFrame.attr('src',mainVM.baseURL+'/preview.html');
        });
    }
    function closeBuilder(){
        var result = buildHTML();
        window.parent['email-builder-callback']({
            data: mainVM.page,
            compiledHtml: result.compiledHtml,
            content: result.content,
            pageStyle: result.pageStyles,
            pageTemplate: result.pageTemplate
        });
    }
    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
}

