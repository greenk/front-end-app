//// Global variables
var tblTotal, tblTip, tblConfirm; // Table in steps
var custSelected; // Customer selected
var tblCustomer; // Table customer in main form

(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();
        //// Init input mask
        $(':input').inputmask();
        //// initialize datatable
        tblCustomer = $('#tbl-customer').DataTable({
          responsive: true,
          "paging": false,
          "dom": "t" // just show table, no other controls
        });

        $('#tbl-customer tbody').on( 'click', 'tr', function () {
           $(this).toggleClass('selected');
           if(tblCustomer.rows('.selected').data().length >= 1) {
             $('#btn-group-checkout').prop('disabled', false);
           } else {
             $('#btn-group-checkout').prop('disabled', true);
           }
        });

        $('#tbl-customer .selectable-all').click(function() {
          $(this).toggleClass('selected');
          if($(this).hasClass('selected')) {
            $('#tbl-customer tbody > tr').each(function() {
              if(!$(this).hasClass('selected')) $(this).addClass('selected');
            });
          } else {
            $('#tbl-customer tbody > tr').each(function() {
              $(this).removeClass('selected');
            });
          }
          if(tblCustomer.rows('.selected').data().length >= 1) {
            $('#btn-group-checkout').prop('disabled', false);
          } else {
            $('#btn-group-checkout').prop('disabled', true);
          }
        });

        //// Init Winzard
        var option = getWinzardOption();
        $('#pnl-winzard').wizard(option);
    });
})(document, window, jQuery);

//// Init winzard when modal shown
$('#mdl-group-pay').on('shown.bs.modal', function() {
  // Reset winzard
  resetWinzard();
  // Setup step 1
  setDataStep1();
});


//// Reset Winzard
function resetWinzard() {
  $('.spn-reset').html("");
  $('.inp-reset').val("");
  $('#frm-group-pay').data('formValidation').resetForm();
}

