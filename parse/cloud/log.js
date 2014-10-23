// APICallLog records when a user makes an API call
Parse.Cloud.define('logAPICall', function(request, response) {

	Parse.Cloud.useMasterKey();
	
	var LogAPI = Parse.Object.extend('LogAPICall');
	var logAPI = new LogAPI();

	logAPI.set('api', request.params.api);

	if (request.params.userId) {
		logAPI.set('user', {
			__type: 'Pointer',
			className: '_User',
			objectId: request.params.userId
		});
	}
	logAPI.set('payload', JSON.stringify(request.params.payload));

	logAPI.save(null, {
		success: function(result) {
			response.success('API logged successfully.');
		},
		error: function(error) {
			response.error(error);
		}
	});

});