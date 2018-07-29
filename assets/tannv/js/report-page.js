(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        setDataDayChart();
        setDataWeekChart();
        setDataMonthChart();
    });
})(document, window, jQuery);

function setDataDayChart() {
  var data = [[0, 0],[1, 2],[2, 4],[3, 1],[4, 8],[5, 9],[6, 0],[7, 0],[8, 0],[9, 0]];
  var dataset = [{ label: "Number of customer", data: data, color: "#007bff" }];
  var ticks = [[0, 0],[1, "10:00"], [2, "11:00"], [3, "12:00"], [4, "1:00"],[5, "2:00"], [6, "3:00"], [7, "4:00"], [8, "5:00"], [9, "6:00"]];

  var options = {
      series: {
        stack: true,
        bars: {
            lineWidth: 0,
            show: true,
            align: 'center',
            barWidth: 0.4
        }
      },
      xaxis: {
          axisLabel: "Time in a day",
          axisLabelFontSizePixels: 14,
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelFontWeight: 400,
          axisLabelPadding: 10,
          ticks: ticks,
          tickLength: 0
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
        show: false
      }
  };

  $.plot("#customer-in-day", dataset, options);
}


function setDataWeekChart() {
  var data = [[0, 0],[1, 38],[2, 52],[3, 78],[4, 84],[5, 0],[6, 0],[7, 0],[8, 0]];
  var dataset = [{ data: data, color: "#007bff" }];
  var ticks = [[0, ""],[1, "7/13"], [2, "7/14"], [3, "7/15"], [4, "7/16"],[5, "7/17"], [6, "7/18"], [7, "7/19"], [8, "7/20"]];

  var options = {
      series: {
        stack: true,
        bars: {
            lineWidth: 0,
            show: true,
            barWidth: 0.4,
            align: "center"
        },
        valueLabels:
        {
          show: true,
          yoffset: 0,
          xoffset: 0,
          align: 'center',
          valign: 'above',
          fontcolor: 'darkblue'
        }
      },
      xaxis: {
          axisLabel: "Date in week",
          axisLabelFontSizePixels: 14,
          axisLabelFontFamily: 'Roboto,sans-serif',
          axisLabelFontWeight: 400,
          axisLabelPadding: 10,
          ticks: ticks,
          tickLength: 0
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
        show: false
      }
  };

  $.plot("#customer-in-week", dataset, options);
}

function setDataMonthChart() {
  var b = [[0, 0], [1, 80], [2, 30], [3, 90], [4, 100], [5, 130], [6, 70], [7, 100], [8, 160]];
  var a = [{
    label: "Customer in month",
    data: b
  }];

  var ticks = [[0, ""],[1, "6/20"], [2, "6/21"], [3, "6/22"], [4, "6/23"],[5, "6/24"], [6, "6/25"], [7, "6/26"], [8, "6/27"]];

    $.plot("#customer-in-month", a, {
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
        show: true,
        // fill: true,
        // fillColor: "#ff0000",
        lineWidth: 1.5
      },
      points: {
        show: true,
        fill: true,
        fillColor: Config.colors("primary", 600),
        radius: 3,
        lineWidth: 1
      }
    },
    colors: [Config.colors("primary", 400)],
    grid: {
      // show: true,
      hoverable: true,
      clickable: true,
      // color: "green",
      // tickColor: "red",
      backgroundColor: {
        colors: ["#fcfdfe", "#fcfdfe"]
      },
      borderWidth: 0
      // borderColor: "#ff0000"
    },
    legend: {
      show: false
    }
  });
}
