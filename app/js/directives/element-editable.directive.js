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
            if(element.is('[contenteditable=true]')){
                event.stopImmediatePropagation();
                return;
            }
            createEditor($scope, element, attrs, ngModel);
        });
    }
    function createEditor($scope, element, attrs, ngModel){
        //element.removeAttr('ng-bind-html');
        attrs.$set('contenteditable','true');
        //element.get(0).focus();
        var config = {
            extraPlugins: 'colorbutton,colordialog,font,justify,liststyle,indentblock',
            floatSpaceDockedOffsetY: 10,
            startupFocus: true,
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
        //cke.on('pasteState', function() {
        //    $scope.$apply(function() {
        //        ngModel.$setViewValue(cke.getData());
        //    });
        //});

        //element.on('change blur keyup', function() {
        // TODO: make this sync continuesly not just on blur
        element.on('blur', function() {
            ngModel.$setViewValue(cke.getData());
        });

        $('html,[highlight]').one('click', function (event) {
            removeContentEditable($(event.target), element, cke);
        });
        $('.page').addClass('editing');
    }
    function removeContentEditable(target, paragraphe, cke, ngModel) {
        var targetIsElement =
            target.closest('[paragraphe-editable]')
                .is(paragraphe);
        var targetIsCKE = target.parents('.cke').length;
        // if the click was on CKE's UI, do not close
        if(targetIsElement || targetIsCKE){
            return;
        }

        if(paragraphe.is(':focus')){
            paragraphe.trigger('blur');
        }
        $('html,[highlight]').off('click', removeContentEditable);
        cke.destroy();
        paragraphe.removeAttr('contenteditable');
        //paragraphe.attr('ng-bind-html','element.content');
    }
}]);