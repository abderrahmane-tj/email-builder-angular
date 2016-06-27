var emailApp = angular.module('emailApp');
emailApp.directive('textHandler',['$timeout',function($timeout){
    return {
        restrict: "A",
        scope:true,
        link: link,
        controller: controller
    };
    function link($scope, element, attrs){
        element.closest('.element').addClass('disable-controls');
        $timeout(function () {
            element.find('a').on('click', onClick);
        });
        //////////
        function onClick(event){
            event.preventDefault();
        }
    }
    function controller($scope){

    }
}]);