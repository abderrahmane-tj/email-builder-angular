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
            console.log('clicked on element');
            if(element.is('.editing')){
                console.log('is editable, get out');
                event.stopImmediatePropagation();
                return;
            }
            element.addClass('editing');
            console.log('hide');
            element.hide();
            console.log('start editing');
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
            },
            inline: true,
            plugins : 'advlist preview',
            skin: 'lightgray',
            theme : 'modern',
            menubar: false
        });
        $('[highlight]').bind('click', closeEditor);

        function closeEditor(event) {
            var isEditorUI = $(event.target).closest('.mce-tinymce').length;
            if(isEditorUI){
                console.log('Clicked on editor UI. nothing to do');
                return;
            }

            $('[highlight]').off('click', closeEditor);
            console.log('show');
            element.show().removeClass('editing');
            editable.remove();
            console.log('clicked outside, destroying');

            $scope.editor.remove();
        }
    }

}]);