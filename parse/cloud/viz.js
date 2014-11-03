var validation = require('cloud/global/validation.js');
var logging = require('cloud/global/logging.js');

// gets the visualization types
Parse.Cloud.define('getVizTypes', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('getVizTypes', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);

	if (timestampValid.value) {

		var query = new Parse.Query('VizType');
		query.ascending('name');
		query.find({
			success: function(vizTypes) {
				response.success(vizTypes);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});

// gets the visualization type links
Parse.Cloud.define('getVizLinks', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('getVizLinks', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);

	if (timestampValid.value) {

		var query = new Parse.Query('Link');
		query.equalTo('vizType', {
			__type: 'Pointer',
			className: 'VizType',
			objectId: request.params.vizId
		});
		query.find({
			success: function(links) {
				response.success(links);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});

// gets the visualization type dos and dont's
Parse.Cloud.define('getVizDosDonts', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('getVizDosDonts', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);

	if (timestampValid.value) {

		var query = new Parse.Query('DoDont');
		query.equalTo('vizType', {
			__type: 'Pointer',
			className: 'VizType',
			objectId: request.params.vizId
		});
		query.ascending('do');
		query.find({
			success: function(dos) {
				response.success(dos);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});


// saves/updates a do or don't
Parse.Cloud.define('saveDoDont', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('saveDoDont', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);
	userValid = validation.checkUserLoggedIn();

	if (timestampValid.value && userValid) {

		var DoDont = Parse.Object.extend('DoDont');
		var doDont = new DoDont();

		if (request.params.id) {
			doDont.id = request.params.id;
		} else if (request.params.vizId) {
			doDont.set('do', request.params.listType);
			doDont.set('vizType', {
				__type: 'Pointer',
				className: 'VizType',
				objectId: request.params.vizId
			});
		} else {
			response.error('Invalid params');
		}

		doDont.set('description', request.params.description);

		doDont.save(null, {
			success: function(result) {
				response.success(result);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});

// saves/updates a link
Parse.Cloud.define('saveLink', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('saveLink', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);
	userValid = validation.checkUserLoggedIn();

	if (timestampValid.value && userValid) {

		var Link = Parse.Object.extend('Link');
		var link = new Link();

		link.set('title', request.params.title);
		link.set('url', request.params.url);

		if (request.params.id) {
			link.id = request.params.id;
		} else if (request.params.vizId) {
			link.set('vizType', {
				__type: 'Pointer',
				className: 'VizType',
				objectId: request.params.vizId
			});
		} else {
			response.error('Invalid params');
		}

		link.set('description', request.params.description);
		link.save(null, {
			success: function(result) {
				response.success(result);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});

// saves/updates a chart
Parse.Cloud.define('saveViz', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('saveViz', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);
	userValid = validation.checkUserLoggedIn();

	if (timestampValid.value && userValid) {

		var VizType = Parse.Object.extend('VizType');
		var viz = new VizType();

		if (request.params.id) {
			viz.id = request.params.id;
			viz.set('description', request.params.description);
		} else if (request.params.name) {
			viz.set('name', request.params.name);
		} else {
			response.error('Invalid params');
		}

		viz.save(null, {
			success: function(result) {
				response.success(result);
			},
			error: function(error) {
				response.error(error);
			}
		});

	} else {
		response.error('Validation failure.');
	}

});

// removes a link from the database
Parse.Cloud.define('deleteLink', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('deleteLink', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);
	userValid = validation.checkUserLoggedIn();

	if (timestampValid.value && userValid) {

		var Link = Parse.Object.extend('Link');
		var link = new Link();

		if (request.params.id) {
			link.id = request.params.id;
			link.destroy({
				success: function() {
					response.success();
				},
				error: function(error) {
					response.error(error);
				}
			});
		} else {
			response.error('Invalid params');
		}

	} else {
		response.error('Validation failure.');
	}

});

// removes a do/dont from the database
Parse.Cloud.define('deleteDoDont', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('deleteDoDont', request.params);
	timestampValid = validation.checkTimestamp(request.params.timestamp);
	userValid = validation.checkUserLoggedIn();

	if (timestampValid.value && userValid) {

		var DoDont = Parse.Object.extend('DoDont');
		var doDont = new DoDont();

		if (request.params.id) {
			doDont.id = request.params.id;
			doDont.destroy({
				success: function() {
					response.success();
				},
				error: function(error) {
					response.error(error);
				}
			});
		} else {
			response.error('Invalid params');
		}

	} else {
		response.error('Validation failure.');
	}

});
