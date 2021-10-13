(function (document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function () {
        Site.run();
        $('.datepicker').datepicker();
        $('.select-gift-item').on('click', function () {
            var that = $(this);
            var thatGiftItem = that.closest('.gift-item');
            if (!thatGiftItem.hasClass('selected')) {
                $('.gift-item').removeClass('selected');
                thatGiftItem.addClass('selected');
                $('.select-gift-item').text('Select').removeClass('btn-outline btn-default').addClass('btn-info');
                that.text('Unselect').removeClass('btn-info').addClass('btn-outline btn-default');

            } else {
                thatGiftItem.removeClass('selected');
                that.text('Select').removeClass('btn-outline btn-default').addClass('btn-info');
            }
        });

        $('.sent-to-myself').on('change', function () {
            var that = $(this);
            var receiveInfo = that.closest('.row').next();
            console.log(receiveInfo);
            if (that.is(':checked')) {
                receiveInfo.closest('.receiver-info').hide();
            } else {
                receiveInfo.closest('.receiver-info').show();
            }
        })
    });
})(document, window, jQuery);


