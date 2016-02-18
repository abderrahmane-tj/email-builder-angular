var emailApp = angular.module('emailApp');
emailApp.directive('highlightOnHover',function(){
    return {
        restrict: "A",
        require:"^page",
        link:function($scope,element,attrs,pageCtrl){
            element.on('mouseenter', function() {
                pageCtrl.plusHoverLevel();
                element.addClass('highlight');
                $scope.$apply();
            });
            element.on('mouseleave', function() {
                pageCtrl.minusHoverLevel();
                element.removeClass('highlight');
                $scope.$apply();
            });
        },
        controller:function($scope){

        }
    }
});
