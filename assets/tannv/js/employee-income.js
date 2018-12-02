(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        initSlideDay();
        initSlideMonth();
        initSlideYear();

        $('.pnl-customer').click(function() {
          $('#mdl-day-income').modal('toggle');
        });
    });
})(document, window, jQuery);


// Function init slider chose days
function initSlideDay() {
  $('#slide-day').slick({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }]
    });
}

// Function init slider chose month
function initSlideMonth() {
  $('#slide-month').slick({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }]
    });
}

// Function init slider chose year
function initSlideYear() {
  $('#slide-year').slick({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }]
    });
}
