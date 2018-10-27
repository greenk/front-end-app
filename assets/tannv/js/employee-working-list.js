(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        $('.employee-not-checkin>.not-checkin-item').click(function(){
          $('#examplePositionCenter').modal('toggle');
        });
    });
})(document, window, jQuery);
