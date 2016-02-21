var emailApp = angular.module('emailApp', ['emailApp.services','LocalStorageModule',angularDragula(angular)]);
emailApp.controller('MainController', ['$scope','localStorageService','$templateCache', 'dragulaService', MainController]);

function MainController($scope,localStorageService,$templateCache,dragulaService){
    $templateCache.removeAll();
    var lastSaved = 0;
    $scope.defaultPage = {
        id:'page-123ashd',
        type:'page',
        style:{
        },
        sections:[
            {
                style:{},
                columns:[
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                            }
                        ]
                    },
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'Accusantium at consectetur dignissimos eum id illum laboriosam.'
                            }
                        ]
                    }
                ]

            },
            {
                style:{},
                columns:[
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                            }
                        ]
                    },
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'Accusantium at consectetur dignissimos eum id illum laboriosam.'
                            }
                        ]
                    }
                ]

            },
            {
                style:{},
                columns:[
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'nostrum optio quidem soluta vel voluptates.'
                            }
                        ]
                    },
                    {
                        style:{
                        },
                        elements:[
                            {
                                style:{},
                                type: 'p',
                                content: 'Accusantium at consectetur dignissimos eum id illum laboriosam.'
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

    dragulaService.options($scope, 'sections-bag', {
        moves: function(el, source, handle, sibling){
            // preventing sections from moving when drag was
            // initiated on child element
            return $(handle).hasClass('wrap-ink-container');
        },
        mirrorContainer: document.querySelectorAll('.email-builder-body')[0]
    });

}

