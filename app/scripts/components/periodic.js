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
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	self.init();

	return self;
}

module.exports = Periodic;
