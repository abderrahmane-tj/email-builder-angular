var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'LocalStorageModule',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.controller('MainController', [
    '$scope', '$templateCache', 'dragulaService', '$timeout', '$interval',
    '$window', 'repositionTooltip', '$http','$q',
    MainController
]);

function MainController($scope, $templateCache, dragulaService, $timeout,
    $interval, $window, repositionTooltip, $http, $q
){
    var mainVM = this;
    mainVM.resetData = resetData;
    mainVM.importData = importData;
    mainVM.exportData = exportData;
    mainVM.page = null;
    mainVM.currentElement = null;
    mainVM.sectionsTemplates = null;
    mainVM.elementsTemplates = null;
    mainVM.localDev = ($window.location.hostname === 'localhost');
    mainVM.dirty = true;

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

            handleDragAndDrop();
            $timeout(function () {
                handleAutoScroll();
                handlePageScroll();
            });
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
    function handleDragAndDrop(){
        dragulaService.options($scope, 'sections-bag', sectionsBagConfig());
        dragulaService.options($scope, 'elements-bag', elementsBagConfig());
        $scope.$on('elements-bag.drag', handleDrag);
        $scope.$on('elements-bag.over', handleOver);
        $scope.$on('elements-bag.drop', handleDrop);
        $scope.$on('sections-bag.drop', handleDrop);
    }
    function sectionsBagConfig(){
        return {
            copy: function (el, source) {
                return $(source).hasClass('new-section');
            },
            accepts: function (el, source) {
                return !$(source).hasClass('new-section');
            },
            moves: function(el, source, handle, sibling){
                var $handle = $(handle);
                var dragginTemplate = $handle.parents('.section-template').length > 0;
                return $handle.is('.container-wrapper,.section-template') || dragginTemplate;
            }
        };
    }
    function elementsBagConfig(){
        return {
            copy: function (el, source) {
                return $(source).hasClass('new-elements');
            },
            accepts: function(el, target, source, sibling){
                return !$(target).hasClass('new-elements');
            },
            moves: function (el, source, handle, sibling) {
                var hasReasonsToDrag =
                    !$(el).find('[contenteditable]').length
                    && !$(handle).is('.resize-handle');
                return hasReasonsToDrag;
            }
        };
    }
    function handleDrag(dragulaEvent,el,source){
        var $sections = $('.section');
        $('.column-cell',$sections).height(0);
        $sections.each(function (i,section) {
           var columns = $(this).find('.column-cell');
            //if(!columns.length || columns.length === 1){
            //    return;
            //}
            var heights = columns.map(function () {
                return $(this).height();
            }).get();

            var maxHeight = Math.max.apply(this,heights);
            columns.height(maxHeight);
        });
    }
    function handleOver(){ }
    function handleDrop(dragulaEvent,el,target,source,sibling){
        $timeout(repositionTooltip);
        $('.column-cell').height(0);

        if(dragulaEvent.name === "sections-bag.drop"){
            return;
        }

        var dragged = $(el);
        var $element = $(dragged.children().get(0));
        var $source = $(source);

        var shouldRecreateTooltip =
            !$source.is(target) // linking occurs only when dropping outside of local bag
            && !$source.is('.new-elements,.new-section') // we do not want to do this to new elements
            && $element.is('.tooltipstered'); // only recrate tooltip, if existed before dragging
        if(shouldRecreateTooltip){
            $scope.$apply(function () {
                $element.scope().element.tooltipstered = true;
            });
        }

    }
    function handleAutoScroll(){
        var elementsBag = dragulaService.find($scope,"elements-bag");
        var sectionsBag = dragulaService.find($scope,"sections-bag");
        var scroll = autoScroll([
            document.querySelector('.autoscroll-me-please')
        ],{
            margin: 30,
            pixels: 15,
            scrollWhenOutside: true,
            autoScroll: function(){
                return this.down && (
                        elementsBag.drake.dragging
                        || sectionsBag.drake.dragging
                    );
            }
        });

    }
    function handlePageScroll(){
        var timeout = undefined;
        $('.page-flex').bind('scroll',function(){
            if(timeout){
                $timeout.cancel(timeout);
            }else{
                $(document.body).addClass('no-tooltip');
            }
            timeout = $timeout(function () {
                repositionTooltip();
                $(document.body).removeClass('no-tooltip');
                timeout = undefined;
            },250);
        });
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
}

