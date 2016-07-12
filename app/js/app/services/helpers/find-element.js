angular.module('emailApp.services')
.factory('findElement',['$rootScope',function($rootScope){
    return function (hashKey) {
        var sections = angular.element(document.body).controller().page.sections;
        for (var i=0; i<sections.length; i++){
            var section = sections[i];

            for (var j=0; j<section.columns.length; j++){
                var column = section.columns[j];

                for (var k=0; k<column.elements.length; k++){
                    var element = column.elements[k];
                    if(element.$$hashKey === hashKey){
                        return element;
                    }
                }
            }
        }
        return null;
    };
}]);