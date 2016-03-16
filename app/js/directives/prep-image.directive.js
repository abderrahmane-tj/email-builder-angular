var emailApp = angular.module('emailApp');
emailApp.directive('prepImage',['$timeout',function($timeout){
    return {
        restrict: "A",
        scope:true,
        link:function($scope, element, attrs){
            //element.addClass('img-hidden');
            var columns = { one: 30, two: 80, three: 130, four: 180, five: 230, six: 280, seven: 330, eight: 380, nine: 430, ten: 480, eleven: 530, twelve: 580};
            $scope.$watch('element.src', updateImage);
            function updateImage(newVal) {
                if(!newVal.trim()){
                    element.attr('src', attrs.brokenSrc);
                    return;
                }
                attrs.$set('src', attrs.loadingSrc);
                //applySize(newSize({width:192,height:120}));

                var vImg = angular.element(new Image);
                vImg.bind('load',load);
                vImg.bind('error',error);
                vImg.attr('src',newVal);
            }
            function error(){
                //cleanElement();

                attrs.$set('src', attrs.brokenSrc);
                //applySize(newSize({width:125,height:150}));

                //$scope.$apply();
            }
            function load(){
                var vImage = this;
                attrs.$set('src',$scope.element.src);
                var size = newSize({width:vImage.width, height: vImage.height});
                $scope.element.height = size.height;
                $scope.element.width = size.width;
                //applySize(size);
            }
            function newSize(vImage){
                vImage = vImage || {width: null, height: null};
                var max_width = columns[attrs.prepImage];
                if(!max_width){
                    console.log('prepImage must be english number between one and twelve!');
                    return;
                }
                var originalWidth = vImage.width || element.width();
                var originalHeight = vImage.height || element.height();
                var isContained = originalWidth <= max_width;
                if(isContained){
                    return {
                        width: originalWidth,
                        height: originalHeight
                    };
                }

                var ratio = originalWidth / max_width;
                var new_height = originalHeight / ratio;
                var new_width = max_width;

                return {
                    width: new_width,
                    height: new_height
                };
            }
            function applySize(size){
                cleanElement();
                var width = size.width;
                var height = size.height;
                element.attr('height',height);
                element.attr('width', width);
                element.css('max-width',width+'px');
                //element.removeClass('img-hidden');
            }
            function cleanElement(){
                if($scope.element.height){
                    delete $scope.element.height;
                }
                if($scope.element.width){
                    delete $scope.element.width;
                }
                element.css('max-width','');
                element.removeAttr('width');
                element.removeAttr('height');
            }
        },
        controller:function($scope){
            $scope.button1 = function () {
                console.log('button 1');
            };
            $scope.button2 = function () {
                console.log('button 2');
            };
        }
    }
}]);