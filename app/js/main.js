var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'LocalStorageModule',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.controller('MainController', [
    '$scope', '$templateCache', 'dragulaService', '$timeout', '$interval',
    '$window', 'repositionTooltip',
    MainController
]);

function MainController($scope, $templateCache, dragulaService, $timeout,
    $interval, $window, repositionTooltip
){
    var mainVM = this;
    mainVM.resetData = resetData;
    mainVM.importData = importData;
    mainVM.exportData = exportData;
    mainVM.currentElement = null;
    mainVM.localDev = ($window.location.hostname === 'localhost');
    mainVM.dirty = true;
    mainVM.page = null;

    var defaultPage = {
        "id": "page-123ashd",
        "type": "page",
        "style": {
            "background-color": ""
        },
        "sections": [
            {
                "template-name": "[100%]",
                "style": {},
                "type": "section",
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "12",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<h1 style=\"text-align: center;\">Hello Joseph</h1>"
                            }
                        ]
                    }
                ]
            },
            {
                "template-name": "[ 50% | 50% ]",
                "style": {},
                "type": "section",
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "6",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula ante nec velit molestie commodo. Vivamus quis suscipit dui. Etiam quis laoreet enim. Praesent ornare aliquam dolor ut scelerisque. Aliquam varius tincidunt eros vel ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec nec consectetur leo, vitae dictum leo. Cras semper nisi eget auctor blandit. Cras mattis risus et libero mollis, sit amet mollis ex placerat. Proin nibh velit, ornare sit amet elit nec, tempor cursus turpis.</p>"
                            }
                        ]
                    },
                    {
                        "type": "column",
                        "grid-width": "6",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "image",
                                "src": "app/img/default.jpg",
                                "height": 186.66666666666666,
                                "width": 280,
                                "alignment": "center"
                            }
                        ]
                    }
                ]
            },
            {
                "template-name": "[100%]",
                "style": {},
                "type": "section",
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "12",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula ante nec velit molestie commodo. Vivamus quis suscipit dui.</p>"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    var unbind = null; // variable used for watching mainVM.page
    var timeoutWatch = null; // A Timeout used for syncing

    handlePage();

    ///////////////////
    function handlePage(){
        $templateCache.removeAll();
        mainVM.page = initPage();
        $interval(function () {
            $timeout.cancel(timeoutWatch);
            save();
        }, 3000);
        unbind = $scope.$watch('mainVM.page', syncData, true);
        // dragula does not seem to like $timeout
        handleDragAndDrop();
        $timeout(function () {
            handleAutoScroll();
            handlePageScroll();
        });
    }
    function initPage(){
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
                return $(handle).is('.container-wrapper,.section-template-handle');
            },
            mirrorContainer: $('.email-builder-body')[0]
        };
    }
    function elementsBagConfig(){
        return {
            revertOnSpill: true,
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
            },
            mirrorContainer: $('.email-builder-body')[0]
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
        console.log('shouldRecreateTooltip : '+shouldRecreateTooltip);
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

