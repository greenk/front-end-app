(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();
        //
        //
        // //// Init Winzard
        // var option = getWinzardOption();
        // $('#pnl-winzard').wizard(option);

        $('#btn-create-appointment').click(function() {
          $('#mdl-create-appointment').modal('toggle');
        });
        setUpDatePicker();
        //// Init Winzard
        var option = getWinzardOption();
        $('#appointment-winzard').wizard(option);
    });
})(document, window, jQuery);

//// Set up date picker inline
function setUpDatePicker() {
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  var dateAfterMonth = new Date();
  dateAfterMonth.setMonth(dateAfterMonth.getMonth() + 1);
  $('#inlineDatepicker').datepicker({
    startDate: truncateDate(nextDate),
    endDate: truncateDate(dateAfterMonth)
  });
  $("#inlineDatepicker").on("changeDate", function (event) {
    $("#inputHiddenInline").val($("#inlineDatepicker").datepicker('getFormattedDate'));
  });
}

function truncateDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
//// Get Option winzard
function getWinzardOption() {

  var defaults = Plugin.getDefaults("wizard");

  var options = $.extend(true, {}, defaults, {
    templates: {
      buttons: function buttons() {
        var options = this.options;
        var html = '<div class="winzard-buttons">' + '<a class="btn btn-default" href="#appointment-winzard" data-wizard="back" role="button">Previous</a>' + '<a class="btn btn-success float-right" href="#appointment-winzard" data-wizard="finish" role="button">Book an appointment</a>' + '<a class="btn btn-primary float-right" href="#appointment-winzard" data-wizard="next" id="btn-next" role="button">Next</a>' + '</div>';
        return html;
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
