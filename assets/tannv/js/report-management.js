(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        setDataDayChart();
        setDataWeekChart();
        setDataMonthChart();
        setDailyReport();
    });
})(document, window, jQuery);

function setDataDayChart() {
  var data = [{
    "data": [[1, 4],[2, 8],[3, 9],[4, 9],[5, 12],[6, 9],[7, 10],[8, 16],[9, 12],[10, 9],[11, 10],[12, 0]],
    "color": "#007bff",
    "label": "Checked-in Customers"
  }, {
    "data": [[1, 5],[2, 6],[3, 10],[4, 8],[5, 9],[6, 8],[7, 12],[8, 14],[9, 12],[10, 7],[11, 12],[12, 0]],
    "color": "#26F041",
    "label": "Checked-in Employees"
  }];

    var ticks = [[1, "08:00<br/>AM"], [2, "09:00<br/>AM"], [3, "10:00<br/>AM"], [4, "11:00<br/>AM"],[5, "12:00<br/>PM"], [6, "01:00<br/>PM"], [7, "02:00<br/>PM"], [8, "03:00<br/>PM"], [9, "04:00<br/>PM"], [10, "05:00<br/>PM"], [11, "06:00<br/>PM"], [12, "07:00<br/>PM"]];

  var options = {
      series: {
        bars: {
            lineWidth: 0,
            show: true,
            barWidth: 0.3,
            order: 1
        }
      },
      xaxis: {
          axisLabelFontSizePixels: 18,
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelFontWeight: 400,
          axisLabelPadding: 10,
          ticks: ticks,
          tickLength: 0,
          autoscaleMargin: .10
      },
      yaxis: {
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 14,
          tickFormatter: function (v, axis) {
              return v;
          },
          tickColor: "#edeff2",
          color: "#474e54"
      },
      grid: {
        color: "#474e54",
        tickColor: "#e3e6ea",
        backgroundColor: {
          colors: ["#fff", "#fff"]
        },
        borderWidth: {
          top: 0,
          right: 0,
          bottom: 2,
          left: 2
        },
        borderColor: "#eef0f2"
      },
      legend: {
        noColumns: 2,
        position: "ne",
        show: true,
        placement: 'outsideGrid',
        container: $('#legend-day-chart')
      }
  };

  var p = $.plot("#customer-in-day", data, options);

  $.each(p.getData()[0].data, function(i, el){
    var o = p.pointOffset({x: el[0], y: el[1]});
    if(o.top < 300) {
      $('<div class="data-point-label">' + el[1] + '</div>').css( {
        position: 'absolute',
        left: o.left - 23,
        top: o.top + 6,
        display: 'none'
      }).appendTo(p.getPlaceholder()).fadeIn('slow');
    }
  });

  $.each(p.getData()[1].data, function(i, el){
    var o = p.pointOffset({x: el[0], y: el[1]});
    if(o.top < 300) {
      $('<div class="data-point-label">' + el[1] + '</div>').css( {
        position: 'absolute',
        left: o.left + 2,
        top: o.top + 6,
        display: 'none'
      }).appendTo(p.getPlaceholder()).fadeIn('slow');
    }
  });
}
function setDataWeekChart() {
  var data = [{
    "data": [[1, 76],[2, 75],[3, 100],[4, 76],[5, 80],[6, 140],[7, 100],[8, 68]],
    "color": "#007bff",
    "label": "Checked-in Customers"
  }, {
    "data": [[1, 80],[2, 60],[3, 76],[4, 60],[5, 100],[6, 120],[7, 100],[8, 54]],
    "color": "#26F041",
    "label": "Checked-in Employees"
  }];

  var ticks = [[1, "12 Sep"], [2, "13 Sep"], [3, "14 Sep"], [4, "15 Sep"],[5, "16 Sep"], [6, "17 Sep"], [7, "18 Sep"], [8, "19 Sep"]];

  var options = {
      series: {
        stack: true,
        bars: {
            lineWidth: 0,
            show: true,
            barWidth: 0.2,
            order: 1
        }
      },
      xaxis: {
          axisLabel: "Time in a day",
          axisLabelFontSizePixels: 14,
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelFontWeight: 400,
          axisLabelPadding: 10,
          ticks: ticks,
          tickLength: 0,
          autoscaleMargin: .10
      },
      yaxis: {
          axisLabel: "Number of customer",
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 14,
          tickFormatter: function (v, axis) {
              return v;
          },
          tickColor: "#edeff2",
          color: "#474e54"
      },
      grid: {
        color: "#474e54",
        tickColor: "#e3e6ea",
        backgroundColor: {
          colors: ["#fff", "#fff"]
        },
        borderWidth: {
          top: 0,
          right: 0,
          bottom: 2,
          left: 2
        },
        borderColor: "#eef0f2"
      },
      legend: {
        show: true,
        noColumns: 2,
        placement: 'outsideGrid',
        container: $('#legend-week-chart')
      }
  };

  $.plot("#customer-in-week", data, options);

}

