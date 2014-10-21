/**
 * scripts/tooltip.js
 */

'use strict';

function Tooltip() {
	var self = this;

	self.visible = ko.observable(false);
	self.label = ko.observable();

	self.show = function(override) {
		var show = typeof override !== 'undefined' ? override : true;
		if (show && self.visible() == false) {
			self.visible(true);
		} else if (!show && self.visible() == true) {
			self.visible(false);
		}
	}

	self.set = function(text) {
		self.label(text);
	};

	return self;
}

module.exports = Tooltip;
