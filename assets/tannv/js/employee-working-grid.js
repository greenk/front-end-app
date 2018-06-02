(function(document, window, $){
  'use strict';

  var Site = window.Site;
  $(document).ready(function(){
    Site.run();

    $('.card').click(function() {
      $('#mdl-enter .modal-title>h3').html($(this).find('.formal-name').html());
      $('#mdl-enter .modal-title>p').html($(this).find('.nick-name').html());
      $('#mdl-enter').modal('show');
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
          $('.card').each(function() {

            formalName = $(this).find('.formal-name').html().toLowerCase();
            nickName = $(this).find('.nick-name').html().toLowerCase();
            if((formalName.indexOf(content) <= -1) && (nickName.indexOf(content) <= -1)) {
              if(!$(this).parent().hasClass('d-none')) $(this).parent().addClass('d-none');
            } else {
              $(this).parent().removeClass('d-none');
            }
            
          });
        } else {
          $('#btn-clear-search').addClass('d-none');
          $('.card').parent().removeClass('d-none');
        }
      }
    });

    //// Clear search box
    $('#btn-clear-search').click(function() {
      $('#inp-search-box').val('');
      $(this).addClass('d-none');
      $('.card').parent().removeClass('d-none');
    });
  });
})(document, window, jQuery);
