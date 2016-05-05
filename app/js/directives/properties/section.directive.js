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
        watchBackground(
            "section.wrapper.rawStyle['background-image']",
            "$scope.section.wrapper.style",
            'background-image'
        );
        watchBackground(
            "section.rawStyle['background-image']",
            "$scope.section.style",
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
