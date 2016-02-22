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
                $page.addClass('on-'+options.name);
                element.addClass('highlight--'+options.name);
                $scope.$apply();
            });
            element.on('mouseleave', function() {
                $page.removeClass('on-'+options.name);
                element.removeClass('highlight--'+options.name);
                $scope.$apply();
            });
        },
        controller:function($scope){

        }
    }
});
