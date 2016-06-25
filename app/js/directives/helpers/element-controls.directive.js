var emailApp = angular.module('emailApp');
emailApp.directive('elementControls',
    ['$compile','$timeout','$templateRequest','repositionTooltip','preventBubbling',
        function($compile,$timeout,$templateRequest,repositionTooltip,preventBubbling){
    return {
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
            });
        };
    }

    function link($scope, element, attrs){
        var highlighted = element.closest('.current-element');
        var elementType = highlighted.data('element-type');
        var blockType = highlighted.data('block-type');
        var controllableData = $scope[blockType];

        if(blockType === 'element'){
            if(!highlighted.hasClass('disable-tooltip')){
                createTooltip();
            }
        }else{
            createTooltip();
        }
        //////////////////////////
        function createTooltip(){
            $timeout(function () {
                element.tooltipster({
                    content: $scope.controls,
                    interactive: true,
                    autoClose: false,
                    restoration: 'none',
                    theme: 'tooltipster-light'
                }).tooltipster('show');
            });
        }
    }
}]);