var emailApp = angular.module('emailApp');
emailApp.directive('page',[
    'dragulaService','$timeout','repositionTooltip',
    pageDirective
]);

function pageDirective(dragulaService,$timeout,repositionTooltip){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'pageVM',
        controller: controller,
        link:link,
        templateUrl: 'app/templates/page.template.html'
    };
    function controller($scope){
        var vm = this;
        vm.assignElement = assignElement;
        vm.breadcrumb = {page:true};
        vm.currentElement = null;
        handleDragAndDrop();
        handleAutoScroll();
        handlePageScroll();
        /////////////////////
        function assignElement(element, breadcrumb){
            breadcrumb = breadcrumb || {page:true};
            vm.breadcrumb = breadcrumb;
            vm.currentElement = element;

            if(element === null){
                $('#structure-anchor').trigger('click');
            }
        }
        function handleDragAndDrop(){
            dragulaService.options($scope, 'sections-bag', sectionsBagConfig());
            dragulaService.options($scope, 'elements-bag', elementsBagConfig());
            $scope.$on('elements-bag.drag', handleDrag);
            $scope.$on('elements-bag.over', handleOver);
            $scope.$on('elements-bag.drop', handleDrop);
            $scope.$on('sections-bag.drop', handleDrop);
        }
        function sectionsBagConfig(){
            return {
                copy: function (el, source) {
                    return $(source).hasClass('new-section');
                },
                accepts: function (el, source) {
                    return !$(source).hasClass('new-section');
                },
                moves: function(el, source, handle, sibling){
                    var $handle = $(handle);
                    var dragginTemplate = $handle.parents('.section-template').length > 0;
                    return $handle.is('.container-wrapper,.section-template') || dragginTemplate;
                }
            };
        }
        function elementsBagConfig(){
            return {
                copy: function (el, source) {
                    return $(source).hasClass('new-elements');
                },
                accepts: function(el, target, source, sibling){
                    return !$(target).hasClass('new-elements');
                },
                moves: function (el, source, handle, sibling) {
                    var $handle = $(handle);
                    var hasReasonsToDrag =
                        !$(el).find('[contenteditable]').length
                        && !$handle.is('.resize-handle')
                        && ($handle.parents('.resize-handle').length === 0);
                    return hasReasonsToDrag;
                }
            };
        }
        function handleDrag(dragulaEvent,el,source){
            var $sections = $('.section');
            $('.column-cell',$sections).height(0);
            $sections.each(function (i,section) {
                var columns = $(this).find('.column-cell');
                //if(!columns.length || columns.length === 1){
                //    return;
                //}
                var heights = columns.map(function () {
                    return $(this).height();
                }).get();

                var maxHeight = Math.max.apply(this,heights);
                columns.height(maxHeight);
            });
        }
        function handleOver(){ }
        function handleDrop(dragulaEvent,el,target,source,sibling){
            $timeout(repositionTooltip);
            $('.column-cell').height(0);

            if(dragulaEvent.name === "sections-bag.drop"){
                return;
            }

            var dragged = $(el);
            var $element = $(dragged.children().get(0));
            var $source = $(source);

            var shouldRecreateTooltip =
                !$source.is(target) // linking occurs only when dropping outside of local bag
                && !$source.is('.new-elements,.new-section') // we do not want to do this to new elements
                && $element.is('.tooltipstered'); // only recrate tooltip, if existed before dragging
            if(shouldRecreateTooltip){
                $scope.$apply(function () {
                    $element.scope().element.tooltipstered = true;
                });
            }

        }
        function handleAutoScroll(){
            var elementsBag = dragulaService.find($scope,"elements-bag");
            var sectionsBag = dragulaService.find($scope,"sections-bag");
            var scroll = autoScroll([
                document.querySelector('.autoscroll-me-please')
            ],{
                margin: 30,
                pixels: 15,
                scrollWhenOutside: true,
                autoScroll: function(){
                    return this.down && (
                            elementsBag.drake.dragging
                            || sectionsBag.drake.dragging
                        );
                }
            });

        }
        function handlePageScroll(){
            var timeout = undefined;
            $('.page-flex').bind('scroll',function(){
                if(timeout){
                    $timeout.cancel(timeout);
                }else{
                    $(document.body).addClass('no-tooltip');
                }
                timeout = $timeout(function () {
                    repositionTooltip();
                    $(document.body).removeClass('no-tooltip');
                    timeout = undefined;
                },250);
            });
        }
    }
    function link(){

    }
}