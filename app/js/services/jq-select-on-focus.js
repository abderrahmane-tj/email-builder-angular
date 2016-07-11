angular.module('emailApp.services')
.factory('jqSelectOnFocus',function(){
    return function ($element) {
        $element.on('focus',function() {
            var $this = $(this);
            $this.select();

            // Work around Chrome's little problem
            $this.mouseup(function() {
                // Prevent further mouseup intervention
                $this.unbind("mouseup");
                return false;
            });
        });
    };
});