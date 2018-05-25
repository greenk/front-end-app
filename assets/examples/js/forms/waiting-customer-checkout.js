(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/form/waiting-customer-checkout', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.tablesDatatable = mod.exports;
    global.formsWizard = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';
  $(":input").inputmask();
  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });
  //// initialize datatable
  var table = (0, _jquery2.default)('#tbl-customer').DataTable({
    responsive: true,
    "paging": false,
    "dom": "t" // just show table, no other controls
  });

  (function () {

    $('#tbl-customer tbody').on( 'click', 'tr', function () {
       $(this).toggleClass('selected');
       if(table.rows('.selected').data().length >= 1) {
         $('#btn-group-checkout').prop('disabled', false);
       } else {
         $('#btn-group-checkout').prop('disabled', true);
       }
    });
  })();
  //// initialize winzard
  var dataSelected;
  var tblstep1, tblstep2, tblstep3;
  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery2.default.extend(true, {}, defaults, {
      onInit: function onInit() {
        (0, _jquery2.default)('#frm-group-pay').formValidation({
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
                  message: 'The payment method for tip is required'
                }
              }
            },
            tipbal: {
              validators: {
                notEmpty: {
                  message: 'The tip money is required'
                },
                callback: {
                  message: 'The tip money must greater than 0',
                  callback: function(value, validator, $field) {
                    var value = $('#tip-bal').inputmask('unmaskedvalue');
                    return value > 0;
                  }
                }
              }
            },
            hiddenCheck: {
              excluded: false,
              validators: {
                callback: {
                  message: 'The tip adjust can be less than or equal total tip in step 2',
                  callback: function(value, validator, $field) {
                    var tipmoney = Inputmask.unmask($('#tip-bal').val(), { alias: 'currency'});
                    var tipadjust = Inputmask.unmask(value, { alias: 'currency'});
                    return Number(tipadjust) - Number(tipmoney) <= 0.01;
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
      },
      validator: function validator(step) {
        var fv = (0, _jquery2.default)('#frm-group-pay').data('formValidation');

        var $this = (0, _jquery2.default)(this);

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
        // Tab payment
        if(navigation.index == 2) {
          var totalstep2 = Number($('#payment-bal').inputmask('unmaskedvalue')) + Number($('#tip-bal').inputmask('unmaskedvalue'));
          $('#total-step2').html(Inputmask.format(totalstep2, { alias: 'currency'}));

          // Init data for table winzard step 3
          if(tblstep2 != null) {
            tblstep2.destroy();
          }
          var dataset2 = [];
          var inputtip = "";
          var tipValue = Number($('#tip-bal').inputmask('unmaskedvalue'));
          var totalPayment = Number($('#payment-bal').inputmask('unmaskedvalue'));
          var tipPerOne, tipPerOneValue;
          var totalTip = 0;
          $.each(dataSelected, function (index, value) {
            tipPerOne = Inputmask.format(((Number(value[4].match(/\d+/)) / totalPayment) * tipValue), { alias: 'currency'});
            tipPerOneValue = Inputmask.unmask(tipPerOne, { alias: 'currency'});
            totalTip += Number(tipPerOneValue);
            inputtip = '<input type="text" name="inptipz" class="form-control inp-tip inp-reset" onblur="changeTip()" value="'+tipPerOneValue+'" data-inputmask="\'alias\': \'currency\', \'rightAlign\': false">';
            dataset2.push([value[1], value[3], inputtip]);
          });

          $('#btn-total-tip').html(Inputmask.format(totalTip, { alias: 'currency'}));

          tblstep2 = $('#tbl-step2').DataTable( {
              "data": dataset2,
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
        // Tab Tips Adjustment
        } else if(navigation.index == 3) {
          var totalstep3 = Number(Inputmask.unmask($('#total-step1').html(), { alias: 'currency'})) + Number(Inputmask.unmask($('#btn-total-tip').html(), { alias: 'currency'}));
          $('#total-step3').html(Inputmask.format(totalstep3, { alias: 'currency'}));
          // Set datatable
          if(tblstep3 != null) {
            tblstep3.destroy();
          }
          var dataset3 = [];
          var tbl2rows = $('#tbl-step2 input');
          $.each(dataSelected, function (index, value) {
            var inp = $(tbl2rows[index]);
            // console.log(tbl2rows[index]);
            dataset3.push([value[1], value[3], value[4], Inputmask.format(inp.val(), { alias: 'currency'})]);
          });

          tblstep3 = $('#tbl-step3').DataTable( {
              "data": dataset3,
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
      },
      onFinish: function onFinish() {
        // $('#exampleFormContainer').submit();
        alert("finish");
      },
      buttonsAppendTo: '.panel-body'
    });

    (0, _jquery2.default)('#pnl-winzard').wizard(options);

    //// Set data when modal shown
    $('#mdl-group-pay').on('shown.bs.modal', function() {
      // Reset data
      if(tblstep1 != null) {
        tblstep1.destroy();
      }
      $('.spn-reset').html("");
      $('.inp-reset').val("");
      $('#frm-group-pay').data('formValidation').resetForm()
      // Set data step 1
      var totalstep1 = 0;
      var dataset = [];
      dataSelected = table.rows('.selected').data();
      $.each(dataSelected, function (index, value) {
        dataset.push([value[1], value[3], value[4]]);
        totalstep1 += Number(value[4].match(/\d+/));
      });
      tblstep1 = $('#tbl-step1').DataTable( {
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
      $('#pnl-winzard').wizard('goTo', 0);
      $('#total-step1').html(Inputmask.format(totalstep1, { alias: 'currency'}));
      $('#btn-total-step1').html(Inputmask.format(totalstep1, { alias: 'currency'}));
      $('#payment-bal').val(totalstep1);
      // Fix table Responsive
      $('.table-responsive .table').css('width','100%');
    });

  })();
});

function changeTip() {
  var totaltip = 0;
  var tipNum;
  $('.inp-tip').each(function() {
    tipNum = Number($(this).inputmask('unmaskedvalue'));
    if(tipNum == NaN) tipNum = 0;
    totaltip += tipNum;
    $(this).attr('value', tipNum);
    $('#btn-total-tip').html(Inputmask.format(totaltip, { alias: 'currency'}));
    $('#hiddenCheck').val(Inputmask.format(totaltip, { alias: 'currency'}));
    $('#frm-group-pay').formValidation('revalidateField', 'hiddenCheck');
  });
}
