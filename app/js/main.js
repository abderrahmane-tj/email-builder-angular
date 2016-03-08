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
        "style": {"background-color": "#aeaeae"},
        "sections": [{
            "type": "section",
            "style": {"background-color": "khaki"},
            "columns": [{
                "type": "column",
                "grid-width": "six",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "p",
                    "content": "Eos, fugiat!"
                }]
            }, {
                "type": "column",
                "grid-width": "six",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "p",
                    "content": "Quod, tenetur!"
                }]
            }]
        }, {
            "type": "section",
            "style": {"background-color": "darkorange"},
            "columns": [{
                "type": "column",
                "grid-width": "six",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "p",
                    "content": "Earum nam officia <strong>placeat quas sapiente</strong> tenetur totam."
                }, {
                    "style": {},
                    "type": "p",
                    "content": "A autem, debitis distinctio dolor illo modi sequi vel voluptatem voluptates! Explicabo, provident tempore."
                }]
            }, {
                "type": "column",
                "grid-width": "six",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "p",
                    "content": "Facere ipsa neque nulla quibusdam? Dolorem illo ipsum laudantium quasi qui?"
                }]
            }]
        }, {
            "type": "section",
            "style": {"background-color": "beige"},
            "columns": [{
                "type": "column",
                "grid-width": "four",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "img",
                    "src": "app/img/default.jpg"
                }]
            }, {
                "type": "column",
                "grid-width": "eight",
                "style": {},
                "elements": [{
                    "style": {},
                    "type": "p",
                    "content": "nostrum optio quidem soluta vel voluptates."
                }]
            }]
        }]
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

