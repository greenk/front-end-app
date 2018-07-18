(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        //// Show pop up create appointment
        $('#btn-create-appointment').click(function() {
          $('#mdl-create-appointment').modal('toggle');
        });
        setUpDatePicker();
        //// Init Winzard
        var option = getWinzardOption();
        $('#appointment-winzard').wizard(option);

        //// Set active button pick time
        $('.btn-time').click(function() {
          if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('i').remove();
          } else {
            $('.btn-time').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $(this).append('<i class="icon wb-check" aria-hidden="true"></i>');
            $('#frm-book-appointment').formValidation('revalidateField', 'hiddenCheck');
          }
        });

        //// Selected NailTech
        $('.cb-nailtech').click(function() {
          if($(this).val() == 'Y') {
            $('#nailtech-div').removeClass('d-none');
          } else {
            $('#nailtech-div').addClass('d-none');
          }
          $('#frm-book-appointment').formValidation('revalidateField', 'hiddenNailtech');
        });

        $('#cb-nailtech').change(function() {
          $('#frm-book-appointment').formValidation('revalidateField', 'hiddenNailtech');
        });

        //// Check a Service
        $('.chb-service').click(function() {
          $('#frm-book-appointment').formValidation('revalidateField', 'hiddenService');
        });

        //// Change phone
        $('#inp-phone').on('blur',function(e){
          $('#frm-book-appointment').formValidation('revalidateField', 'phone');
        });
    });
})(document, window, jQuery);

//// Init winzard when modal shown
$('#mdl-create-appointment').on('shown.bs.modal', function() {
  // Reset winzard
  resetWinzard();
  // Setup step 1
  setDataStep1();
  // Goto step 1
  $('#appointment-winzard').wizard('goTo', 0);
  $('#frm-book-appointment').data('formValidation').resetForm();
});


//// Reset Winzard
function resetWinzard() {
  // Tab1
  $('.btn-time').removeClass('active').find('i').remove();
  $('#inp-name').val('');
  $('#inp-status').val('0');
  $('#inp-phone').val('').formatter().resetPattern();
  $('#inp-email').val('');
  // Tab2
  $('.chb-service').prop('checked', false);
  // Tab3
  $('.cb-nailtech').prop('checked', false);
  if(!$('#nailtech-div').hasClass('d-none')) $('#nailtech-div').addClass('d-none');

}


//// Set data for step 1
function setDataStep1() {

}

//// Set data for step 2
function setDataStep2() {

}

//// Set data for step 3
function setDataStep3() {

}

//// Set data for step 4
function setDataStep4() {
  var date = $('#date-picker-out').val();

  $('#p4-name').html($('#inp-name').val());
  $('#p4-date').html(date);
  $('#p4-time').html($('.btn-time.active').text());
  $('#p4-service').html('');
  $('.chb-service').each(function() {
    if($(this).is(':checked')) {
      $('#p4-service').append('<button type="button" class="btn btn-primary btn-service waves-effect waves-round waves-light waves-effect waves-classic">'+ $(this).val() +'</button>');
    }
  });

  if($('.cb-nailtech:checked').val() === 'Y') {
    $('#p4-nailtech').html($('#cb-nailtech').val());
    $('#p4-div-nailtech').removeClass('d-none');
  } else {
    $('#p4-div-nailtech').addClass('d-none');
  }
}

//// Set up date picker inline
function setUpDatePicker() {
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  var dateAfterMonth = new Date();
  dateAfterMonth.setMonth(dateAfterMonth.getMonth() + 1);
  $('#date-picker').datepicker({
    startDate: truncateDate(nextDate),
    endDate: truncateDate(dateAfterMonth)
  });
  $("#date-picker").on("changeDate", function (event) {
    $("#date-picker-out").val($("#date-picker").datepicker('getFormattedDate'));
    $('#frm-book-appointment').formValidation('revalidateField', 'hiddenCheck');
  });
}

function truncateDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

//// Get Option winzard
function getWinzardOption() {

  var defaults = Plugin.getDefaults("wizard");

  var options = $.extend(true, {}, defaults, {
    onInit: function onInit() {
      getWinzardValidate();
    },
    validator: function validator(step) {
      var fv = $('#frm-book-appointment').data('formValidation');

      var $this = $(this);

      // Validate the container
      fv.validateContainer($this);

      var isValidStep = fv.isValidContainer($this);
      if (isValidStep === false || isValidStep === null) {
        return false;
      }

      return true;
    },
    templates: {
      buttons: function buttons() {
        var options = this.options;
        var html = '<div class="winzard-buttons">' + '<a class="btn btn-default" href="#appointment-winzard" data-wizard="back" role="button">Previous</a>' + '<a class="btn btn-success float-right" href="#appointment-winzard" data-wizard="finish" role="button">Book an appointment</a>' + '<a class="btn btn-primary float-right" href="#appointment-winzard" data-wizard="next" id="btn-next" role="button">Next</a>' + '</div>';
        return html;
      }
    },
    onNext: function onNext(tab, navigation, index) {
      if (navigation.index == 1) {
        setDataStep2();
      } else if(navigation.index == 2) {
        setDataStep3();
      } else if(navigation.index == 3) {
        setDataStep4();
      }
    },
    onFinish: function onFinish() {
      // $('#exampleFormContainer').submit();
      alert("finish");
    },
    buttonsAppendTo: '.panel-body'
  });
  return options;
}


//// Init validate form of Winzard
function getWinzardValidate() {
  $('#frm-book-appointment').formValidation({
    framework: 'bootstrap',
    fields: {
      hiddenCheck: {
        excluded: false,
        validators: {
          callback: {
            message: 'The date and time is required',
            callback: function(value, validator, $field) {
              var date = $('#date-picker-out').val();
              var time = $('.btn-time.active').text();
              return date !== '' && time !== '';
            }
          }
        }
      },
      name: {
        validators: {
          notEmpty: {
            message: 'The name is required'
          }
        }
      },
      status: {
        validators: {
          notEmpty: {
            message: 'The status is required'
          }
        }
      },
      phone: {
        validators: {
          callback: {
            message: 'The phone is required',
            callback: function(value, validator, $field) {
              var phone = $('#inp-phone').val().replace(/\D+/g, '');
              return phone !== '';
            }
          }
        }
      },
      hiddenService: {
        excluded: false,
        validators: {
          callback: {
            message: 'You must pick at least one service',
            callback: function(value, validator, $field) {
              var service = $('.chb-service:checked').val();
              return service !== undefined;
            }
          }
        }
      },
      hiddenNailtech: {
        excluded: false,
        validators: {
          callback: {
            message: 'You need select a nailtech',
            callback: function(value, validator, $field) {
              var nailtech_option = $('.cb-nailtech:checked').val();
              var nailtech = $('#cb-nailtech').val();
              return (nailtech_option === 'Y' && nailtech !== '') || (nailtech_option !== 'Y');
            }
          }
        }
      }
    },
    err: {
      clazz: 'invalid-feedback'
    },
    control: {
      // The CSS class for valid control
      valid: 'is-valid',

      // The CSS class for invalid control
      invalid: 'is-invalid'
    },
    row: {
      invalid: 'has-danger'
    }
  });
}
