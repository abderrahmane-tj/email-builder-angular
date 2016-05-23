var emailApp = angular.module('emailApp');
emailApp.directive('imageHandler',['$timeout',function($timeout){
    return {
        restrict: "A",
        scope:true,
        link: link,
        controller: controller
    };
    function link($scope, element, attrs, elementControls){
        var columns = { 1: 30, 2: 80, 3: 130, 4: 180, 5: 230, 6: 280, 7: 330, 8: 380, 9: 430, 10: 480, 11: 530, 12: 580};
        $scope.$watch('element.src', updateImage);
        $scope.$watch('element.centered', watchCentered); //todo: decide if we need this watcher
        /////////////
        function updateImage(newVal) {
            if(!newVal.trim()){
                element.attr('src', attrs.brokenSrc);
                return;
            }
            attrs.$set('src', attrs.loadingSrc);
            $scope.imgStatus = 'loading';
            //applySize(newSize({width:192,height:120}));

            var vImg = angular.element(new Image);
            vImg.bind('load',load);
            vImg.bind('error',error);
            vImg.attr('src',newVal);
        }
        function watchCentered(val){
            if(val === true){
                attrs.$set('align','center');
            }else{
                element.removeAttr('align');
            }
        }
        function error(){
            //cleanElement();

            attrs.$set('src', attrs.brokenSrc);
            $scope.imgStatus = 'error';
            //applySize(newSize({width:125,height:150}));

            //$scope.$apply();
        }
        function load(){
            var vImage = this;
            attrs.$set('src',$scope.element.src);
            $scope.imgStatus = 'loaded';
            var size = newSize({width:vImage.width, height: vImage.height});
            $scope.element.height = size.height;
            $scope.element.width = size.width;
            //applySize(size);
        }
        function newSize(vImage){
            vImage = vImage || {width: null, height: null};
            var max_width = columns[attrs.imageHandler];
            if(!max_width){
                console.log('imageHandler must be english number between one and twelve!');
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
    }
    function controller($scope){
        $scope.imageAlignment  = {
            center: 'float-center',
            left: 'float-left',
            right: 'float-right'
        };
    }
}]);