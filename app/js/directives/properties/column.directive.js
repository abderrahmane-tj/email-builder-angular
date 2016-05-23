var emailApp = angular.module('emailApp');
emailApp.directive('columnProperties',[function(){
    return {
        restrict: "E",
        scope:{
            column:'=element'
        },
        templateUrl: 'app/templates/properties/column.template.html',
        link: link
    };
    function link($scope, element, attrs){

        $scope.$watch("column.wrapper.rawStyle['background-image']",
            function (url){
                var value = null;
                if(url && url.trim()){
                    value = "url('"+url+"')";
                }
                $scope.column.wrapper.style['background-image'] = value;
            }
        );
        $scope.$watch("column['no-padding']",
            function (noPadding){
                if(noPadding){
                    $scope.column.wrapper.style['padding'] = 0;
                }else{
                    delete $scope.column.wrapper.style['padding'];
                }
            }
        );

    }
}]);
