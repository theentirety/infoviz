/**
 * scripts/details.js
 */

'use strict';

function Details() {
	var self = this;

	self.visible = ko.observable(false);
	self.active = ko.observable();
	self.links = ko.observableArray();
	self.gettingLinks = ko.observable(false);
	self.gettingDosDonts = ko.observable(false);
	self.dosDonts = ko.observableArray();

	self.doList = self.dosDonts.filter(function(item) {
		return item.attributes.do;
	});

	self.dontList = self.dosDonts.filter(function(item) {
		return !item.attributes.do;
	});

	self.show = function(item) {
		if (self.active()) {
			if (item.id == self.active().id) {
				return;
			} else {
				self.reset();
			}
		}
		self.active(item);
		self.visible(true);
		self.getLinks();
		self.getDosDonts();
	};

	self.hide = function() {
		self.visible(false);
		$(document).queue(function() {
			self.reset();
			$(document).dequeue();
		})
	};

	self.reset = function() {
		self.active(null);
		self.links([]);
		self.dosDonts([]);
	};

	self.getLinks = function() {
		self.gettingLinks(true);
		Parse.Cloud.run('getVizLinks', {
			vizId: self.active().id,
			timestamp: moment.utc().valueOf()
		}, {
			success: function(result) {
				self.gettingLinks(false);
				self.links(result);
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	self.getDosDonts = function() {
		self.gettingDosDonts(true);
		Parse.Cloud.run('getVizDosDonts', {
			vizId: self.active().id,
			timestamp: moment.utc().valueOf()
		}, {
			success: function(result) {
				self.gettingDosDonts(false);
				self.dosDonts(result);
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	return self;
}

module.exports = Details;
