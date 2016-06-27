var emailApp = angular.module('emailApp');
emailApp.directive('navigateTo',['$timeout',navigateToDirective]);
function navigateToDirective($timeout){
    return {
        restrict: "A",
        scope:true,
        controller:controller,
        link: link
    };

    function link($scope, element, attrs){
        var $page = $('.page');

        element.bind('click', onClick);
        ////////
        $scope.$watch('pageVM.currentElement.type', handleActive);
        function handleActive(type, oldType){
            if(type === undefined){
                $('.navigation-link').removeClass('active');
            }
            var shouldActivate = false;
            switch(type){
                case 'page': case 'section': case 'column': shouldActivate = (type === attrs.navigateTo); break;
                default : shouldActivate = ('element' === attrs.navigateTo); break;
            }
            if(shouldActivate){
                $('.navigation-link').removeClass('active');
                element.addClass('active');
            }
        }
        function onClick(event) {
            event.preventDefault();
            if(element.hasClass('active')){
                return;
            }
            var classes = '';
            switch(attrs.navigateTo){
                case 'element': classes += 'on-element';
                case 'column' : classes += ' on-column';
                case 'section' : classes += ' on-section';
                case 'page' : classes += ' on-page';
            }
            $page.addClass(classes);
            if(attrs.navigateTo === 'page'){
                $page.addClass(classes);
                $page.trigger('click');
            }else{
                $page.addClass(classes);
                var toClick = $('.id-'+$scope.pageVM.breadcrumb[attrs.navigateTo].$$hashKey.replace(':','-'));
                toClick.trigger('click');
            }
            $timeout(function () {
                $page.removeClass(classes);
            });

        }
    }

    function controller($scope){

    }
}