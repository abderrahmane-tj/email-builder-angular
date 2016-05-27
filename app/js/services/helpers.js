var emailServices = angular.module('emailApp.services',[]);
emailServices.factory('prettify',function(){
    var compile = function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var prefix = "\n";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    prefix = '  ';
                } else {
                    prefix = '';
                }
            }
            return prefix + match + "";
        });
    };
    return {
        compile: compile
    };
});
emailServices.factory('repositionTooltip', function () {
    return function(){
        var $tooltipster = $('.page .tooltipstered');
        if($tooltipster.length){
            $tooltipster.tooltipster('reposition');
        }
    };
});
emailServices.factory('preventBubbling',function(){
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

emailServices.factory('obj2css',function(){
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