var emailApp = angular.module('emailApp');
emailApp.directive('pageElement',['$templateRequest','$compile',function($templateRequest,$compile){
    return {
        restrict: "A",
        scope: true,
        link: link
    };
    function link($scope, element, attrs){
        if(!$scope.element){
            return;
        }
        element.addClass($scope.element.type+'-element');
        $templateRequest(elementTemplate($scope.element.type))
            .then(buildPageElement);

        function buildPageElement(html) {
            var template = angular.element(html);
            template.attr('highlight',"{name:'element', type:'exactly'}");
            template.attr('ng-style',"element.style");
            template.attr('data-block-type','element');
            template.attr('data-element-type',$scope.element.type);
            element.append(template);
            $compile(template)($scope);
            //console.log($scope.element);
        }
    }
    function elementTemplate(type){
        var dict = {
            'text':'app/templates/elements/text.template.html',
            'img':'app/templates/elements/image.template.html',
            'heading1':'app/templates/elements/heading1.template.html'
        };
        return dict[type];
    }
}]);