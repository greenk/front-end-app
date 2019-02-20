(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var mdlAppointment = $('#mdl-appointment-detail');
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();
        initSlideDay();
        $('.pnl-customer').click(function() {
            mdlAppointment.modal('toggle');
        });
        mdlAppointment.on('shown.bs.modal', function() {
            $('#slide-day').resize();
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
