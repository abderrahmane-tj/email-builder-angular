angular.module('emailApp')
.directive('pageProperties',function(){
    return {
        restrict: "E",
        scope:{
            page:'=element'
        },
        templateUrl: 'app/templates/properties/page.template.html'
    };
});
