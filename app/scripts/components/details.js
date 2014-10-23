/**
 * scripts/details.js
 */

'use strict';

function Details() {
	var self = this;

	self.visible = ko.observable(false);
	self.active = ko.observable();
	self.links = ko.observable();

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
		self.links(null);
	};

	self.getLinks = function() {
		Parse.Cloud.run('getVizLinks', {
			vizId: self.active().id,
			timestamp: moment.utc().valueOf()
		}, {
			success: function(result) {
				self.links(result);
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	return self;
}

module.exports = Details;
