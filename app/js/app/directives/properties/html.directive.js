angular.module('emailApp')
.directive('htmlProperties',['$timeout',function($timeout){
    return {
        restrict: "E",
        scope:{
            htmlElement:'=element'
        },
        templateUrl: 'app/templates/properties/html.template.html'
    };
}]);
