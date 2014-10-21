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
	ko.applyBindings(self.modules);

	var Auth = require('./components/auth.js');

	self.modules.auth = new Auth();

	return self;
}

module.exports = App;
