/**
 * scripts/periodic.js
 */

'use strict';

function Periodic() {
	var self = this;

	self.charts = ko.observableArray();
	self.gettingCharts = ko.observable(false);

	self.init = function() {
		self.gettingCharts(true);
		Parse.Cloud.run('getVizTypes', {
			timestamp: moment.utc().valueOf()
		}, {
			success: function(result) {
				self.gettingCharts(false);
				self.charts(result);
				self.loadChart();
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	self.loadChart = function() {
		var initPath = pager.page.route[1];
		if (initPath) {
			var chartItem =	_.find(self.charts(), function(chart) {
				return chart.attributes.name == initPath;
			});
			var vm = ko.dataFor(document.body);
			vm.details.load(chartItem);
		}
	};

	self.init();

	return self;
}

module.exports = Periodic;
