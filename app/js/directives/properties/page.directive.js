var emailApp = angular.module('emailApp');
emailApp.directive('pageProperties',function(){
    return {
        restrict: "E",
        scope:{
            page:'=element',
            compute:'=compute'
        },
        templateUrl: 'app/templates/properties/page.template.html'
    };
});
