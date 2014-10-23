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