function setDataMonthChart() {
  var data1 = [[0, 0], [1, 80], [2, 30], [3, 90], [4, 100], [5, 130], [6, 70], [7, 100], [8, 160]];
  var data2 = [[0, 0], [1, 50], [2, 40], [3, 70], [4, 80], [5, 100], [6, 50], [7, 80], [8, 110]];
  var data = [{
    label: "Customer in month",
    data: data1,
    "color": "#007bff"
  }, {
    label: "Number of employee",
    data: data2,
    "color": "#26F041"
  }];

  var ticks = [[0, ""],[1, "6/20"], [2, "6/21"], [3, "6/22"], [4, "6/23"],[5, "6/24"], [6, "6/25"], [7, "6/26"], [8, "6/27"]];

  $.plot("#customer-in-month", data, {
    xaxis: {
      axisLabel: "Date in month",
      axisLabelFontSizePixels: 14,
      axisLabelFontFamily: 'Roboto,sans-serif',
      axisLabelFontWeight: 400,
      axisLabelPadding: 10,
      ticks: ticks,
      tickLength: 0
    },
    yaxis: {
      tickColor: "#edeff2",
      color: "#474e54",
      axisLabel: "Number of customer",
      axisLabelFontFamily: 'Roboto,sans-serif',
      axisLabelUseCanvas: true,
      axisLabelFontWeight: 400,
      axisLabelFontSizePixels: 14,
    },
    series: {
      shadowSize: 0,
      lines: {
          show: true
      },
      points: {
          radius: 3,
          fill: true,
          show: true
      }
    },
    colors: [Config.colors("primary", 400)],
    grid: {
      hoverable: true,
      clickable: true,
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 2,
        left: 2
      },
      borderColor: "#eef0f2"
      // borderColor: "#ff0000"
    },
    legend: {
      noColumns: 0,
      labelBoxBorderColor: "#000000",
      position: "nw"
    }
  });

  $("#customer-in-month").bind("plothover", function (event, pos, item) {
      if (item) {
        previousPoint = item.dataIndex;
        $("#tooltip").remove();
        y = item.datapoint[1];

        showTooltip(item.pageX, item.pageY,
            y + "");
      } else {
        $("#tooltip").remove();
        previousPoint = null;
      }
  });

  $("#customer-in-month").bind("plothover", function (event, pos, item) {
      if (item) {
          previousPoint = item.dataIndex;
          $("#tooltip").remove();
          y = item.datapoint[1];

          showTooltip(item.pageX, item.pageY,
              y + "");
      } else {
          $("#tooltip").remove();
          previousPoint = null;
      }
  });
}

function setDailyReport() {
    var pieData = [],
        series = 4;

    for (var i = 0; i < series; i++) {
      var temp = Math.floor(Math.random() * 100) + 1;
      pieData[i] = {
        label: "Text " + temp + "%",
        data: temp
      };
    }

    $.plot($('#pie-chart'), pieData, {
      series: {
        pie: {
          show: true
        }
      },
      legend: {
        show: true,
        noColumns: 2
      },
      colors: [Config.colors("primary", 500), Config.colors("blue-grey", 200), Config.colors("red", 200), Config.colors("blue", 200)]
    });
}
