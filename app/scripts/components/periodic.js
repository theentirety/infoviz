/**
 * scripts/periodic.js
 */

'use strict';

function Periodic() {
	var self = this;

	self.charts = ko.observableArray();

	self.testChartTypes = [
		'bar',
		'column',
		'scatter',
		'pie',
		'line',
		'area'
	];

	self.Chart = function(type) {
		var data = {};
		data.type = type;
		return data;
	};

	for (var i = 0; i < self.testChartTypes.length; i++) {
		self.charts.push(new self.Chart(self.testChartTypes[i]));
	}

	return self;
}

module.exports = Periodic;
