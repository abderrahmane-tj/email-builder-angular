var emailApp = angular.module('emailApp');
emailApp.directive('colorPicker',[colorPickerDirective]);
function colorPickerDirective(){
    return {
        restrict: "A",
        scope:true,
        controller:controller,
        link: link
    };

    function link($scope, element, attrs){
        $scope.$watch(attrs.ngModel, function (val) {
            element.spectrum('set',val);
        });
        element.spectrum({
            allowEmpty: true,
            preferredFormat: 'hex',
            showInput: true,
            showInitial: true
        });
    }

    function controller($scope){
    }
}