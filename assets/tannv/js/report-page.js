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
  var data = [{
    "data": [[1, 2],[2, 4],[3, 1],[4, 8],[5, 9],[6, 0],[7, 0],[8, 0],[9, 0]],
    "color": "#007bff",
    "label": "Number of customer"
  }, {
    "data": [[1, 3],[2, 5],[3, 6],[4, 5],[5, 7],[6, 0],[7, 0],[8, 0],[9, 0]],
    "color": "#26F041",
    "label": "Number of employee"
  }];

    var ticks = [[1, "10:00"], [2, "11:00"], [3, "12:00"], [4, "1:00"],[5, "2:00"], [6, "3:00"], [7, "4:00"], [8, "5:00"], [9, "6:00"]];

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
        borderColor: "#eef0f2",
        hoverable: true,
        clickable: true
      },
      legend: {
        noColumns: 0,
        labelBoxBorderColor: "#000000",
        position: "ne",
        show: true,
        noColumns: 1
      }
  };

  $.plot("#customer-in-day", data, options);
  var previousPoint;
  $("#customer-in-day").bind("plothover", function (event, pos, item) {
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

  $("#customer-in-day").bind("plotclick", function (event, pos, item) {
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

function showTooltip(x, y, contents) {
    $("<div id='tooltip'>" + contents + "</div>").css({
        position: "absolute",
        display: "none",
        top: y - 25,
        left: x + 6,
        padding: "2px",
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
}
function setDataWeekChart() {
  var data = [{
    "data": [[1, 38],[2, 52],[3, 78],[4, 84],[5, 10],[6, 0],[7, 0],[8, 0]],
    "color": "#007bff",
    "label": "Number of customer"
  }, {
    "data": [[1, 30],[2, 50],[3, 60],[4, 50],[5, 70],[6, 0],[7, 0],[8, 0]],
    "color": "#26F041",
    "label": "Number of employee"
  }];

  var ticks = [[1, "7/13"], [2, "7/14"], [3, "7/15"], [4, "7/16"],[5, "7/17"], [6, "7/18"], [7, "7/19"], [8, "7/20"]];

  var options = {
      series: {
        stack: true,
        bars: {
            lineWidth: 0,
            show: true,
            barWidth: 0.3,
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
        borderColor: "#eef0f2",
        hoverable: true,
        clickable: true
      },
      legend: {
        noColumns: 0,
        labelBoxBorderColor: "#000000",
        position: "nw",
        show: true,
        noColumns: 2
      }
  };

  $.plot("#customer-in-week", data, options);

  $("#customer-in-week").bind("plothover", function (event, pos, item) {
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

  $("#customer-in-week").bind("plotclick", function (event, pos, item) {
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
