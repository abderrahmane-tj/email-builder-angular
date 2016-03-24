var emailApp = angular.module('emailApp');
emailApp.directive('pageElement',['$templateRequest','$compile','$timeout','repositionTooltip',
    function($templateRequest,$compile, $timeout,repositionTooltip){
    return {
        restrict: "A",
        scope: true,
        link: link
    };
    function link($scope, element, attrs){
        if(!$scope.element){
            return;
        }
        $templateRequest(elementTemplate($scope.element.type))
            .then(buildPageElement)
            .then(handleFreshElement);

        /////////////////////////////////////////////
        function buildPageElement(html) {
            element.addClass($scope.element.type+'-element');
            var template = angular.element(html);
            template.attr('highlight',"{name:'element', type:'exactly'}");
            template.attr('ng-style',"element.style");
            template.attr('data-block-type','element');
            template.attr('data-element-type',$scope.element.type);
            element.append(template);
            $compile(template)($scope);
            //console.log($scope.element);
        }
        // adding new elements to the page moves elements.
        // some features may need manual repositionning
        // like the tooltip
        function handleFreshElement(){
            $timeout(function () {
                repositionTooltip();
            });
        }
        function elementTemplate(type){
            var dict = {
                'text':'app/templates/elements/text.template.html',
                'img':'app/templates/elements/image.template.html',
                'heading1':'app/templates/elements/heading1.template.html'
            };
            return dict[type];
        }
    }
}]);