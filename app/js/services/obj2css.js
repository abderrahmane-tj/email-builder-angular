angular.module('emailApp.services')
.factory('obj2css',function(){
    return function (obj) {
        var css = '';
        for(var property in obj){
            if(obj.hasOwnProperty(property) && obj[property] ){
                css += property+':'+obj[property]+';';
            }
        }
        return css;
    };
});