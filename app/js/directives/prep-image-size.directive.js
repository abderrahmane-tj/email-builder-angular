var emailApp = angular.module('emailApp');
emailApp.directive('prepImageSize',[function(){
    return {
        restrict: "A",
        scope:{},
        link:function($scope, element, attrs){
            element.addClass('img-hidden');
            var columns = { one: 30, two: 80, three: 130, four: 180, five: 230, six: 280, seven: 330, eight: 380, nine: 430, ten: 480, eleven: 530, twelve: 580};
            element.bind('load', onLoad);
            element.bind('error', function(){
                console.log('image could not be loaded');
            });
            function onLoad(){
                var max_width = columns[attrs.prepImageSize];
                if(!max_width){
                    console.log('prepImageSize must be english number between one and twelve!');
                    return;
                }
                var ratio = element.width() / max_width;
                var new_height = element.height() / ratio;
                element.attr('height',new_height);
                element.attr('width', max_width);
                element.css('max-width',max_width+'px');
                element.removeClass('img-hidden');

            }
        },
        controller:function($scope){

        }
    }
}]);