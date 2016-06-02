var emailApp = angular.module('emailApp');
emailApp.directive('inspector',['$timeout',function($timeout){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'inspctVM',
        bindToController: true,
        scope:true,
        link: link,
        controller:function($scope){
        },
        templateUrl: 'app/templates/inspector.template.html'
    };
    function link($scope,element,attrs){
        $timeout(function () {
            handleTabs();
            handleExport();
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
        function handleExport(){
            console.log($("#data-dump").length);
            $("#data-dump").on('focus',function() {
                console.log('focused');
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
    }
}]);