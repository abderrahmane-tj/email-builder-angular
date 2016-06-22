var emailApp = angular.module('emailApp');
emailApp.directive('columnProperties',[
    'computeProperty',
    function(compute){
    return {
        restrict: "E",
        scope:{
            column:'=element'
        },
        templateUrl: 'app/templates/properties/column.template.html',
        controller: function($scope){
            $scope.compute = compute;
        }
    };
}]);
