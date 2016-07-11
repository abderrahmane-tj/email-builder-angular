angular.module('emailApp')
.directive('backgroundImageProperty', [
    function () {
    var directive = {
        restrict: "E",
        replace: true,
        scope: {
            propertyClass: '@',
            rawStyle: '=bgImageRawStyle',
            style: '=bgImageStyle'
        },
        templateUrl: 'app/templates/properties/background-image.template.html',
        link: link
    };
    function link($scope, element, attrs) {
        $scope.process = process;
        ///////
        function process(){
            $scope.style['background-image']
                 = "url("+$scope.rawStyle['background-image']+")";
        }
    }
    return directive;
}]);
