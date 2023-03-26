angular.module('emailApp').directive('removeWhiteSpace',[removeWhiteSpaceDirective]);
function removeWhiteSpaceDirective(){
    return {
        restrict: "A",
        scope:true,
        link: link
    };

    function link($scope, element, attrs){
        element.cleanWhitespace();
    }
}