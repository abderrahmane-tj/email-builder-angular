angular.module('emailApp').directive('textHandler',['$timeout',function($timeout){
    return {
        restrict: "A",
        scope:true,
        link: link
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
}]);