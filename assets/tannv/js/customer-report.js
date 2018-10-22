(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        $('#customer-statistic tbody').on( 'click', 'tr', function () {
           $('#serviceDetailModal').modal('show');
        });

        $('.detail-link').click(function() {
          $('#serviceDetailModal').modal('show');
        });
    });
})(document, window, jQuery);
