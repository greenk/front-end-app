(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        // Option Quick Tip
        var tableContent = $('#quicktip-popover').html(),
            tableSettings = {
              title: '',
              content: tableContent,
              width: 282,
              animation: 'fade',
              placement: 'bottom'
            };
        // Popup quicktip
        // Find info in https://github.com/sandywalker/webui-popover
        $('#btn-quick-tip').webuiPopover(tableSettings);
        $('#btn-quick-tip2').webuiPopover(tableSettings);

        // Select type payment

        $('.nn-card').click(function() {
            $('.nn-card').removeClass('active');
            $(this).addClass('active');
        });

        // Init payment select
        init();
        // Next button
        $('#btn-next').click(function() {
          var paymentType = $('.nn-card.active').attr('type');
          if(paymentType !== undefined) {
            showFormPayment(paymentType);
            showBtnAddPayment(paymentType, 1);
            showProgress(1);
          }
        });

        // Back button
        $('#btn-back').click(function() {
            showFormPayment('payment');
            showBtnAddPayment('', 0);
            showProgress(0);
        });

        // show payment in top
        showPayment(true);
    });
})(document, window, jQuery);

// Init form
function init() {
  showBtnAddPayment('', 0);
  showFormPayment('payment');

  $('.progress').asProgress({
    namespace: 'progress',
  });

  showProgress(0);
}
// Show progress bar
function showProgress(step) {
  if(step == 0) {
    $('[data-plugin="progress"]').asProgress('go', '50%');
  } else {
    $('[data-plugin="progress"]').asProgress('go', '100%')
  }
}

// Show form payment
function showFormPayment(paymentType) {
  var arr = ['payment', 'credit', 'cash', 'check', 'gift'];
  for(var i = 0; i < arr.length; i++)
    if(arr[i] == paymentType)
      $('#' + arr[i] + '-div').show();
    else
      $('#' + arr[i] + '-div').hide();
}

// Show button add payment
function showBtnAddPayment(paymentType, step) {
  if(step == 0) {
    $('#btn-next').show();
    $('#btn-back').hide();
    $('#btn-cancel').show();
    $('#btn-save').hide();
  } else {
    $('#btn-next').hide();
    $('#btn-back').show();
    $('#btn-cancel').hide();
    $('#btn-save').show();
  }
  if(paymentType === 'credit') {
    $('#btn-send').show();
  } else {
    $('#btn-send').hide();
  }
}

// Function remove add paymment
function showPayment(isShow) {
  if(isShow) {
    $('#add-payment-div').show();
  } else {
    $('#add-payment-div').hide();
  }
}
