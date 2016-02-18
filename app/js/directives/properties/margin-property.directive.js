var emailApp = angular.module('emailApp');
emailApp.directive('marginProperty',function(){
    return {
        restrict: "E",
        scope:{
            style:'=elementStyle'
        },
        templateUrl: 'app/templates/properties/margin-property.template.html'
    }
});
