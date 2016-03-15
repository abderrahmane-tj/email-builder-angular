var emailApp = angular.module('emailApp');
emailApp.directive('elementEditable',['$sce','$compile', function($sce,$compile){
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
            if(element.is('.editing')){
                event.stopImmediatePropagation();
                return;
            }
            element.addClass('editing');
            element.hide();
            createEditor($scope, element, attrs, ngModel);
        });
    }
    function createEditor($scope, element, attrs, ngModel){

        var randID = 'editable-'+(Math.random()*987654321|0);
        var editable = element.after(
            '<div id="'+randID+'">'+$scope.element.content+'</div>'
        ).next();
        editable.attr('highlight',"{name:'element', type:'exactly', toggleCurrent: 'false'}");
        editable.on('click', function (event) {
           event.stopImmediatePropagation();
        });

        $compile(editable)($scope);


        tinymce.init({
            selector:'#'+randID,
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
                            closeEditor();
                        });
                    }
                });
            },
            inline: true,
            plugins : 'textcolor colorpicker',
            toolbar: [
                'bold italic underline strikethrough removeformat' +
                ' | alignleft aligncenter alignright alignjustify' +
                ' | bullist numlist outdent indent' +
                ' | deleteElement',

                'forecolor backcolor | formatselect | fontselect fontsizeselect'
            ],
            skin: 'lightgray',
            theme : 'modern',
            menubar: false
        });
        $('[highlight]').bind('click', handleClickElsewhere);

        function handleClickElsewhere(event){
            var isEditorUI = $(event.target).closest('.mce-tinymce').length;
            if(isEditorUI){
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
    }

}]);