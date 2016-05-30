var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'LocalStorageModule',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.config(['$compileProvider', function ($compileProvider) {
    // todo: disable debug. ps: disabling it will break getting scope from html. exemple : ($element.scope().element.tooltipstered = true;)
    //$compileProvider.debugInfoEnabled(false);
}]);
emailApp.controller('MainController', [
    '$scope', '$templateCache', 'dragulaService', '$timeout', '$interval',
    '$window', 'repositionTooltip', '$http','$q','emailBuilder',
    MainController
]);

function MainController($scope, $templateCache, dragulaService, $timeout,
    $interval, $window, repositionTooltip, $http, $q, emailBuilder
){
    var mainVM = this;
    mainVM.resetData = resetData;
    mainVM.importData = importData;
    mainVM.exportData = exportData;
    mainVM.page = null;
    mainVM.currentElement = null;
    mainVM.breadCrumb = {};
    mainVM.sectionsTemplates = null;
    mainVM.elementsTemplates = null;
    mainVM.localDev = ($window.location.hostname === 'localhost');
    mainVM.dirty = true;
    mainVM.showHTML = showHTML;
    mainVM.preview = preview;
    mainVM.emailPreview = false;

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
        if(!mainVM.dirty){
            return;
        }
        store.set('page', mainVM.page);
        mainVM.dirty = false;
        mainVM.saving = true;
        $timeout(function () {
            mainVM.saving = false;
        }, 2000);
    }
    function syncData() {
        $timeout.cancel(timeoutWatch);
        mainVM.dirty = true;
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
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mainVM.page));
        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'email-builder_data.json';
        document.body.appendChild(a);
        a.click();
    }
    function buildHTML(forPreview){
        forPreview = forPreview || false;
        mainVM.emailHtml = emailBuilder.run(mainVM.page, forPreview);
        return mainVM.emailHtml;
    }
    function showHTML(){
        buildHTML();
        swal({
            title: "Copy the email's HTML",
            text: "<textarea class='swal-email-html'>"+mainVM.emailHtml+"</textarea>",
            html: true
        });
    }
    function preview(){
        var previewIFrame = $('#preview');
        previewIFrame.attr('src','');

        mainVM.emailPreview = !mainVM.emailPreview;

        if(!mainVM.emailPreview){
            return;
        }

        $timeout(function(){
            previewIFrame.attr('src','data:text/html;charset=utf-8,' + encodeURI(buildHTML(true)));
        });


        //swal({
        //    title: "Coming Soon",
        //    text: "Preview feature coming soon. Work in progress"
        //});
    }
}

