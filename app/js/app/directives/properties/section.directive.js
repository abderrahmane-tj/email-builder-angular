angular.module('emailApp')
.directive('sectionProperties',[
    function(){
    return {
        restrict: "E",
        scope:{
            section:'=element'
        },
        templateUrl: 'app/templates/properties/section.template.html'
    };
}]);
