/**
 * scripts/app.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

function App() {
	var self = this;
	self.modules = {};
	pager.extendWithPage(self.modules);
	ko.applyBindings(self.modules);
	pager.start();

	var Auth = require('./components/auth.js');
	var Header = require('./components/header.js');
	var Periodic = require('./components/periodic.js');
	var Tooltip = require('./components/tooltip.js');
	var Details = require('./components/details.js');

	self.modules.auth = new Auth();
	self.modules.header = new Header();
	self.modules.periodic = new Periodic();
	self.modules.tooltip = new Tooltip();
	self.modules.details = new Details();

	return self;
}

module.exports = App;
