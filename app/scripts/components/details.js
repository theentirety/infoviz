/**
 * scripts/details.js
 */

'use strict';

function Details() {
	var self = this;

	self.active = ko.observable();
	self.links = ko.observableArray();
	self.gettingLinks = ko.observable(false);
	self.gettingDosDonts = ko.observable(false);
	self.dosDonts = ko.observableArray();
	self.editItem = ko.observable(false);
	self.newDoDont = ko.observable();

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
		self.getLinks();
		self.getDosDonts();
		pager.navigate('#!/'+item.attributes.name);
	};

	self.load = function(item) {
		self.active(item);
		self.getLinks();
		self.getDosDonts();
		pager.goTo('#!/'+item.attributes.name);
	};

	self.hide = function() {
		self.reset();
		pager.navigate('');
	};

	self.reset = function() {
		self.active(null);
		self.links([]);
		self.dosDonts([]);
	};

	self.edit = function(item) {
		if (!self.editItem()) {
			self.editItem(true);
			if (item) {

			} else {

			}
		}
	};

	self.DoDont = function(doDont, description) {
		var item = {};
		item.attributes = {
			'do': doDont,
			'description': description,
			'editable': ko.observable(false)
		};
		return item;
	};

	self.saveDoDont = function() {
		if (self.newDoDont()) {
			self.dosDonts.push(new self.DoDont(true, self.newDoDont()));
			self.editItem(false);
			self.newDoDont(null);
			// api call to save
			// update the id of the item once the item is saved
			// enable the edit for that item
		} else {
			self.cancelEdit();
		}
	};

	self.cancelEdit = function() {
		self.newDoDont(null);
		self.editItem(false);
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
				_.each(result, function(item) {
					item.attributes.editable = ko.observable(true);
				});
				self.dosDonts(result);
				self.gettingDosDonts(false);
			},
			error: function(error) {
				// app.myViewModel.errors.showBasic('There was an error loading the search results.');
			}
		});
	};

	return self;
}

module.exports = Details;
