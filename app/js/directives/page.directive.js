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
                //console.log(element);

                //var clickedElement;
                //if(id === $scope.page.id){
                //    //clickedElement = $scope.page;
                //}else{
                //    //clickedElement = $scope.page.elements.find(function (element) {
                //    //    return element.id === id;
                //    //});
                //}
                $scope.currentElement = element;
            };
        },
        templateUrl: 'app/templates/page.template.html'
    }
});