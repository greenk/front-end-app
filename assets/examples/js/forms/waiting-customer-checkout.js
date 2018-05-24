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

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  var table = (0, _jquery2.default)('#tbl-customer').DataTable({
    responsive: true,
    "paging": false,
    "dom": "t" // just show table, no other controls
  });
  //// initialize datatable
  (function () {

    $('#tbl-customer tbody').on( 'click', 'tr', function () {
       $(this).toggleClass('selected');
       if(table.rows('.selected').data().length >= 1) {
         $('#btn-group-checkout').prop('disabled', false);
       } else {
         $('#btn-group-checkout').prop('disabled', true);
       }
       console.log(table.rows('.selected').data());
    });
  })();
  //// initialize winzard

  (function () {
    var defaults = Plugin.getDefaults("wizard");

    var options = _jquery2.default.extend(true, {}, defaults, {
      templates: {
        buttons: function buttons() {
          var options = this.options;
          var html = '<div class="winzard-buttons">' + '<a class="btn btn-default" href="#pnl-winzard" data-wizard="back" role="button">Previous</a>' + '<a class="btn btn-success float-right" href="#pnl-winzard" data-wizard="finish" role="button">Finish</a>' + '<a class="btn btn-primary float-right" href="#pnl-winzard" data-wizard="next" role="button">Next</a>' + '</div>';
          return html;
        }
      },
      onFinish: function onFinish() {
        // $('#exampleFormContainer').submit();
        alert("finish");
      },
      buttonsAppendTo: '.panel-body'
    });

    (0, _jquery2.default)('#pnl-winzard').wizard(options);
    var tblstep1;
    //// Set data when modal shown
    $('#mdl-group-pay').on('shown.bs.modal', function() {
      // Reset data
      if(tblstep1 != null) {
        tblstep1.destroy();
      }
      var dataset = [];
      var selectedItems = table.rows('.selected').data();
      $.each(selectedItems, function (index, value) {
        dataset.push([value[1], value[3], value[4]]);
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
      // Goto step 1
      $('#pnl-winzard').wizard('goTo', 0);
    });
  })();
});
