/**
* scripts/main.js
*/

'use strict';

var App = require('./app.js');
var app;

Parse.initialize('IDxJt4GrbIN8aC5C2HewP4WiC2CKUnetfvQGTKWE', 'y1nY9GQgkjF9cCqSFmOyG4kkh4XJ2VEDBtnmAT0H');

$(document).on('ready', function() {
	app = new App();
});

/**
* This binding handler will load into a container external templates.  Once the templates have been added to the dom and bound, the element will fade in.
*/
ko.bindingHandlers.externalTemplates = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

		var url = ko.unwrap(valueAccessor());

		$(element).hide();

		$.ajax(url, {
			success: function(data) {
				$(element).prepend(data);
				ko.applyBindingsToDescendants(bindingContext, element);
				$(element).fadeIn('fast');
			}
		});

		// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
		return { controlsDescendantBindings: true };
	}
};
