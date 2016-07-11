angular.module('emailApp.services')
.factory('preventBubbling',function(){
    return function (blockName) {
        var $page = $('.page');
        var doNotBubble = (
            (blockName === 'page' && $page.is('.on-section,.on-column,.on-element'))
            || (blockName === 'section' && $page.is('.on-column,.on-element'))
            || (blockName === 'column' && $page.is('.on-element'))
        );
        return !!doNotBubble;
    };
});