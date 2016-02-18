var emailApp = angular.module('emailApp');
emailApp.directive('paddingProperty',function(){
    return {
        restrict: "E",
        scope:{
            style:'=elementStyle'
        },
        templateUrl: 'app/templates/properties/padding-property.template.html'
    }
});
