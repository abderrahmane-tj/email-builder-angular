var emailApp = angular.module('emailApp', ['emailApp.services','LocalStorageModule',angularDragula(angular)]);
emailApp.controller('MainController', ['$scope','localStorageService','$templateCache', 'dragulaService', MainController]);

function MainController($scope,localStorageService,$templateCache,dragulaService){
    $templateCache.removeAll();
    var lastSaved = 0;
    $scope.defaultPage = {
        "id": "page-123ashd",
        "type": "page",
        "style": {
            "background-color": "#aeaeae"
        },
        "sections": [
            {
                type: 'section',
                "style": {
                    "background-color": "khaki"
                },
                "columns": [
                    {
                        type: 'column',
                        "style": {},
                        "elements": []
                    },
                    {
                        type: 'column',
                        "style": {},
                        "elements": []
                    }
                ]
            },
            {
                type: 'section',
                "style": {
                    "background-color": "darkorange"
                },
                "columns": [
                    {
                        type: 'column',
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "p",
                                "content": "Earum nam officia placeat quas sapiente tenetur totam."
                            },
                            {
                                "style": {},
                                "type": "p",
                                "content": "A autem, debitis distinctio dolor illo modi sequi vel voluptatem voluptates! Explicabo, provident tempore."
                            }
                        ]
                    },
                    {
                        type: 'column',
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "p",
                                "content": "Facere ipsa neque nulla quibusdam? Dolorem illo ipsum laudantium quasi qui?"
                            }
                        ]
                    }
                ]
            },
            {
                type: 'section',
                "style": {
                    "background-color": "beige"
                },
                "columns": [
                    {
                        type: 'column',
                        "style": {
                            "padding-top": "20px",
                            "padding-bottom": "20px",
                            "padding-left": "10px",
                            "padding-right": "20px"
                        },
                        "elements": [
                            {
                                "style": {},
                                "type": "p",
                                "content": "Eos, fugiat!"
                            },
                            {
                                "style": {},
                                "type": "p",
                                "content": "Quod, tenetur!"
                            }
                        ]
                    },
                    {
                        type: 'column',
                        "style": {},
                        "elements": [
                            {
                                "style": {},
                                "type": "p",
                                "content": "nostrum optio quidem soluta vel voluptates."
                            }
                        ]
                    }
                ]
            }
        ]
    };

    $scope.page = localStorageService.get('page');
    if($scope.page === null){
        $scope.page = $scope.defaultPage;
        localStorageService.set('page', $scope.defaultPage);
    }

    $scope.unbind = localStorageService.bind($scope, 'page');
    $scope.currentElement = $scope.page;

    dragulaService.options($scope.$parent, 'sections-bag', {
        moves: function(el, source, handle, sibling){
            // preventing sections from moving when drag was
            // initiated on child element
            return $(handle).hasClass('wrap-ink-container');
        },
        mirrorContainer: document.querySelectorAll('.email-builder-body')[0]
    });

    dragulaService.options($scope.$parent,'elements-bag',{
        copy: function (el, source) {

            return $(source).hasClass('new-elements');
        },
        accepts: function(el, target, source, sibling){
            return !$(target).hasClass('new-elements');
        }
    });

}

