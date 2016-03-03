var emailApp = angular.module('emailApp');
emailApp.directive('page',function(){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'pageVM',
        bindToController: true,
        controller: function($scope){
            var vm = this;
            vm.assignElement = function (element) {
                $scope.currentElement = element;
                $scope.$apply();
            };
        },
        templateUrl: 'app/templates/page.template.html'
    }
});