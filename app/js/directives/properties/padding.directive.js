var emailApp = angular.module('emailApp');
emailApp.directive('paddingProperty', function () {
    return {
        restrict: "E",
        scope: {
            element: '=',
        },
        templateUrl: 'app/templates/properties/padding.template.html',
        controller: controller
    };
    function controller($scope) {
        $scope.$watch('element', function (element) {
            $scope.style = $scope.element.style;
            if ($scope.element.type === 'column') {
                $scope.style = $scope.element.wrapper.style;
            }
        });

    }
});
