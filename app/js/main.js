var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'LocalStorageModule',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.controller('MainController', [
    '$scope',
    'localStorageService',
    '$templateCache',
    'dragulaService',
    '$timeout',
    '$interval',
    '$log',
    'repositionTooltip',
    MainController
]);

function MainController(
    $scope,
    localStorageService,
    $templateCache,
    dragulaService,
    $timeout,
    $interval,
    $log,
    repositionTooltip
){
    var mainVM = this;
    $templateCache.removeAll();
    var timeoutWatch = null;
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
                                "type": "img",
                                "src": "app/img/default.jpg",
                                "height": 186.66666666666666,
                                "width": 280
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
    var page = store.get('page');
    mainVM.resetData = resetData;
    mainVM.currentElement = null;

    if(!page){
        store.set('page', defaultPage);
        page = defaultPage;
    }

    mainVM.page = page;
    $interval(function () {
        $timeout.cancel(timeoutWatch);
        save();
    }, 30000);
    var unbind = $scope.$watch('mainVM.page', syncData, true);
    dragulaService.options($scope, 'sections-bag', sectionsBagConfig());
    dragulaService.options($scope, 'elements-bag', elementsBagConfig());
    $scope.$on('elements-bag.drag', handleTooltipOnDrag);
    $scope.$on('elements-bag.over', handleTooltipOnOver);
    $scope.$on('elements-bag.drop', handleTooltipOnDrop);
    $scope.$on('sections-bag.drop', handleTooltipOnDrop);

    ///////////////////
    function save(){
        store.set('page', mainVM.page);
        mainVM.saving = true;
        $timeout(function () {
            mainVM.saving = false;
        }, 2000);
    }
    function syncData() {
        $timeout.cancel(timeoutWatch);
        timeoutWatch = $timeout(function () {
            save();
        }, 2000);
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
                return $(handle).is('.wrap-ink-container,.section-template-handle');
            },
            mirrorContainer: $('.email-builder-body')[0]
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
                return !$(el).find('[contenteditable]').length;
            },
            mirrorContainer: $('.email-builder-body')[0]
        };
    }
    function handleTooltipOnDrag(dragulaEvent,el,source){
        var $sections = $('.section');
        $('.column-cell',$sections).height(0);
        $sections.each(function (i,section) {
           var columns = $(this).find('.column-cell');
            if(!columns.length || columns.length === 1){
                return;
            }
            var heights = columns.map(function () {
                return $(this).height();
            }).get();

            var maxHeight = Math.max.apply(this,heights);
            columns.height(maxHeight);
        });
    }
    function handleTooltipOnOver(){
        //console.log(arguments);
    }
    function handleTooltipOnDrop(dragulaEvent,el,target,source,sibling){
        $timeout(repositionTooltip);
        $('.column-cell').height(0);

        if(dragulaEvent.name === "sections-bag.drop"){
            return;
        }

        var dragged = $(el);
        var $element = $(dragged.children().get(0));
        var $source = $(source);

        var shouldRereateTooltip =
            !$source.is(target) // linking occurs only when dropping outside of local bag
            && !$source.is('.new-elements,.new-section') // we do not want to do this to new elements
            && $element.is('.tooltipstered'); // only recrate tooltip, if existed before dragging

        if(shouldRereateTooltip){
            $scope.$apply(function () {
                $element.scope().element.tooltipstered = true;
            });
        }

    }
    function resetData() {
        unbind();
        store.clear();
        $timeout(function () {
            window.location.reload(false);
        });
    }

}

