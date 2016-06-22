var emailApp = angular.module('emailApp');
emailApp.directive('imageProperties',function(){
    return {
        restrict: "E",
        scope:{
            image:'=element'
        },
        templateUrl: 'app/templates/properties/image.template.html'
    }
});
