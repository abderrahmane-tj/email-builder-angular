var emailApp = angular.module('emailApp');
emailApp.directive('highlight',[
    '$compile',
    'preventBubbling',
    function(
        $compile,
        preventBubbling
    ){
    return {
        restrict: "A",
        scope:true,
        link: link
    };
    function link($scope,element,attrs,pageCtrl){
        var options = $scope.$eval(attrs.highlight);
        options.toggleClick = options.toggleClick || true;
        var highlighted = element;

        // In case we hover an element, whish in most cases has an inline layout
        // we want to highlight its container, a div of class
        // .element. as of this comment it is its direct parent
        if(options.name === 'element'){
            highlighted = element.closest('.element');
        }
        if(options.name === 'section'){
            //highlighted = element.find('.row:first');
        }


        var elementData = $scope[options.name];
        if(options.name === 'page'){
            elementData = $scope.mainVM.page;
        }
        var $page = $('.page');
        if(options.toggleClick){
            element.bind('click', onClick);
        }
        function onClick(event) {
            if(preventBubbling(options.name) || $page.hasClass('editor-selecting')){
                return;
            }
            $('.current-element')
                .removeClass('current-element');

            // option.name would be : page, section, column or element
            // which corresponds to $scope.page. $scope.section, ...
            // the following condition checks if we are clicking on the
            // currentElement. if so, we should uninspect it
            if(elementData === $scope.pageVM.currentElement){
                $scope.pageVM.assignElement(null);
            }else{
                $('#properties-anchor').trigger('click');
                $scope.pageVM.assignElement(elementData,{
                    page: true,
                    section: $scope.section,
                    column: $scope.column,
                    element: $scope.element
                });
                highlighted.addClass('current-element');
            }
            $scope.$apply();
        }
        element.bind('mouseenter', highlightElement);
        element.bind('mouseleave', unhighlightElement);

        function highlightElement(event) {
            $page.addClass('on-'+options.name);
            $('.highlight--'+options.name)
                .removeClass('highlight--'+options.name);
            highlighted.addClass('highlight--'+options.name);
        }
        function unhighlightElement() {
            $page.removeClass('on-'+options.name);
            highlighted.removeClass('highlight--'+options.name);
        }
    }
}]);
