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
        }
    }

    function link($scope, element, attrs, elementControls){
        $templateRequest('app/templates/controls/image.template.html')
            .then(function(html) {
                var template = angular.element(html);
                elementControls.make(template, $scope);
            });
    }
}]);