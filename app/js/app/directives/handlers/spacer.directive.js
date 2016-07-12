angular.module('emailApp').directive('spacerHandler',[function(){
    return {
        restrict: "A",
        scope:true,
        link: link,
        controller: controller
    };
    function link($scope, element, attrs){

        var $page = $('.page');
        var resizing = false;
        var handle = element.find(".resize-handle");
        var handleText = handle.find(".handle-text");
        var startY = null;
        var startHeight = null;
        element.height($scope.element.height);

        handle.bind('click', function (event) { event.stopPropagation(); })
            .bind('mousedown', handleMousedown);


        /////////////
        function handleMousedown(e) {
            $page.addClass('resizing-spacer');
            startY = e.clientY;
            resizing = true;
            startHeight = element.height();
            $('html')
                .bind('mousemove', handleMousemove)
                .one('mouseup', handleMouseup);
        }
        function handleMousemove(e) {
            if(!resizing){
                return;
            }
            var difference = e.clientY - startY;
            var newHeight = startHeight + difference;
            if(newHeight <= 10){
                newHeight = 10;
            }
            element.height(newHeight);
            handleText.text(parseInt(newHeight)+' px');
            $scope.element.height = newHeight;
        }
        function handleMouseup(e) {
            $page.removeClass('resizing-spacer');
            $scope.element.height = element.height();
            resizing = false;
        }
    }
    function controller($scope){
    }
}]);