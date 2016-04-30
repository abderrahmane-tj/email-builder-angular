var emailApp = angular.module('emailApp');
emailApp.directive('sectionProperties',function(){
    return {
        restrict: "E",
        scope:{
            section:'=element'
        },
        templateUrl: 'app/templates/properties/section.template.html',
        link: link
    };
    function link($scope, element, attrs){
        $scope.$watch("section.wrapper.rawStyle['background-image']", function (url) {
            console.log(url);
            //$scope.section.wrapper.style['background-image'] = "url('"+url+"')";
        })
    }
});
