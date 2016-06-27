var emailApp = angular.module('emailApp');
emailApp.directive('pageElement',['$templateRequest','$compile','$timeout',
    function($templateRequest,$compile, $timeout){
    return {
        restrict: "A",
        scope: true,
        link: link
    };
    function link($scope, element, attrs){
        if(!$scope.element){
            return;
        }
        element.addClass('id-'+$scope.element.$$hashKey.replace(':','-'));
        element.addClass($scope.element.type+'-element');
        $templateRequest(elementTemplate($scope.element.type))
            .then(buildPageElement)
            .then(handlePostElementCompilation);

        /////////////////////////////////////////////
        function buildPageElement(html) {
            var template = angular.element(html);
            element.append(template);
            $compile(template)($scope);
        }
        function handlePostElementCompilation(){
            // adding new elements to the page or dragging and dropping of elements
            // outside its source container, triggers relinking of pageElement,
            // some features may need manual reTriggering, like tooltip
            // repositionning
            element.trigger('compiled-'+$scope.element.$$hashKey);
        }
        function elementTemplate(type){
            return 'app/templates/elements/'+type+'.template.html';
        }
    }
}]);