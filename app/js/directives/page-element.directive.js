var emailApp = angular.module('emailApp');
emailApp.directive('pageElement',['$templateRequest','$compile',function($templateRequest,$compile){
    return {
        restrict: "A",
        //replace: true,
        scope: true,
        link: function($scope, element, attrs){
            if(!$scope.element){
                return;
            }
            $templateRequest(elementTemplate()).then(function (html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)($scope);
            });
            function elementTemplate(){
                var dict = {
                    'p':'app/templates/elements/paragraphe.template.html',
                    'img':'app/templates/elements/image.template.html'
                };
                return dict[$scope.element.type];
            }
        },
        controller: function($scope){
            $scope.elementData = {};
        }
    }
}]);