var emailApp = angular.module('emailApp');
emailApp.directive('property',function(){
    return {
        restrict: "E",
        scope:{
            style:'=elementStyle'
        },
        link: function (scope, element, attrs) {
            var name = attrs.name;
            var allowedTemplates = [
                'border','margin','padding','background'
            ];
            var exists = allowedTemplates.find(function(e){ return name === e });
            scope.templateName = exists ? name : 'broken';
        },
        template: '<div ng-include="\'app/templates/properties/\'+templateName+\'.template.html\'"></div>'
    }
});
