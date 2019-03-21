(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    var modalCreateGift = $('#modal-create-gift-card');
    $(document).ready(function() {
        Site.run();
        $('#datepicker').datepicker();
    });
})(document, window, jQuery);

