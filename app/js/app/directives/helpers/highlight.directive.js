angular.module('emailApp').directive('highlight',[
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
        var blockType = attrs.highlightBlock;
        var elementData = $scope[blockType];
        var $page = $('.page');
        var controlsScope = null;
        if(blockType === 'element'){
            // if the element is being built, check if it is the current element
            // so that we could cssCurrentElement it
            if(($scope.element === $scope.pageVM.currentElement)){
                makeCurrent();
            }
        }
        if(blockType === 'page'){
            elementData = $scope.mainVM.page;
        }
        element.bind('click', onClick);
        element.bind('mouseenter', onMouseEnter);
        element.bind('mouseleave', onMouseLeave);
        element.bind('destroy-element-controls', onDestroyElementControls);
        ///////
        function onClick(event) {
            var shouldPreventBubbling = preventBubbling(blockType);
            var editorIsSelecting = $page.hasClass('editor-selecting');
            var ownEditorOpen = element.find('.editing').length > 0 && element.hasClass('current-element');
            var clickOnControls = $(event.target).closest('.element-control').length;
            var shouldReturn = shouldPreventBubbling || editorIsSelecting || ownEditorOpen || clickOnControls;

            if(shouldReturn){
                return;
            }
            var $currentElement = $('.current-element');
                $currentElement
                    .trigger('destroy-element-controls')
                    .removeClass('current-element');
            if(elementData === $scope.pageVM.currentElement){
                removeControls();
                $scope.pageVM.assignElement(null);
            }else{
                makeCurrent();
            }
            $scope.$apply();
        }

        function makeCurrent(){
            $('#properties-anchor').trigger('click');
            $scope.pageVM.assignElement(elementData,{
                page: true,
                section: $scope.section,
                column: $scope.column,
                element: $scope.element
            });
            element.addClass('current-element');
            if(attrs.highlightControls){
                addControls();
            }
        }
        function addControls(){
            var controls = angular.element(
                "<div"+
                    " class='controls' element-controls "
                    +attrs.highlightControls
                +"></div>"
            );
            if(!element.hasClass('disable-controls')){
                element.append(controls);
            }
            controlsScope = $scope.$new(false);
            $compile(controls)(controlsScope);
        }
        function removeControls(){
            if(element.find('.controls').length){
                // controlsScope.$destroy();
                element.find('.controls').remove();
            }
        }
        function onMouseEnter(event) {
            $page.addClass('on-'+blockType);
            $('.highlight--'+blockType).removeClass('highlight--'+blockType);
            element.addClass('highlight--'+blockType);
        }
        function onMouseLeave() {
            $page.removeClass('on-'+blockType);
            element.removeClass('highlight--'+blockType);
        }
        function onDestroyElementControls(){
            removeControls();
        }
    }
}]);
