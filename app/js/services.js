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
        var englishNumber = ['zero','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        return englishNumber[number];
    }
});

emailServices.filter('voodoo', ['$sce',function($sce) {
    return function(content) {
        console.log(content);
        return content;
    }
}]);

emailServices.directive('compile',['$compile','$timeout',function($compile, $timeout){
    return{
        restrict:'A',
        link: function(scope,elem,attrs){
            $timeout(function(){
                console.log(elem.html());
                $compile(elem.contents())(scope);
            });
        }

    }
}]);


CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        '/',
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    config.removeButtons = 'Source,NewPage,Preview,Print,Templates,Save,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,Image,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,Styles';
};