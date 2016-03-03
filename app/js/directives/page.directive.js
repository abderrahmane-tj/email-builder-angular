var emailApp = angular.module('emailApp');
emailApp.directive('page',function(){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'pageVM',
        bindToController: true,
        controller: function($scope){
            var vm = this;
            vm.onElementClick = function (element, $event) {
                $event.stopPropagation();
                console.log($scope.currentElement === element);
                $scope.currentElement = element;
            };
        },
        templateUrl: 'app/templates/page.template.html'
    }
});