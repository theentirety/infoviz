exports.logAPICall = function(apiName, params) {
	Parse.Cloud.run('logAPICall', {
		api: apiName,
		userId: Parse.User.current() ? Parse.User.current().id : null,
		payload: params
	});
};
