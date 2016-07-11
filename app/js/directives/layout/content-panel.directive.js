angular.module('emailApp').directive('contentPanel',['jqSelectOnFocus', function(jqSelectOnFocus){
    return {
        restrict: "A",
        scope:true,
        link: link,
        controller:function($scope){}
    };
    function link($scope,element,attrs){
        jqSelectOnFocus($("#data-dump"));
    }
}]);