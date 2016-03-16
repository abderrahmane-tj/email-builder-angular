var emailApp = angular.module('emailApp');
emailApp.directive('imageControls',['$compile',function($compile){
    return {
        restrict: "A",
        scope:true,
        link:function($scope, element, attrs){
            element.bind('click', function (event) {
                var controls = $('<a href="#" ng-click="removeElement($event)" class="element-control" style="color: red;"><i class="fa fa-trash"></i></a>');
                $compile(controls)($scope);
                element.tooltipster({
                    content: controls,
                    interactive: true
                }).tooltipster('show');
            });
        },
        controller:function($scope){
            $scope.removeElement = function ($event) {
                $event.preventDefault();
                var array = $scope.column.elements.filter(function (item) {
                    return $scope.element !== item
                });

                $scope.column.elements = array;
            }
        }
    }
}]);