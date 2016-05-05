var emailApp = angular.module('emailApp');
emailApp.directive('sectionControls',['$compile','$templateRequest',function($compile,$templateRequest){
    return {
        restrict: "A",
        scope:true,
        require:"elementControls",
        link:link,
        controller: controller
    };

    function controller($scope){
        $scope.removeElement = function ($event) {
            $event.preventDefault();
            $scope.mainVM.page.sections = $scope.mainVM.page.sections.filter(function (item) {
                return $scope.section !== item
            });
            $scope.pageVM.assignElement(null);
        }
    }

    function link($scope, element, attrs, elementControls){
        elementControls.make('section', $scope);
    }
}]);