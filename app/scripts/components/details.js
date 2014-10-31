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
	self.newItem = ko.observable();
	self.newLinkName = ko.observable();
	self.newLinkUrl = ko.observable();

	self.oldItem = null;
	self.oldUrl = null;

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

	self.DoDont = function(doDont, description) {
		var item = {};
		item.attributes = {
			'id': null,
			'do': doDont,
			'description': ko.observable(description),
			'editable': ko.observable(false),
			'editing': ko.observable(false)
		};
		return item;
	};

	self.Link = function(title, url) {
		var item = {};
		item.attributes = {
			'title': title,
			'url': url,
			'editable': ko.observable(false),
			'editing': ko.observable(false)
		};
		return item;
	};

	self.save = function(item, form, listType) {
		// 	// api call to save
		// 	// update the id of the item once the item is saved
		// 	// enable the edit for that item
		if (item) {
			item.attributes.editing(false);
			Parse.Cloud.run('saveDoDont', {
				id: item.id,
				description: item.attributes.description(),
				timestamp: moment.utc().valueOf()
			}, {
				success: function(result) {
					item.attributes.editable(true);
				},
				error: function(error) {
					console.log(error);
				}
			});

		} else {
			var target = $(form).parents('.infovis-details-editfield');
			target.hide();
			target.prev().show();
			var doDont = listType == 'do' ? true : false;
			var newListItem = new self.DoDont(doDont, self.newItem());
			self.dosDonts.push(newListItem);
			Parse.Cloud.run('saveDoDont', {
				vizId: self.active().id,
				listType: doDont,
				description: self.newItem(),
				timestamp: moment.utc().valueOf()
			}, {
				success: function(result) {
					newListItem.attributes.editable(true);
					newListItem.id = result.id;
				},
				error: function(error) {
					console.log(error);
				}
			});
			self.newItem(null);
		}
		self.editItem(false);
	};

	self.edit = function(item, e) {
		if (item) {
			self.editItem(true);
			self.oldItem = item.attributes.description();
			item.attributes.editing(true);
		} else {
			var target = $(e.currentTarget);
			target.hide();
			target.next().show();
			self.editItem(true);
		}
	};

	self.cancelEdit = function(item, e) {
		if (item) {
			item.attributes.description(self.oldItem);
			item.attributes.editing(false);
		} else {
			var target = $(e.currentTarget).parents('.infovis-details-editfield');
			target.hide();
			target.prev().show();
			self.newItem(null);
		}
		self.editItem(false);
	};

	self.editLink = function(item, e) {
		if (item) {
			self.oldItem = item.attributes.title();
			self.oldUrl = item.attributes.url();
			item.attributes.editing(true);
		} else {
			var target = $(e.currentTarget);
			target.hide();
			target.next().show();
		}
		self.editItem(true);
	};

	self.cancelEditLink = function(item) {
		if (item) {
			item.attributes.title(self.oldItem);
			item.attributes.url(self.oldUrl);
			item.attributes.editing(false);
		} else {
			self.newLinkUrl(null);
			self.newLinkName(null);
		}
		self.editItem(false);
	};

	self.saveLink = function(item) {
		if (item) {
			item.attributes.editing(false);
		} else if (self.newLinkName() && self.newLinkUrl()) {
			self.links.push(new self.Link(self.newLinkName(), self.newLinkUrl()));
			self.newLinkUrl(null);
			self.newLinkName(null);
		}
		self.editItem(false);
	};

	self.getLinks = function() {
		self.gettingLinks(true);
		Parse.Cloud.run('getVizLinks', {
			vizId: self.active().id,
			timestamp: moment.utc().valueOf()
		}, {
			success: function(result) {
				_.each(result, function(item) {
					item.attributes.editable = ko.observable(true);
					item.attributes.editing = ko.observable(false);
					item.attributes.title = ko.observable(item.attributes.title);
					item.attributes.url = ko.observable(item.attributes.url);
				});
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
					item.attributes.editing = ko.observable(false);
					item.attributes.description = ko.observable(item.attributes.description);
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
