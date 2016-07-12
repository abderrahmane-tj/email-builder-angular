angular.module('emailApp').directive('elementControls',
    ['$compile','$timeout','$templateRequest','preventBubbling',
        function($compile,$timeout,$templateRequest,preventBubbling){
    var directive = {
        restrict: "A",
        scope:true,
        controller:controller,
        link: link
    };

    function controller($scope){
        // function made accessible for directives that require elementControls
        $scope.make = this.make = function (templateName, elementScope) {
            var templateUrl =
                'app/templates/controls/'+templateName+'.template.html';
            $templateRequest(templateUrl).then(function(html) {
                var controls = angular.element(html);
                $compile(controls)(elementScope);
                $scope.controls = controls;
                $scope.linkElement.trigger('controls-loaded');
            });
        };
    }

    function link($scope, element, attrs){
        var highlighted = element.closest('.current-element');
        var elementType = highlighted.data('element-type');
        var blockType = highlighted.data('block-type');
        var controllableData = $scope[blockType];
        $scope.linkElement = element;

        createControls();
        //////////////////////////
        function createControls(){
            if(blockType === 'element'){
                if(highlighted.hasClass('disable-controls')){
                    return;
                }
            }
            element.one('controls-loaded',function(){
                element.append($scope.controls);
            });
        }
    }
    return directive
}]);