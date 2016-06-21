var emailApp = angular.module('emailApp');
emailApp.directive('imageProperties',function(){
    return {
        restrict: "E",
        scope:{
            image:'=element',
            compute:'=compute'
        },
        templateUrl: 'app/templates/properties/image.template.html'
    }
});
