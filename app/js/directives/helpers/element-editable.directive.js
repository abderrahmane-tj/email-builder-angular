var emailApp = angular.module('emailApp');
emailApp.directive('elementEditable',['$sce','$compile','$timeout', function($sce,$compile,$timeout){
    return {
        restrict: "A",
        require: 'ngModel',
        scope: true,
        link: link,
        controller: function($scope){
            $scope.trustAsHtml = function(string) {
                return $sce.trustAsHtml(string);
            };
            //$scope.elementData = {};
        }
    };
    function link($scope, element, attrs, ngModel){
        element.bind('click', function (event) {
            element.hide();
            createEditor($scope, element, attrs, ngModel);
        });
    }
    function createEditor($scope, element, attrs, ngModel){
        var options = {};
        if(attrs.elementEditable){
            options = $scope.$eval(attrs.elementEditable);
        }
        options['wrapper-tag'] = options['wrapper-tag'] || 'div';
        var randID = 'editable-'+(Math.random()*987654321|0);
        var editable = element.after(
            '<'+options['wrapper-tag']+' id="'+randID+'">'+ngModel.$viewValue+'</'+options['wrapper-tag']+'>'
        ).next();

        editable.attr('ng-class',element.attr('ng-class'));
        editable.addClass('editing text-wrapper');
        editable.on('click', function (event) {
           event.stopImmediatePropagation();
        });
        editable.bind('mousedown', onMousedown);

        $compile(editable)($scope);
        var plugins = options.plugins || 'textcolor colorpicker link';
        var toolbar = options.toolbar || [
            'bold italic underline strikethrough removeformat' +
            ' | alignleft aligncenter alignright alignjustify' +
            ' | bullist numlist outdent indent' +
            ' | cloneElement deleteElement',

            'link unlink | forecolor backcolor | formatselect | fontselect fontsizeselect'
        ];

        tinymce.init({
            selector:'#'+randID,
            force_p_newlines: true,
            paste_as_text: true,
            convert_urls: false,
            fontsize_formats: "8px 9px 10px 11px 12px 14px 16px 18px 20px 22px 24px 26px 28px 36px 48px 72px",
                    font_formats: "Bitter, Georgia=Bitter, Georgia, Times, Times New Roman, serif;Courier, Lucida Sans=Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;Droid Serif, Georgia=Droid Serif, Georgia, Times, Times New Roman, serif;Georgia, Times=Georgia, Times, Times New Roman, serif;Helvetica, Arial=Helvetica Neue, Helvetica, Arial, sans-serif;Lato, Tahoma=Lato, Tahoma, Verdana, Segoe, sans-serif;Open Sans, Helvetica=Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;Roboto, Tahoma=Roboto, Tahoma, Verdana, Segoe, sans-serif;Ubuntu, Tahoma=Ubuntu, Tahoma, Verdana, Segoe, sans-serif;Lucida Sans, Geneva=Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif;Montserrat, Trebuchet=Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;",
            setup: function(editor) {
                editor.on("init", function() {
                    $scope.$apply(function () {
                        $scope.editor = editor;
                    });
                    //editor.setContent($scope.element.content);
                    editor.focus();
                });
                editor.on('change keyup blur click', function (e) {
                    ngModel.$setViewValue(editor.getContent());
                });
                editor.addButton('deleteElement', {
                    icon: 'delete-element',
                    onclick: function () {
                        var filteredElements = $scope.column.elements.filter(function (item) {
                            return item !== $scope.element;
                        });
                        $scope.$apply(function () {
                            $scope.column.elements = filteredElements;
                            $scope.pageVM.assignElement(null);
                            closeEditor();
                        });
                    }
                });
                editor.addButton('cloneElement', {
                    icon: 'clone-element',
                    onclick: function () {
                        var index = $scope.column.elements.indexOf($scope.element);
                        $scope.$apply(function () {
                            $scope.column.elements.splice(index+1, 0, angular.copy($scope.element));
                        });
                    }
                });
            },
            inline: true,
            plugins : plugins,
            toolbar: toolbar,
            skin: 'lightgray',
            theme : 'modern',
            menubar: false
        });

        $timeout(function () {
            $('[highlight]').bind('click', handleClickElsewhere);
        });

        var $page = $('.page');

        /////////////
        function handleClickElsewhere(event){
            var isEditorUI = $(event.target).closest('.mce-tinymce').length;
            if(isEditorUI || $page.hasClass('editor-selecting')){
                $timeout(function(){ $page.removeClass('editor-selecting'); });
                return;
            }

            $('[highlight]').off('click', handleClickElsewhere);

            $scope.$apply(function () {
                closeEditor();
            });
        }
        function closeEditor() {
            element.show().removeClass('editing');
            editable.remove();
            $scope.editor.remove();
            delete $scope.editor;
        }

        function onMousedown(){
            editable.off('mouseup', onMouseup);
            $page.addClass('editor-selecting');
            editable.bind('mouseup', onMouseup);
        }
        function onMouseup(event){
            editable.off('mouseup', onMouseup);
            $timeout(function(){
                $page.removeClass('editor-selecting');
            });
        }
    }

}]);