var validation = require('cloud/global/validation.js');
var logging = require('cloud/global/logging.js');

// gets the visualization types
Parse.Cloud.define('getVizTypes', function(request, response) {

	Parse.Cloud.useMasterKey();
	logging.logAPICall('getVizTypes', request.params);
	// timestampValid = validation.checkTimestamp(request.params.timestamp);

	// if (timestampValid.value) {

	// 	var min = 10000;
	// 	var max = 99999;
	// 	var num = Math.floor(Math.random() * (max - min + 1)) + min;

	// 	var outboundMsg = {};
	// 	outboundMsg.id = '' + encryption.djb2Code(request.params.phoneNumber + request.params.timestamp);

	// 	outboundMsg.attributes = {
	// 		phoneNumber: phoneFormat.formatE164("US", request.params.phoneNumber),
	// 		message: 'Your \'In or Out?\' verification code is ' + num,
	// 		type: 'verify'
	// 	};

	// 	var promise = Parse.Promise.as(num);
	// 	promise = promise.then(function() {
	// 		return send.sendSMS(outboundMsg);
	// 	}).then(function() {
	// 		response.success(encryption.djb2Code('' + num));
	// 	}, function(error) {
	// 		response.error(error);
	// 	});

	// } else {
	// 	response.error('Validation failure.');
	// }

});
