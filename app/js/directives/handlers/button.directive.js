var emailApp = angular.module('emailApp');
emailApp.directive('buttonHandler',[function(){
    return {
        restrict: "A",
        scope:true,
        link: link,
        controller: controller
    };
    function link($scope, element, attrs){
        element.bind('click', onClick);
        //////////
        function onClick(event){
            //if(!event.ctrlKey){
                event.preventDefault();
            //}
        }
    }
    function controller($scope){
        $scope.textAlignment = {
            center: 'text-align-center',
            left: 'text-align-left',
            right: 'text-align-right'
        };
        $scope.buttonAlignment = {
            center: 'button-align-center',
            left: 'button-align-left',
            right: 'button-align-right'
        };
    }
}]);