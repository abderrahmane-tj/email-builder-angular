var emailApp = angular.module('emailApp');
emailApp.directive('buttonProperties',function(){
    return {
        restrict: "E",
        scope:{
            element:'='
        },
        templateUrl: 'app/templates/properties/button-properties.template.html'
    }
});
