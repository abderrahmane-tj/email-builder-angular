var emailApp = angular.module('emailApp');
emailApp.directive('imageProperties',function(){
    return {
        restrict: "E",
        scope:{
            element:'='
        },
        templateUrl: 'app/templates/properties/image-properties.template.html'
    }
});
