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

	if (timestampValid.value) {

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
