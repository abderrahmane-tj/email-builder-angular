var emailApp = angular.module('emailApp');
emailApp.directive('elementEditable',['$sce', function($sce){
    return {
        restrict: "A",
        require: 'ngModel',
        scope: true,
        link: link,
        controller: function($scope){
            $scope.trustAsHtml = function(string) {
                return $sce.trustAsHtml(string);
            };
            $scope.elementData = {};
        }
    };
    function link($scope, element, attrs, ngModel){
        element.bind('click', function (event) {
            console.log('clicked on element');
            if(element.is('[contenteditable=true]')){
                console.log('is editable, get out');
                event.stopImmediatePropagation();
                return;
            }
            console.log('start editing');
            createEditor($scope, element, attrs, ngModel);
        });
    }
    function createEditor($scope, element, attrs, ngModel){
        attrs.$set('contenteditable','true');
        element.get(0).focus();
        var config = {
            extraPlugins: 'colorbutton,colordialog,font,justify,liststyle,indentblock',
            floatSpaceDockedOffsetY: 10,
            toolbar: [
                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
                { name: 'links', items: [ 'Link', 'Unlink']},
                '/',
                { name: 'paragraph', items: [
                    'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
                    '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
            ],
            removePlugins:'magicline'
        };
        var cke = CKEDITOR.inline(element.get(0),config);

        // TODO: make this sync continuesly not just on blur
        //element.on('change blur keyup', function() {
        element.on('blur', function() {
            console.log('blurred, saving');
            ngModel.$setViewValue(cke.getData());
        });

        $('html,[highlight]').one('click', function (event) {
            console.log('clicked outside, destroying');
            var target = $(event.target);
            var targetIsElement = target.closest('[element-editable]')
                    .is(element);
            var targetIsCKE = target.parents('.cke').length;
            if(targetIsElement || targetIsCKE){
                console.log('either clicked on element or CKE UI. nothing to do');
                return;
            }

            removeContentEditable(element, cke);
        });
    }
    function removeContentEditable(paragraphe, cke) {

        if(paragraphe.is(':focus')){
            paragraphe.trigger('blur');
        }

        cke.destroy();
        paragraphe.removeAttr('contenteditable');
        $('html,[highlight]').off('click', removeContentEditable);
    }
}]);