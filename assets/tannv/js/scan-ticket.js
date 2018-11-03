(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        //// Input event (Support full browser, include IE version < 9)
        $('#scan-input').on('propertychange input', function (e) {

          var valueChanged = false;
          if (e.type=='propertychange') {
              valueChanged = e.originalEvent.propertyName=='value';
          } else {
              valueChanged = true;
          }
          if (valueChanged) {

            // If value is changed
            var content = $(this).val().trim();
            if(content !== '' && content.length == 4) {
              console.log("submit");

            }
          }
        });
    });
})(document, window, jQuery);
