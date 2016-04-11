var emailApp = angular.module('emailApp');
emailApp.directive('inspector',[function(){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'inspctVM',
        bindToController: true,
        scope:true,
        //scope:{
        //    element: '=currentElement'
        //},
        link:function($scope,element,attrs){
        },
        controller:function($scope){
            var vm = this;
            vm.templates = [
                {
                    "style": {},
                    "type": "text",
                    "content": "<p>Edit me :-)</p>"
                },
                {
                    "style": {},
                    "type": "image",
                    "src": "app/img/default.jpg",
                    "alignment": "center"
                },
                {
                    "style": {},
                    "type": "button",
                    "text": "Button",
                    "url": "#",
                    "centered": false,
                    "coloring": "warning",
                    "sizing": "default",
                    "expanded": false
                }
            ];
            vm.sectionTemplate = [
                { "template-name": '[100%]',"style": {}, "type": "section", columns: [{ "type": "column", "grid-width": "12", "style": {}, "elements": []}]},
                { "template-name": '[ 50% | 50% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "6", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "6", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 33% | 33% | 33% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "4", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "4", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "4", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 33% | 60% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "4", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "8", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 60% | 30% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "8", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "4", "style": {}, "elements": []}
                    ]
                }
            ];
            handleTabs();
            handleExport();
            ///////////
            function handleTabs(){
                var tabsContainer = $('.tabs');
                var active = tabsContainer.find('.active');
                var inspectorPanels = $('.inspector-panel');
                activateTab(active);
                var tabs = tabsContainer.find('a');
                tabs.bind('click', onClick);

                function onClick(event) {
                    event.preventDefault();
                    tabsContainer.find('.active').removeClass('active');
                    activateTab($(this));
                }
                function activateTab(anchor){
                    anchor.addClass('active');
                    inspectorPanels.hide();
                    $(anchor.attr('href')).show();
                }
            }
            function handleExport(){
                $("#data-dump").focus(function() {
                    var $this = $(this);
                    $this.select();

                    // Work around Chrome's little problem
                    $this.mouseup(function() {
                        // Prevent further mouseup intervention
                        $this.unbind("mouseup");
                        return false;
                    });
                });
            }
        },
        templateUrl: 'app/templates/inspector.template.html'
    }
}]);