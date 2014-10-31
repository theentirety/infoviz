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
				_.each(result, function(item) {
					item.attributes.editable = ko.observable(true);
					item.attributes.editing = ko.observable(false);
					item.attributes.description = ko.observable(item.attributes.description);
				});
				self.gettingCharts(false);
				self.charts(result);
				self.loadChart();
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	self.slug = function(slugcontent) {
		var slugcontent_hyphens = slugcontent.replace(/\s/g,'-');
		var finishedslug = slugcontent_hyphens.replace(/[^a-zA-Z0-9\-]/g,'').toLowerCase();
		return (finishedslug);
	}


	self.loadChart = function() {
		var initPath = pager.page.route[2];
		var vm = ko.dataFor(document.body);

		if (initPath) {
			var chartItem =	_.find(self.charts(), function(chart) {
				return self.slug(chart.attributes.name) == initPath;
			});
			vm.details.load(chartItem);
		}
	};

	self.init();

	return self;
}

module.exports = Periodic;
