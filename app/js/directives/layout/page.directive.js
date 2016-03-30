var emailApp = angular.module('emailApp');
emailApp.directive('page',function(){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'pageVM',
        controller: function($scope){
            var vm = this;
            vm.assignElement = function (element) {
                $scope.mainVM.currentElement = element;
                $scope.$apply();
            };
        },
        templateUrl: 'app/templates/page.template.html'
    }
});