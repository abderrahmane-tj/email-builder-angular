angular.module('emailApp').directive('htmlHandler',['$sce',function($sce){
    return {
        restrict: "A",
        scope:true,
        controller: ["$scope",controller]
    };
    function controller($scope){
        $scope.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };
    }
}]);