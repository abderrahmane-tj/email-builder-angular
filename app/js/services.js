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
emailServices.factory('dataservice', function () {
    return {
        getPageData: getPageData
    };
    function getPageData(){

    }
});
emailServices.filter('englishNumber', function() {
    return function(number) {
        var englishNumber = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        englishNumber[number]
        return englishNumber[number];
    }
});