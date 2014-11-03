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

	self.new = function() {
		var newName = window.prompt('Please enter the name of the new visualization.');
		if (newName.length >= 3) {
			Parse.Cloud.run('saveViz', {
				name: newName,
				timestamp: moment.utc().valueOf()
			}, {
				success: function(result) {
					result.attributes.editable = ko.observable(true);
					result.attributes.editing = ko.observable(false);
					result.attributes.description = ko.observable(result.attributes.description);
					self.charts.push(result);
				},
				error: function(error) {
					console.log(error);
				}
			});
		} else {
			alert('The name must be at least 3 characters in length.')
		}
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
