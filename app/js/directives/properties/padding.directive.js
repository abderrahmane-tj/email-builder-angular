var emailApp = angular.module('emailApp');
emailApp.directive('paddingProperty', [function () {
    return {
        restrict: "E",
        scope: {
            element: '=',
            compute:'=compute'
        },
        templateUrl: 'app/templates/properties/padding.template.html'
    };
}]);
