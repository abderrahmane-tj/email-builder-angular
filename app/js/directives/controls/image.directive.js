var emailApp = angular.module('emailApp');
emailApp.directive('imageControls',['$compile','$templateRequest',function($compile,$templateRequest){
    return {
        restrict: "A",
        require: "elementControls",
        scope:true,
        link:link,
        controller: controller
    };

    function controller($scope){
        $scope.removeElement = function ($event) {
            $event.preventDefault();
            $scope.column.elements = $scope.column.elements.filter(function (item) {
                return $scope.element !== item
            });
            $scope.pageVM.assignElement(null);
        }
    }

    function link($scope, element, attrs, elementControls){
        elementControls.make('image', $scope);
    }
}]);