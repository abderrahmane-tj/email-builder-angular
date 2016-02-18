var emailApp = angular.module('emailApp');
emailApp.directive('borderProperty',function(){
    return {
        restrict: "E",
        scope:{
            style:'=elementStyle'
        },
        templateUrl: 'app/templates/properties/border-property.template.html'
    }
});
