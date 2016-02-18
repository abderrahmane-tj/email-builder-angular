var emailApp = angular.module('emailApp');
emailApp.directive('inspector',function(){
    return {
        restrict: "E",
        replace: true,
        scope:{
            element: '=currentElement'
        },
        link:function($scope,element,attrs){
            // TODO: figure out how to make this permanent
            //$scope.style = $scope.element.style;
        },
        controller:function($scope){

        },
        templateUrl: 'app/templates/inspector.template.html'
    }
});