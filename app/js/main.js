var emailApp = angular.module('emailApp', [
    'emailApp.services',
    'LocalStorageModule',
    'ngSanitize',
    angularDragula(angular)
]);
emailApp.controller('MainController', [
    '$scope',
    'localStorageService',
    '$templateCache',
    'dragulaService',
    '$timeout',
    '$log',
    MainController
]);

function MainController($scope,localStorageService,$templateCache,dragulaService,$timeout,$log){
    $templateCache.removeAll();
    var lastSaved = 0;
    var defaultPage = {
        "id": "page-123ashd",
        "type": "page",
        "style": {
            "background-color": "#aeaeae"
        },
        "sections": [
            {
                "type": "section",
                "style": {
                    "background-color": "beige"
                },
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "four",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<ol>\n<li>Buy milk</li>\n<li>Do shores</li>\n<li>Eat</li>\n<ol>\n<li>Pray</li>\n<li>Hi</li>\n</ol>\n<li>Love</li>\n<li>Play Heroes of the Storm</li>\n</ol>"
                            }
                        ]
                    },
                    {
                        "type": "column",
                        "grid-width": "eight",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<h2>The time is now</h2>"
                            },
                            {
                                "style": {},
                                "type": "img",
                                "src": "app/img/default.jpg",
                                "height": 253.33333333333331,
                                "width": 380
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "style": {
                    "background-color": "whitesmoke"
                },
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "four",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Eos, fugiat!</p>"
                            }
                        ]
                    },
                    {
                        "type": "column",
                        "grid-width": "four",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Quod, tenetur!</p>"
                            }
                        ]
                    },
                    {
                        "type": "column",
                        "grid-width": "four",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Maxime minus</p>"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "section",
                "style": {
                    "background-color": "white"
                },
                "columns": [
                    {
                        "type": "column",
                        "grid-width": "six",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>Earum nam officia <strong>placeat quas sapiente</strong> tenetur totam.</p>"
                            }
                        ]
                    },
                    {
                        "type": "column",
                        "grid-width": "six",
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "text",
                                "content": "<p>A autem, debitis distinctio dolor illo modi sequi vel voluptatem voluptates! Explicabo, provident tempore.</p>"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var page = localStorageService.get('page');

    if(page === null){
        localStorageService.set('page', defaultPage);
        page = defaultPage;
    }
    var unbind = localStorageService.bind($scope, 'page');

    $scope.page = page;
    $scope.currentElement = null;

    dragulaService.options($scope, 'sections-bag', {
        copy: function (el, source) {
            return $(source).hasClass('new-section');
        },
        accepts: function (el, source) {
            return !$(source).hasClass('new-section');
        },
        moves: function(el, source, handle, sibling){
            return $(handle).is('.wrap-ink-container,.section-template-handle');
        },
        mirrorContainer: $('.email-builder-body')[0]
    });
    dragulaService.options($scope, 'elements-bag',{
        copy: function (el, source) {
            return $(source).hasClass('new-elements');
        },
        accepts: function(el, target, source, sibling){
            return !$(target).hasClass('new-elements');
        },
        moves: function (el, source, handle, sibling) {
            return !$(el).find('[contenteditable]').length;
        },
        mirrorContainer: $('.email-builder-body')[0]
    });
    $scope.$on('elements-bag.drop', function (event,el,target,source,sibling) {
        //if(!source.is(target)){
        //    el.addClass('img-hidden');
        //}
    });


    $scope.resetData = function () {
        unbind();
        localStorageService.clearAll();
        $timeout(function () {
            window.location.reload(false);
        });
    };

    $scope.htmlToBe = "<strong>Chuck</strong>";

}

