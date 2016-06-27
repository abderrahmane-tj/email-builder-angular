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

emailServices.factory('jqSelectOnFocus',function(){
    return function ($element) {
        $element.on('focus',function() {
            var $this = $(this);
            $this.select();

            // Work around Chrome's little problem
            $this.mouseup(function() {
                // Prevent further mouseup intervention
                $this.unbind("mouseup");
                return false;
            });
        });
    };
});

emailServices.factory('findElement',['$rootScope',function($rootScope){
    return function (hashKey) {
        var sections = angular.element(document.body).controller().page.sections;
        for (var i=0; i<sections.length; i++){
            var section = sections[i];

            for (var j=0; j<section.columns.length; j++){
                var column = section.columns[j];

                for (var k=0; k<column.elements.length; k++){
                    var element = column.elements[k];
                    if(element.$$hashKey === hashKey){
                        return element;
                    }
                }
            }
        }
        return null;
    };
}]);
emailServices.factory('clamp', function () {
    return function(value, min, max){
        return value > max ? max : (value < min ? min : value);
    }
});