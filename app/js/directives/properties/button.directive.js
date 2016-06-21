var emailApp = angular.module('emailApp');
emailApp.directive('buttonProperties',function(){
    return {
        restrict: "E",
        scope:{
            button:'=element',
            compute:'=compute'
        },
        templateUrl: 'app/templates/properties/button.template.html'
    }
});
