var emailApp = angular.module('emailApp');
emailApp.directive('inspector',[function(){
    return {
        restrict: "E",
        replace: true,
        controllerAs: 'inspctVM',
        bindToController: true,
        scope:{
            element: '=currentElement'
        },
        link:function($scope,element,attrs){
        },
        controller:function($scope){
            var vm = this;
            vm.templates = [
                {
                    "style": {},
                    "type": "text",
                    "content": "<p>Edit me :-)</p>"
                },
                {
                    "style": {},
                    "type": "img",
                    "src": "app/img/default.jpg"
                }
            ];
            vm.sectionTemplate = [
                { "template-name": '[100%]',"style": {}, "type": "section", columns: [{ "type": "column", "grid-width": "twelve", "style": {}, "elements": []}]},
                { "template-name": '[ 50% | 50% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "six", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "six", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 33% | 33% | 33% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "four", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "four", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "four", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 33% | 60% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "four", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "eight", "style": {}, "elements": []}
                    ]
                },{ "template-name": '[ 60% | 30% ]',
                    "style": {}, "type": "section",
                    columns: [
                        { "type": "column", "grid-width": "eight", "style": {}, "elements": []},
                        { "type": "column", "grid-width": "four", "style": {}, "elements": []}
                    ]
                }
            ];
        },
        templateUrl: 'app/templates/inspector.template.html'
    }
}]);