(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        // Add service
        $('#btn-add-service').click(function () {
           showAddServiceModal(1, '');
        });
    });
})(document, window, jQuery);

/*
Func: showAddServiceModal
Auth: tannv
Para: type: 1: Service, 2: Employee
      html: html text add to modal content
*/
function showAddServiceModal(type, html) {

  if(!($("#addServiceModal").data('bs.modal') || {isShown: false}).isShown) $('#addServiceModal').modal('show');
}
