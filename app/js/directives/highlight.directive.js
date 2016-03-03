var emailApp = angular.module('emailApp');
emailApp.directive('highlight',function(){
    return {
        restrict: "A",
        //require:"^page",
        scope:true,
        link:function($scope,element,attrs,pageCtrl){
            var options = $scope.$eval(attrs.highlight);
            element.addClass('highlight--'+options.type);
            var $page = $('.page');
            var $hook = $('#hook');
            var knownNames = ['page','section','column','element'];
            var levelClasses = knownNames
                .map(function(item){ return 'on-'+item; })
                .join(' ');
            element.on('click', function (event) {
                event.stopPropagation();
                if($scope[options.name] === $scope.currentElement){
                    element.removeClass('current-element');
                    $scope.pageVM.assignElement(null);
                }else{
                    $scope.pageVM.assignElement($scope[options.name]);
                    $('.current-element').removeClass('current-element');
                    element.addClass('current-element');
                }

            });
            element.on('mouseenter', function(event) {
                $page.addClass('on-'+options.name);
                element.addClass('highlight--'+options.name);
            });
            element.on('mouseleave', function() {
                $page.removeClass('on-'+options.name);
                element.removeClass('highlight--'+options.name);
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
