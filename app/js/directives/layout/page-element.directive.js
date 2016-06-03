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
            .then(handlePostElementCompilation);

        /////////////////////////////////////////////
        function buildPageElement(html) {
            element.addClass($scope.element.type+'-element');
            var template = angular.element(html);
            template.addClass('id-'+$scope.element.$$hashKey.replace(':','-'));
            template.data('element-id',$scope.element.$$hashKey);
            template.attr('highlight',"{name:'element', type:'exactly'}");
            template.attr('ng-style',"element.style");
            template.attr('data-block-type','element');
            template.attr('data-element-type',$scope.element.type);
            element.append(template);
            $compile(template)($scope);
        }
        function handlePostElementCompilation(){
            // adding new elements to the page or dragging and dropping of elements
            // outside its source container, triggers relinking of pageElement,
            // some features may need manual reTriggering, like tooltip
            // repositionning

            $timeout(function () {
                repositionTooltip();
            });
        }
        function elementTemplate(type){
            return 'app/templates/elements/'+type+'.template.html';
        }
    }
}]);