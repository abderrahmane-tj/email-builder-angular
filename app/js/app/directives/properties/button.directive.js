angular.module('emailApp')
.directive('buttonProperties',function(){
    return {
        restrict: "E",
        scope:{
            button:'=element'
        },
        templateUrl: 'app/templates/properties/button.template.html'
    }
});
