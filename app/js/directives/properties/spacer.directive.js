var emailApp = angular.module('emailApp');
emailApp.directive('spacerProperties',function(){
    return {
        restrict: "E",
        scope:{
            spacer:'=element'
        },
        templateUrl: 'app/templates/properties/spacer.template.html',
        link:link
    };
    function link($scope, element, attrs){

    }
});
