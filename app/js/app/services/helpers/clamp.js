angular.module('emailApp.services')
.factory('clamp', function () {
    return function(value, min, max){
        return value > max ? max : (value < min ? min : value);
    }
});