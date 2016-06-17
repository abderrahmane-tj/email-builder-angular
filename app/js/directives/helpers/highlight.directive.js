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

        if(options.name === 'element'){
            highlighted = element;

            // if the element is being built, check if it is the current element
            // so that we could cssCurrentElement it
            if(($scope.element === $scope.pageVM.currentElement)){
                highlighted.addClass('current-element');
            }
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
            var itIsNotTheParentsBusiness = preventBubbling(options.name);
            var editorIsSelecting = $page.hasClass('editor-selecting');
            var ownEditorOpen =
                element.find('.editing').length > 0
                && element.hasClass('current-element');
            var hasReasonsToReturn =
             itIsNotTheParentsBusiness || editorIsSelecting || ownEditorOpen;

            if(hasReasonsToReturn){

                return;
            }
            console.log(itIsNotTheParentsBusiness,editorIsSelecting,ownEditorOpen);
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
