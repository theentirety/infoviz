/**
 * scripts/tooltip.js
 */

'use strict';

function Tooltip() {
	var self = this;

	self.visible = ko.observable(false);
	self.label = ko.observable();
	self.x = ko.observable('0px');
	self.y = ko.observable('0px');

	self.show = function(override) {
		var show = typeof override !== 'undefined' ? override : true;
		if (show && self.visible() == false) {
			self.visible(true);
		} else if (!show && self.visible() == true) {
			self.visible(false);
		}
	}

	self.move = function(x, y, width) {
		var tooltip = $('.infovis-tooltip').first();
		var tooltipWidth = parseInt(tooltip.css('width'));
		var tooltipHeight = parseInt(tooltip.css('height'));
		self.x((x + (width / 2) - (tooltipWidth / 2)) + 'px');
		self.y((y - (tooltipHeight) - 3) + 'px');
	};

	self.set = function(text) {
		self.label(text);
	};

	self.mouseover = function(item, e) {
		self.set(item.attributes.name);
		self.show(true);
		self.move(e.currentTarget.offsetLeft, e.currentTarget.offsetTop, e.currentTarget.offsetWidth);
	};

	return self;
}

module.exports = Tooltip;
