(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    //var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();
        // Chart in header
        setTodayIncomeReport();
        setTodayTipReport();

        // Chart customer & employees
        setDataDayChart();
        setDataWeekChart();
        setDataMonthChart();

        // Chart income
        setIncomeDayChart();
        setIncomeWeekChart();
        setIncomeMonthChart();
    });
})(document, window, jQuery);

// Plugin show data label
var datalabels = [{
  afterDatasetsDraw: function(chart) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function(dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {

          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();

          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 5;
          var position = element.tooltipPosition();
          if(position.y < 320)
                ctx.fillText(dataString, position.x, position.y + 13);
        });
      }
    });
  }
}];
/***
* Chart Income Today
***/
function setTodayIncomeReport() {
    var config = {
      type: 'pie',
      data: {
        datasets: [{
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(),randomScalingFactor()],
            backgroundColor: [Config.colors("red", 400), Config.colors("green", 400), Config.colors("yellow", 400), Config.colors("blue", 400)]
        }],
        labels: [
            'Text xx%',
            'Text xx%',
            'Text xx%',
            'Text xx%'
        ]
      },
      options: {
        legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 13,
              padding: 18
            }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }

    var ctx = document.getElementById('pie-chart').getContext('2d');
    var myPieChart = new Chart(ctx, config);
}
/***
* Chart Tip Today
***/
function setTodayTipReport() {
    var config = {
      type: 'pie',
      data: {
        datasets: [{
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(),randomScalingFactor()],
            backgroundColor: [Config.colors("red", 400), Config.colors("green", 400), Config.colors("yellow", 400), Config.colors("blue", 400)]
        }],

        labels: [
            'Text xx%',
            'Text xx%',
            'Text xx%',
            'Text xx%'
        ]
      },
      options: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 13,
              padding: 18
            }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }

    var ctx = document.getElementById('todaytip-chart').getContext('2d');
    var myPieChart = new Chart(ctx, config);
}

/***
* Chart Customers & Employees by day
***/
function setDataDayChart() {
  var dayChartData = {
			labels: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM","12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
			datasets: [{
				label: 'Checked-in Customers',
				backgroundColor: 'rgba(153,242,194,1)',
				borderWidth: 0,
				data: [
					4,8, 9, 9, 12,9,10,16,12,9,10,0
				]
			}, {
				label: 'Checked-in Employees',
				backgroundColor: 'rgba(121,178,252,1)',
				borderWidth: 0,
				data: [
					5,6,10,8,9, 8,12,14,12,7,12,0
				]
			}]

		};

  var ctx = document.getElementById('day-chart').getContext('2d');
  var myBar = new Chart(ctx, {
			type: 'bar',
			data: dayChartData,
			options: {
				responsive: true,
        maintainAspectRatio: false,
				legend: {
					position: 'top',
          labels: {
            usePointStyle: true
          }
				},
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }]
        }
			},
      plugins: datalabels
		});
}

/***
* Chart Customer & Employees by week
***/
function setDataWeekChart() {
  var weekChartData = {
			labels: ["","12 Sep", "13 Sep", "14 Sep", "15 Sep","16 Sep", "17 Sep", "18 Sep", "19 Sep",""],
			datasets: [{
				label: 'Checked-in Customers',
				backgroundColor: 'rgba(153,242,194,1)',
				borderWidth: 0,
				data: [
					0,76,75, 100, 76, 80,140,100,60,0
				]
			}, {
				label: 'Checked-in Employees',
				backgroundColor: 'rgba(121,178,252,1)',
				borderWidth: 0,
				data: [
					0,80,60,76,60,100, 120,100,54,0
				]
			}]
		};

  var ctx2 = document.getElementById('week-chart').getContext('2d');
  var myBar = new Chart(ctx2, {
			type: 'bar',
			data: weekChartData,
			options: {
				responsive: true,
        maintainAspectRatio: false,
				legend: {
					position: 'top',
          labels: {
            usePointStyle: true
          }
				},
        scales: {
            xAxes: [{
                barPercentage: 0.8,
                gridLines: {
                    display:false
                }
            }]
        }
			},
      plugins: datalabels
		});
}

