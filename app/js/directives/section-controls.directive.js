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
            $scope.page.sections = $scope.page.sections.filter(function (item) {
                return $scope.section !== item
            });
        }
    }

    function link($scope, element, attrs, elementControls){
        $templateRequest('app/templates/controls/section.template.html')
            .then(function(html) {
                var template = angular.element(html);
                elementControls.make(template, $scope);
            });
    }
}]);