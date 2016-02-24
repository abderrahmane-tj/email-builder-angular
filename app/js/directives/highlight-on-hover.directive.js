var emailApp = angular.module('emailApp');
emailApp.directive('highlightOnHover',function(){
    return {
        restrict: "A",
        require:"^page",
        link:function($scope,element,attrs,pageCtrl){
            var options = $scope.$eval(attrs.highlightOnHover);

            //element.addClass('highlight--'+options.name);
            element.addClass('highlight--'+options.type);
            var $page = $('.page');

            element.on('mouseenter', function() {
                if($('.gu-unselectable').length){
                    removeClasses(options.name);
                    return;
                }
                addClasses(options.name)
            });
            element.on('mouseleave', function() {
                removeClasses(options.name);
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
