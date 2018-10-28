(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        $('.employee-not-checkin>.not-checkin-item').click(function(){
          $('#mdl-checkin').modal('toggle');
        });

        //// Search event (Support full browser, include IE version < 9)
        $('#inp-search-box').on('propertychange input', function (e) {

          var valueChanged = false;
          if (e.type=='propertychange') {
              valueChanged = e.originalEvent.propertyName=='value';
          } else {
              valueChanged = true;
          }
          if (valueChanged) {

            // If value is changed
            var content = $(this).val();
            if(content !== '') {
              // Text search not empty
              $('#btn-clear-search').removeClass('d-none');
              content = content.toLowerCase();
              var formalName = '';
              var nickName = '';

              $('.not-checkin-item').each(function() {

                formalName = $(this).find('.not-checkin-name>p:first-child').html().toLowerCase();
                nickName = $(this).find('.not-checkin-name>p:last-child').html().toLowerCase();
                if((formalName.indexOf(content) <= -1) && (nickName.indexOf(content) <= -1)) {
                  if(!$(this).hasClass('d-none')) $(this).addClass('d-none');
                } else {
                  $(this).removeClass('d-none');
                }

              });
            } else {
              $('#btn-clear-search').addClass('d-none');
              $('.not-checkin-item').removeClass('d-none');
            }
          }
        });

        //// Clear search box
        $('#btn-clear-search').click(function() {
          $('#inp-search-box').val('');
          $(this).addClass('d-none');
          $('.not-checkin-item').removeClass('d-none');
        });
    });
})(document, window, jQuery);
