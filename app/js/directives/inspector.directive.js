var emailApp = angular.module('emailApp');
emailApp.directive('inspector',['dragulaService',function(dragulaService){
    return {
        restrict: "E",
        replace: true,
        scope:{
            element: '=currentElement'
        },
        link:function($scope,element,attrs){
        },
        controller:function($scope){
            $scope.templates = [
                {
                    "style": {},
                    "type": "p",
                    "content": "Accusantium at consectetur dignissimos eum id illum laboriosam."
                }
            ];
        },
        templateUrl: 'app/templates/inspector.template.html'
    }
}]);