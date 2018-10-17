(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    //var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        setCategoryChart();
        setCustomerChart();
        setIncomeChart();

        $('#service-detail tbody').on( 'click', 'tr', function () {
           $('#serviceDetailModal').modal('show');
        });
    });
})(document, window, jQuery);

function setCategoryChart() {
  var weekChartData = {
			labels: ["","","","xx - xx Jul", "xx - xx Aug", "xx - xx Aug", "xx - xx Aug","xx - xx Aug", "xx - xx Sep", "xx - xx Sep", "xx - xx Sep","","",""],
			datasets: [{
				label: 'Income',
				backgroundColor: [
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(107,227,215,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)'
        ],
				borderWidth: 0,
				data: [
					0,0,0,76,75, 100, 76, 80,140,100,60,0,0,0
				]
			}]
		};

  var ctx2 = document.getElementById('category-chart').getContext('2d');
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
                barPercentage: 0.7,
                gridLines: {
                    display:false
                }
            }]
        },
        tooltips: {
          enabled: false
        }
			},
      plugins: [{
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

                var position = element.tooltipPosition();
                if(position.y < 220)
                      ctx.fillText(dataString, position.x, position.y + 13);

                // Set current

                var text = 'current';
                var icon = '\\f0d7'
                if(index == 10) {
                  ctx.fillText(text, position.x, position.y - 20);
                }
              });
            }
          });
        }
      }]
		});
}

// Customer chart
function setCustomerChart() {
  var weekChartData = {
			labels: ["","","xx - xx Jul", "xx - xx Aug", "xx - xx Aug", "xx - xx Aug","xx - xx Sep", "xx - xx Sep", "xx - xx Sep","",""],
			datasets: [{
				label: 'New Customers',
				backgroundColor: 'rgba(153,242,194,1)',
				borderWidth: 0,
				data: [
					0,0,76,75, 100, 76, 80,140,100,0,0
				]
			}, {
				label: 'Engaged Employees',
				backgroundColor: 'rgba(121,178,252,1)',
				borderWidth: 0,
				data: [
					0,0,80,60,76,60,100, 120,100,0,0
				]
			}]
		};

  var ctx2 = document.getElementById('customer-chart').getContext('2d');
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
      plugins: [{
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

                var position = element.tooltipPosition();
                if(position.y < 220)
                      ctx.fillText(dataString, position.x, position.y + 16);
              });
            }
          });
        }
      }]
		});
}

function setIncomeChart() {
  var weekChartData = {
			labels: ["","","","xx - xx Jul", "xx - xx Aug", "xx - xx Aug", "xx - xx Aug","xx - xx Aug", "xx - xx Sep", "xx - xx Sep", "xx - xx Sep","","",""],
			datasets: [{
				label: 'Income',
				backgroundColor: [
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)','rgb(107,227,215,1)','rgb(153,242,194,1)',
          'rgb(153,242,194,1)','rgb(153,242,194,1)'
        ],
				borderWidth: 0,
				data: [
					0,0,0,76,75, 100, 76, 80,140,100,60,0,0,0
				]
			}]
		};

  var ctx2 = document.getElementById('income-chart').getContext('2d');
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
                barPercentage: 0.7,
                gridLines: {
                    display:false
                }
            }]
        },
        tooltips: {
          enabled: false
        }
			},
      plugins: [{
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

                var position = element.tooltipPosition();
                if(position.y < 220)
                      ctx.fillText(dataString, position.x, position.y + 13);

                // Set current

                var text = 'current';
                var icon = '\\f0d7'
                if(index == 10) {
                  ctx.fillText(text, position.x, position.y - 20);
                }
              });
            }
          });
        }
      }]
		});
}
