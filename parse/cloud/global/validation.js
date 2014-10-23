var moment = require('moment');

exports.checkTimestamp = function(timestamp) {
	var validity = {
		value: false,
		status: 'Internal error.'
	}

	if (!timestamp) {
		validity.status = 'Missing timestamp.';
	} else {
		var timeDiff = moment.utc().diff(moment.utc(timestamp), 'minutes');
		if (timeDiff > 5) {
			validity.status = 'Invalid request.';
		} else {
			validity.value = true;
			validity.status = 'Success.';
		}
	}

	return validity;
};

exports.checkUserLoggedIn = function() {
	var validity = {
		value: false,
		status: 'Internal error.'
	}

	if (!Parse.User.current()) {
		validity.status = 'Missing user.';
	} else {
		var loggedIn = Parse.User.current();
		if (loggedIn) {
			validity.value = true;
			validity.status = 'Success.';
		} else {
			validity.status = 'Not logged in.';
		}
	}

	return validity;
};
