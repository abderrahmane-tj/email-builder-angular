angular.module('emailApp.services')
.factory('appCache', ['$cacheFactory',function ($cacheFactory) {
    return $cacheFactory('appCache');
}]);