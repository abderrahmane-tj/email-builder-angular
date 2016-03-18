var emailApp = angular.module('emailApp');
emailApp.directive('elementControls',['$compile','$timeout',function($compile,$timeout){
    return {
        restrict: "A",
        scope:true,
        controller:controller,
        link: link
    };

    function controller($scope){
        // function made accessible from directives that require elementControls
        $scope.make = this.make = function (content, elementScope) {
            $compile(content)(elementScope);
            $scope.content = content;
        };
    }

    function link($scope, element, attrs){
        element.bind('click', function (event) {
            var tooltipstered = $(this).is('.tooltipstered');
            if(tooltipstered){
                destroyTooltip(element);
            }else{
                // tooltip on current element should be destroyed if user clicks
                // on a [highlight]able element
                $('[highlight]').on('click', handleClickOnHighlight);

                createTooltip(element,$scope);
            }
        });
        function handleClickOnHighlight(event){
            event.stopPropagation();
            $('[highlight]').off('click', handleClickOnHighlight);
            if (!jQuery.contains(document, element[0])) {
                console.log('does not exist');
                return;
            }
            destroyTooltip(element);
        }
    }
    function destroyTooltip(element){
        if(element.is('.tooltipstered')){
            console.log('Destroy previous tooltip');
            element.tooltipster('destroy');
        }
    }
    function createTooltip(element, $scope){
        console.log('Create Tooltip');
        element.tooltipster({
            content: $scope.content,
            interactive: true,
            autoClose: false,
            restoration: 'none'
        }).tooltipster('show');
    }
}]);