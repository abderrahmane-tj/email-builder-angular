var emailApp = angular.module('emailApp');
emailApp.directive('highlight',['$compile','preventBubbling',function($compile,preventBubbling){
    return {
        restrict: "A",
        //require:"^page",
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
            highlighted = element.find('.row:first');
        }

        highlighted.addClass('highlight--'+options.type);

        var elementData = $scope[options.name];
        var $page = $('.page');
        var knownNames = ['page','section','column','element'];
        var levelClasses = knownNames
            .map(function(item){ return 'on-'+item; })
            .join(' ');
        if(options.toggleClick){
            element.bind('click', onClick);
        }
        function onClick(event) {
            if(preventBubbling(options.name)){
                return;
            }

            $('.current-element')
                .removeClass('current-element');

            // option.name would be : page, section, column or element
            // which corresponds to $scope.page. $scope.section, ...
            // the following condition checks if we are clicking on the currentElement
            // if so, we should uninspect it
            if(elementData === $scope.currentElement){
                $scope.pageVM.assignElement(null);
            }else{
                $scope.pageVM.assignElement(elementData);
                highlighted.addClass('current-element');
            }
        }
        element.bind('mouseenter', function(event) {
            $page.addClass('on-'+options.name);
            $('.highlight--'+options.name).removeClass('highlight--'+options.name);
            highlighted.addClass('highlight--'+options.name);
        });
        element.bind('mouseleave', function() {
            $page.removeClass('on-'+options.name);
            highlighted.removeClass('highlight--'+options.name);
        });
    }
}]);
