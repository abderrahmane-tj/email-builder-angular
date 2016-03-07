var emailApp = angular.module('emailApp');
emailApp.directive('pageElement',['$templateRequest','$compile',function($templateRequest,$compile){
    return {
        restrict: "A",
        scope: true,
        link: link,
        controller: controller
    };
    function link($scope, element, attrs){
        if(!$scope.element){
            return;
        }
        $templateRequest(elementTemplate($scope.element.type)).then(function (html) {
            var template = angular.element(html);
            template.attr('highlight',"{name:'element', type:'exactly'}");
            template.attr('ng-style',"element.style");
            element.append(template);
            $compile(template)($scope);
        });
    }
    function controller($scope){
        $scope.elementData = {};
    }
    function elementTemplate(type){
        var dict = {
            'p':'app/templates/elements/paragraphe.template.html',
            'img':'app/templates/elements/image.template.html'
        };
        return dict[type];
    }
}]);