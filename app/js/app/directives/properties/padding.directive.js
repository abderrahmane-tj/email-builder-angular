angular.module('emailApp')
.directive('paddingProperty', [
    'clamp',
    function (clamp) {
    var directive = {
        restrict: "E",
        scope: {
            rawStyle: '=paddingRawStyle',
            style: '=paddingStyle'
        },
        templateUrl: 'app/templates/properties/padding.template.html',
        link: link
    };
    var o = {
        MAX_PADDING: 30,
        MIN_PADDING: 0
    };
    function link($scope, element, attrs) {
        $scope.process = process;
        ///////
        function process(property){
            var rawValue = $scope.rawStyle[property];
            rawValue = rawValue.trim();
            rawValue = parseInt(rawValue);
            if(isNaN(rawValue)){
                $scope.style[property] = 0;
            }else{
                rawValue = clamp(rawValue, o.MIN_PADDING, o.MAX_PADDING);
                $scope.style[property] = rawValue + 'px';
            }
        }
    }
    return directive;
}]);
