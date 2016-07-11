angular.module('emailApp').directive('sectionControls',['$compile','$templateRequest',function($compile,$templateRequest){
    return {
        restrict: "A",
        scope:true,
        require:"elementControls",
        link:link,
        controller: controller
    };

    function controller($scope){
        $scope.removeElement = removeElement;
        $scope.cloneElement = cloneElement;

        //////////
        function removeElement($event) {
            $event.preventDefault();
            $scope.mainVM.page.sections = $scope.mainVM.page.sections.filter(function (item) {
                return $scope.section !== item
            });
            $scope.pageVM.assignElement(null);
        }
        function cloneElement($event) {
            $event.preventDefault();
            var index = $scope.mainVM.page.sections.indexOf($scope.section);
            $scope.mainVM.page.sections.splice(index+1, 0, angular.copy($scope.section));
        }
    }

    function link($scope, element, attrs, elementControls){
        elementControls.make('section', $scope);
    }
}]);