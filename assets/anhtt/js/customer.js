(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    var modalCreateGift = $('#modal-create-gift-card');
    $(document).ready(function() {
        document.getElementById('change-theme-btn').onclick = function() {
            var themeHref = document.getElementById('customer-change-theme').href;
            var explode = themeHref.split('/');
            explode[explode.length - 1] = explode[explode.length - 1] === 'customer-dark.css' ? 'customer-light.css' : 'customer-dark.css';
            document.getElementById('customer-change-theme').href = explode.join('/');
        };
    });
})(document, window, jQuery);
