var emailApp = angular.module('emailApp');
emailApp.directive('pageProperties',function(){
    return {
        restrict: "E",
        scope:{
            page:'=element'
        },
        templateUrl: 'app/templates/properties/page.template.html',
        link: link
    };
    function link($scope, element, attrs){
        watchBackground(
            "page.rawStyle['background-image']",
            "$scope.page.style",
            'background-image'
        );
        function watchBackground(watchee, sUpdatee, property){
            $scope.$watch(watchee, function (url) {
                var updatee = eval(sUpdatee);
                var value = null;
                if(url && url.trim()){
                    value = "url('"+url+"')";
                }
                updatee[property] = value;
            });
        }
    }
});
