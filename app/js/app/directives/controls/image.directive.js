angular.module('emailApp').directive('imageControls',['$compile','$templateRequest',function($compile,$templateRequest){
    return {
        restrict: "A",
        require: "elementControls",
        scope:true,
        link:link,
        controller: controller
    };

    function controller($scope){
        $scope.removeElement = removeElement;
        $scope.cloneElement = cloneElement;

        ///////////////
        function removeElement($event) {
            $event.preventDefault();
            $scope.column.elements = $scope.column.elements.filter(function (item) {
                return $scope.element !== item
            });
            $scope.pageVM.assignElement(null);
        }
        function cloneElement($event) {
            $event.preventDefault();
            var index = $scope.column.elements.indexOf($scope.element);
            $scope.column.elements.splice(index+1, 0, angular.copy($scope.element));
        }
    }

    function link($scope, element, attrs, elementControls){
        elementControls.make('image', $scope);
    }
}]);