/***
* Chart Customer & Employees by month
***/
function setDataMonthChart() {
  var config = {
			type: 'line',
			data: {
				labels: ['08 Aug', '', '','', '12 Aug','','','', '16 Aug','','','', '20 Aug','','','', '24 Aug','','','', '28 Aug','','','', '01 Sep','','','', '05 Sep','','','', '09 Sep','','','', '13 Sep','','','', '15 Sep','','','', '19 Sep'],
        showXLabels: 12,
        datasets: [{
					label: 'Checked-in Customers',
					backgroundColor: 'rgba(153,242,194,1)',
					borderColor: 'rgba(153,242,194,1)',
					data: [
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor()
					],
					fill: false,
				}, {
					label: 'Checked-in Employees',
					fill: false,
					backgroundColor: 'rgba(121,178,252,1)',
					borderColor: 'rgba(121,178,252,1)',
					data: [
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor()
					],
				}]
			},
			options: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
				legend: {
					position: 'top',
          labels: {
            usePointStyle: true
          }
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
            gridLines: {
                display:false
            }
					}]
				}
			}
		};

    var ctx = document.getElementById('month-chart').getContext('2d');
    var myPieChart = new Chart(ctx, config);
}
var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
};
/***
* Chart Income by day
***/
function setIncomeDayChart() {
  var dayIncomeChartData = {
			labels: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM","12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
			datasets: [{
				backgroundColor: 'rgba(121,178,252,1)',
				borderWidth: 0,
				data: [
					200,1200, 1500, 1450, 2000, 1350, 1600, 2750, 1900, 1550, 1600, 0
				]
			}]

		};

  var ctx = document.getElementById('day-income-chart').getContext('2d');
  var myBar = new Chart(ctx, {
			type: 'bar',
			data: dayIncomeChartData,
			options: {
				responsive: true,
        maintainAspectRatio: false,
				legend: {
					display: false
				},
        scales: {
            xAxes: [{
                barPercentage: 0.6,
                gridLines: {
                    display:false
                }
            }]
        },
        tooltips: {
          enabled: false
        }
			},
      plugins: datalabels
		});
}
/***
* Chart Income by week
***/
function setIncomeWeekChart() {
  var weekChartData = {
			labels: ["","12 Sep", "13 Sep", "14 Sep", "15 Sep","16 Sep", "17 Sep", "18 Sep", "19 Sep",""],
			datasets: [{
				label: 'Income',
				backgroundColor: 'rgba(153,242,194,1)',
				borderWidth: 0,
				data: [
					0,76,75, 100, 76, 80,140,100,60,0
				]
			}]
		};

  var ctx2 = document.getElementById('week-income-chart').getContext('2d');
  var myBar = new Chart(ctx2, {
			type: 'bar',
			data: weekChartData,
			options: {
				responsive: true,
        maintainAspectRatio: false,
				legend: {
					display: false
				},
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display:false
                }
            }]
        },
        tooltips: {
          enabled: false
        }
			},
      plugins: datalabels
		});
}
/***
* Chart Income by month
***/
function setIncomeMonthChart() {
  var config = {
			type: 'line',
			data: {
				labels: ['08 Aug', '', '','', '12 Aug','','','', '16 Aug','','','', '20 Aug','','','', '24 Aug','','','', '28 Aug','','','', '01 Sep','','','', '05 Sep','','','', '09 Sep','','','', '13 Sep','','','', '15 Sep','','','', '19 Sep'],
        showXLabels: 12,
        datasets: [{
					label: 'Income',
					backgroundColor: 'rgba(121,178,252,1)',
					borderColor: 'rgba(121,178,252,1)',
					data: [
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
						randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),
            randomScalingFactor()
					],
					fill: false,
				}]
			},
			options: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
				legend: {
					display: false
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
            gridLines: {
                display:false
            }
					}]
				}
			}
		};

    var ctx = document.getElementById('month-income-chart').getContext('2d');
    var myPieChart = new Chart(ctx, config);
}
