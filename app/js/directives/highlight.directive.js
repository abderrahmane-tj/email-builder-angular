var emailApp = angular.module('emailApp');
emailApp.directive('highlight',function(){
    return {
        restrict: "A",
        //require:"^page",
        scope:true,
        link:function($scope,element,attrs,pageCtrl){
            var options = $scope.$eval(attrs.highlight);
            var highlighted = element;

            // In case we hover an element, whish in most cases is an inline layout
            // html element, we want to highlight its container, a div of class
            // .element. as of this comment it is its direct parent
            if($scope.element){
                highlighted = element.closest('.element');
            }

            highlighted.addClass('highlight--'+options.type);

            var $page = $('.page');
            var knownNames = ['page','section','column','element'];
            var levelClasses = knownNames
                .map(function(item){ return 'on-'+item; })
                .join(' ');
            element.bind('click', function (event) {
                event.stopPropagation();

                if($scope[options.name] === $scope.currentElement){
                    highlighted.removeClass('current-element');
                    $scope.pageVM.assignElement(null);
                }else{
                    $scope.pageVM.assignElement($scope[options.name]);
                    $('.current-element').removeClass('current-element');
                    highlighted.addClass('current-element');
                }
            });
            element.bind('mouseenter', function(event) {
                $page.addClass('on-'+options.name);
                highlighted.addClass('highlight--'+options.name);
            });
            element.bind('mouseleave', function() {
                $page.removeClass('on-'+options.name);
                highlighted.removeClass('highlight--'+options.name);
            });
            function addClasses(name){
                $page.addClass('on-'+name);
                element.addClass('highlight--'+name);
                $scope.$apply();
            }
            function removeClasses(name){
                $page.removeClass('on-'+name);
                element.removeClass('highlight--'+name);
                $scope.$apply();
            }
        },
        controller:function($scope){
        }
    }
});
