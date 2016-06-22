var emailServices = angular.module('emailApp.services');
emailServices.factory('computeProperty',['clamp',function (clamp) {
    var o = {
        MAX_PADDING: 30,
        MIN_PADDING: 0
    };
    return {
        padding: padding,
        backgroundImage: backgroundImage
    };
    function padding(property, raw, style){
        var rawValue = raw[property];
        rawValue = rawValue.trim();
        rawValue = parseInt(rawValue);
        if(isNaN(rawValue)){
            style[property] && delete style[property];
        }else{
            rawValue = clamp(rawValue, o.MIN_PADDING, o.MAX_PADDING);
            style[property] = rawValue + 'px';
        }
    }
    function backgroundImage(raw, style){
        style['background-image'] = "url("+raw['background-image']+")";
    }
}]);