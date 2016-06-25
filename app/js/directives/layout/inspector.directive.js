var emailApp = angular.module('emailApp');
emailApp.directive('inspector',[
    '$timeout',function($timeout){
    var blocks = {
        page: {},
        section: {},
        column: {
            spacing: ['padding']
        },
        image: {
            spacing: ['padding']
        },
        text: {
            spacing: ['padding']
        },
        button: {
            spacing: ['padding']
        },
        spacer: {

        },
        divider: {
            spacing: ['padding']
        }
    };
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'inspctVM',
        bindToController: true,
        scope:true,
        link: link,
        controller: controller,
        templateUrl: 'app/templates/inspector.template.html'
    };
    function link($scope,element,attrs){
        $timeout(function () {
            handleTabs();
        });
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
    }
    function controller($scope){
        var vm = this;

        vm.hasProperty = hasProperty;
        ////////
        function hasProperty(blockType, category, property){
            var possible = blocks[blockType][category];
            return $.inArray(property, possible) >= 0;
        }
    }
}]);