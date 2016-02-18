var emailApp = angular.module('emailApp');
emailApp.directive('backgroundProperty',function(){
    return {
        restrict: "E",
        scope:{
            style:'=elementStyle'
        },
        templateUrl: 'app/templates/properties/background-property.template.html'
    }
});
