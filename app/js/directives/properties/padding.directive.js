var emailApp = angular.module('emailApp');
emailApp.directive('paddingProperty', [
    'computeProperty',
    function (compute) {
    return {
        restrict: "E",
        scope: {
            element: '='
        },
        templateUrl: 'app/templates/properties/padding.template.html',
        link: link
    };
    function link($scope, element, attrs) {
        $scope.compute = compute;
        ///////
    }
}]);
