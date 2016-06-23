var emailApp = angular.module('emailApp');
emailApp.directive('columnProperties',[
    function(){
    return {
        restrict: "E",
        scope:{
            column:'=element'
        },
        templateUrl: 'app/templates/properties/column.template.html'
    };
}]);
