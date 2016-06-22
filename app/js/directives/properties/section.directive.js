var emailApp = angular.module('emailApp');
emailApp.directive('sectionProperties',[
    'computeProperty',
    function(compute){
    return {
        restrict: "E",
        scope:{
            section:'=element'
        },
        templateUrl: 'app/templates/properties/section.template.html',
        controller: function($scope){
            $scope.compute = compute;
        }
    };
}]);
