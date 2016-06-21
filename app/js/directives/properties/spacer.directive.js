var emailApp = angular.module('emailApp');
emailApp.directive('spacerProperties',function(){
    return {
        restrict: "E",
        scope:{
            spacer:'=element',
            compute:'=compute'
        },
        templateUrl: 'app/templates/properties/spacer.template.html',
        link:link
    };
    function link($scope, element, attrs){

    }
});
