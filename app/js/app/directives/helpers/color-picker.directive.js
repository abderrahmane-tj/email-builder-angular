angular.module('emailApp').directive('colorPicker',[colorPickerDirective]);
function colorPickerDirective(){
    return {
        restrict: "A",
        scope:true,
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

}