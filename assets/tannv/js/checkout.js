(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        // Popup quicktip
        // Find info in https://github.com/sandywalker/webui-popover
        $('#btn-quick-tip').webuiPopover(tableSettings);
        $('#btn-quick-tip2').webuiPopover(tableSettings);

        // Select type payment

        $('.nn-card').click(function() {
            $('.nn-card').removeClass('active');
            $(this).addClass('active');
        });
    });
})(document, window, jQuery);

// Option Quick Tip
var tableContent = $('#quicktip-popover').html(),
    tableSettings = {
      title: '',
      content: tableContent,
      width: 282,
      animation: 'fade',
      placement: 'bottom'
    };
