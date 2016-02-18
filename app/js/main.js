var emailApp = angular.module('emailApp',['emailApp.services','LocalStorageModule']);
emailApp.controller('MainController',  ['$scope','localStorageService','$templateCache', MainController]);

function MainController($scope,localStorageService,$templateCache){
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
                elements:[
                    {
                        id: '123nasd',
                        type: 'p',
                        inner: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                        style:{
                        }
                    },{
                        id: 'x2edh8',
                        type: 'p',
                        inner: 'Accusantium at consectetur dignissimos eum id illum laboriosam.',
                        style:{
                        }
                    }
                ]

            },{
                style:{},
                elements:[
                    {
                        id: '123nasd',
                        type: 'p',
                        inner: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                        style:{
                        }
                    },{
                        id: 'x2edh8',
                        type: 'p',
                        inner: 'Accusantium at consectetur dignissimos eum id illum laboriosam.',
                        style:{
                        }
                    }
                ]

            },{
                style:{},
                elements:[
                    {
                        id: '123nasd',
                        type: 'p',
                        inner: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                        style:{
                        }
                    },{
                        id: 'x2edh8',
                        type: 'p',
                        inner: 'Accusantium at consectetur dignissimos eum id illum laboriosam.',
                        style:{
                        }
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

    function savePage(value){
        var now = Date.now();
        if (now - lastSaved < 1000){
            setTimeout(function(){savePage($scope.page);}, now - lastSaved + 100);
            return;
        }
        lastSaved = now;
        localStorageService.set('page',value);
    }
}

