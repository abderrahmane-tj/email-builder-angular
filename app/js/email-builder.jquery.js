(function ($) {
    $.extend({
        emailBuilder: function(options) {
            var $iframe = $(options.iframe);
            if(options.onFire && isFunction(options.onFire)){
                options.onFire();
            }
            if(options.onReady && isFunction(options.onReady)){
                $iframe.one('load', options.onReady);
            }
            window['email-builder-callback'] = options.onClose;
            window['email-builder-data'] = options.data;
            $iframe.attr('src', options.url);

            ///////
            function isFunction(functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            }
            return this;
        }
    });
})(jQuery);
