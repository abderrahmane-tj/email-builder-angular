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
                    "type": "p",
                    "content": "Edit me :-)"
                },
                {
                    "style": {},
                    "type": "img",
                    "src": "http://localhost/email-builder/app/img/default.jpg"
                }
            ];
            vm.sectionTemplate = [
                {
                    "style": {
                        "background-color": "white"
                    },
                    "type": "section",
                    columns: [
                        {
                            "type": "column",
                            "grid-width": "six",
                            "style": {},
                            "elements": []
                        },
                        {
                            "type": "column",
                            "grid-width": "six",
                            "style": {},
                            "elements": []
                        }
                    ]
                }
            ];
        },
        templateUrl: 'app/templates/inspector.template.html'
    }
}]);