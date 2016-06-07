var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.config(['$compileProvider', function ($compileProvider) {
    //todo: turn debugInfo off in production
    $compileProvider.debugInfoEnabled(true);
}]);
emailApp.controller('MainController', [
    '$scope', '$templateCache', 'dragulaService', '$timeout', '$interval',
    '$window', 'repositionTooltip', '$http','$q','emailBuilder', 'jqSelectOnFocus',
    MainController
]);

function MainController($scope, $templateCache, dragulaService, $timeout,
    $interval, $window, repositionTooltip, $http, $q, emailBuilder, jqSelectOnFocus
){
    var mainVM = this;
    mainVM.resetData = resetData;
    mainVM.importData = importData;
    mainVM.exportData = exportData;
    mainVM.page = null;
    mainVM.sectionsTemplates = null;
    mainVM.elementsTemplates = null;
    mainVM.localDev = ($window.location.hostname === 'localhost');
    mainVM.appURL = mainVM.localDev ? 'http://localhost/email-builder/' :
        'http://atj-remotedev.cloudapp.net/email-builder/';

    var dirty = true;
    mainVM.showHTML = showHTML;
    mainVM.preview = preview;
    mainVM.emailPreview = false;
    mainVM.previewParams = null;

    var unbind = null; // variable used for watching mainVM.page
    var timeoutWatch = null; // A Timeout used for syncing

    handlePage();

    ///////////////////
    function handlePage(){
        $templateCache.removeAll();
        getData().then(function (response) {
            var defaultPage = response[0].data;
            mainVM.sectionsTemplates = response[1].data;
            mainVM.elementsTemplates = response[2].data;

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
            $http.get('app/js/data/default-page.json',{cache:false}),
            $http.get('app/js/data/sections-templates.json',{cache:false}),
            $http.get('app/js/data/elements-templates.json',{cache:false})
        ]);
    }
    function initPage(defaultPage){
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
        unbind();

        store.set('page',JSON.parse($('#import-data').val()));

        $timeout(function () {
            window.location.reload(false);
        });
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
        mainVM.emailHtml = result[0];
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

        mainVM.previewParams = buildHTML(true)[1];

        $timeout(function(){
            previewIFrame.attr('src',mainVM.appURL+'app/templates/preview.html');
        });
    }
}

