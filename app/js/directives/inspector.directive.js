var emailApp = angular.module('emailApp');
emailApp.directive('inspector',function(){
    return {
        restrict: "E",
        replace: true,
        scope:{
            element: '=currentElement'
        },
        link:function($scope,element,attrs){
        },
        controller:function($scope){

        },
        templateUrl: 'app/templates/inspector.template.html'
    }
});