//// Get Option winzard
function getWinzardOption() {

  var defaults = Plugin.getDefaults("wizard");

  var options = $.extend(true, {}, defaults, {
    onInit: function onInit() {
      getWinzardValidate();
    },
    validator: function validator(step) {
      var fv = $('#frm-group-pay').data('formValidation');

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
        var html = '<div class="winzard-buttons">' + '<a class="btn btn-default" href="#pnl-winzard" data-wizard="back" role="button">Previous</a>' + '<a class="btn btn-success float-right" href="#pnl-winzard" data-wizard="finish" role="button">Finish</a>' + '<a class="btn btn-primary float-right" href="#pnl-winzard" data-wizard="next" id="btn-next" role="button">Next</a>' + '</div>';
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
  $('#frm-group-pay').formValidation({
    framework: 'bootstrap',
    fields: {
      paymenttype: {
        validators: {
          notEmpty: {
            message: 'The payment method is required'
          }
        }
      },
      paymentbal: {
        validators: {
          notEmpty: {
            message: 'The payment money is required'
          }
        }
      },
      tiptype: {
        validators: {
          notEmpty: {
            message: 'The tip payment method is required'
          }
        }
      },
      hiddenCheck: {
        excluded: false,
        validators: {
          callback: {
            message: 'The tip adjust can be greater than tip in step 2 only $0.01',
            callback: function(value, validator, $field) {
              var tipmoney = Inputmask.unmask($('#tip-bal').val(), { alias: 'currency'});
              if (tipmoney == "") tipmoney = "0";
              var tipadjust = Inputmask.unmask(value, { alias: 'currency'});
              if (tipadjust == "") tipadjust = "0";
              return new Decimal(tipadjust).minus(new Decimal(tipmoney)) <= 0.01;
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


//// Set data for step 1
function setDataStep1() {
  if(tblTotal != null) {
    tblTotal.destroy();
  }
  var total = new Decimal(0);
  var dataset = [];
  custSelected = tblCustomer.rows('.selected').data();
  $.each(custSelected, function (index, value) {
    dataset.push([value[1], value[3], value[4]]);
    var one = value[4].match(/\d+/).toString();
    total = total.plus(new Decimal(one));
  });
  tblTotal = $('#tbl-total').DataTable( {
      "data": dataset,
      "columns": [
          { "title": "NAME" },
          { "title": "EMPLOYEE" },
          { "title": 'TOTAL', 'class': 'text-center' }
      ],
      responsive: true,
      "paging": false,
      "dom": "t"
  });
  $('#spn-total').html(Inputmask.format(total, { alias: 'currency'}));
  $('#btn-total').html(Inputmask.format(total, { alias: 'currency'}));
  // Fix table Responsive
  $('.table-responsive .table').css('width','100%');
  $('#pnl-winzard').wizard('goTo', 0);
}


//// Set up data for step 2
function setDataStep2() {
  $('#payment-bal').val(Inputmask.unmask($('#btn-total').html(), { alias: 'currency'}))
}


//// Set up data for step 3
function setDataStep3() {
  var payment = new Decimal($('#payment-bal').inputmask('unmaskedvalue'));
  var tip;
  try {
    tip = new Decimal($('#tip-bal').inputmask('unmaskedvalue'));
  }
  catch(err) {
      tip = new Decimal(0);
  }
  $('#spn-payment').html(Inputmask.format(payment, { alias: 'currency'}));

  // Init data for table
  if(tblTip != null) {
    tblTip.destroy();
  }
  var dataset = [];
  var inputtip = "";
  var tipPerOne;
  var totalTip = new Decimal(0);
  $.each(custSelected, function (index, value) {
    var payOne = new Decimal(value[4].match(/\d+/).toString());
    if(index == custSelected.length - 1) {
      tipPerOne = tip.minus(totalTip);
    } else {
      tipPerOne = ((payOne.div(payment)).times(tip)).toFixed(2);
    }    
    totalTip = totalTip.plus(tipPerOne);
    inputtip = '<input type="text" id="inp-tip'+index+'" class="form-control inp-tip inp-reset" onblur="changeTip()" value="'+tipPerOne+'" data-inputmask="\'alias\': \'currency\', \'rightAlign\': false">';
    dataset.push([value[1], value[3], inputtip]);
  });

  $('#btn-tip').html(Inputmask.format(totalTip, { alias: 'currency'}));
  $('#hiddenCheck').val(Inputmask.format(totalTip, { alias: 'currency'}));

  tblTip = $('#tbl-tip').DataTable( {
      "data": dataset,
      "columns": [
          { "title": "NAME" },
          { "title": "EMPLOYEE" },
          { "title": 'TOTAL', 'class': 'text-center' }
      ],
      responsive: true,
      "paging": false,
      "dom": "t"
  });

  $('.inp-tip').inputmask('remove');
  $('.inp-tip').inputmask();
}


//// Set up data for step 4
function setDataStep4() {
  $('#spn-tip').html($('#btn-tip').html());
  // Set datatable
  if(tblConfirm != null) {
    tblConfirm.destroy();
  }
  var dataset = [];
  //var tbl2rows = $('#tbl-tip input[id=inp-tip'+index+']');
  $.each(custSelected, function (index, value) {
    var inp = $('#tbl-tip input[id=inp-tip'+index+']');
    dataset.push([value[1], value[3], value[4], Inputmask.format(inp.val(), { alias: 'currency'})]);
  });

  tblConfirm = $('#tbl-confirm').DataTable( {
      "data": dataset,
      "columns": [
          { "title": "NAME" },
          { "title": "EMPLOYEE" },
          { "title": 'TOTAL', 'class': 'text-center' },
          { "title": 'TIPS', 'class': 'text-center' }
      ],
      responsive: true,
      "paging": false,
      "dom": "t"
  });

}

//// OnChange Tip
function changeTip() {
  var totaltip = new Decimal(0);
  var tipNum;
  $('.inp-tip').each(function() {
    tipNum = new Decimal($(this).inputmask('unmaskedvalue'));
    if(tipNum == NaN) tipNum = 0;
    totaltip = totaltip.plus(tipNum);
    $(this).attr('value', tipNum);
    $('#btn-tip').html(Inputmask.format(totaltip, { alias: 'currency'}));
    $('#hiddenCheck').val(Inputmask.format(totaltip, { alias: 'currency'}));
    $('#frm-group-pay').formValidation('revalidateField', 'hiddenCheck');
  });
}
