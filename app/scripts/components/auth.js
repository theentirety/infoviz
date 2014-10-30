/**
 * scripts/auth.js
 */

'use strict';

function Auth() {
	var self = this;

	self.currentUser = ko.observable(false);
	self.editMode = ko.observable(true);

	// auth.signUpMode = ko.observable(false);
	// auth.verifyMode = ko.observable(false);
	// auth.forgotMode = ko.observable(false);
	// auth.signInMode = ko.observable(false);
	// auth.signUpPhoneMode = ko.observable(false);
	// auth.verifyCode = ko.observable();
	// auth.phoneNumber = ko.observable();
	// auth.signInPhoneNumber = ko.observable();

	// auth.countryCodes = ko.observableArray([
	// 	{ code: 93, country: 'Afghanistan' },
	// 	{ code: 355, country: 'Albania' },
	// 	{ code: 213, country: 'Algeria' },
	// 	{ code: 376, country: 'Andorra' },
	// 	{ code: 244, country: 'Angola' },
	// 	{ code: 672, country: 'Antarctica' },
	// 	{ code: 54, country: 'Argentina' },
	// 	{ code: 374, country: 'Armenia' },
	// 	{ code: 297, country: 'Aruba' },
	// 	{ code: 61, country: 'Australia' },
	// 	{ code: 43, country: 'Austria' },
	// 	{ code: 994, country: 'Azerbaijan' },
	// 	{ code: 973, country: 'Bahrain' },
	// 	{ code: 880, country: 'Bangladesh' },
	// 	{ code: 375, country: 'Belarus' },
	// 	{ code: 32, country: 'Belgium' },
	// 	{ code: 501, country: 'Belize' },
	// 	{ code: 229, country: 'Benin' },
	// 	{ code: 975, country: 'Bhutan' },
	// 	{ code: 591, country: 'Bolivia, Plurinational State Of' },
	// 	{ code: 387, country: 'Bosnia And Herzegovina' },
	// 	{ code: 267, country: 'Botswana' },
	// 	{ code: 55, country: 'Brazil' },
	// 	{ code: 673, country: 'Brunei Darussalam' },
	// 	{ code: 359, country: 'Bulgaria' },
	// 	{ code: 226, country: 'Burkina Faso' },
	// 	{ code: 95, country: 'Myanmar' },
	// 	{ code: 257, country: 'Burundi' },
	// 	{ code: 855, country: 'Cambodia' },
	// 	{ code: 237, country: 'Cameroon' },
	// 	{ code: 1, country: 'Canada' },
	// 	{ code: 238, country: 'Cape Verde' },
	// 	{ code: 236, country: 'Central African Republic' },
	// 	{ code: 235, country: 'Chad' },
	// 	{ code: 56, country: 'Chile' },
	// 	{ code: 86, country: 'China' },
	// 	{ code: 61, country: 'Christmas Island' },
	// 	{ code: 61, country: 'Cocos (keeling) Islands' },
	// 	{ code: 57, country: 'Colombia' },
	// 	{ code: 269, country: 'Comoros' },
	// 	{ code: 242, country: 'Congo' },
	// 	{ code: 243, country: 'Congo, The Democratic Republic Of The' },
	// 	{ code: 682, country: 'Cook Islands' },
	// 	{ code: 506, country: 'Costa Rica' },
	// 	{ code: 385, country: 'Croatia' },
	// 	{ code: 53, country: 'Cuba' },
	// 	{ code: 357, country: 'Cyprus' },
	// 	{ code: 420, country: 'Czech Republic' },
	// 	{ code: 45, country: 'Denmark' },
	// 	{ code: 253, country: 'Djibouti' },
	// 	{ code: 670, country: 'Timor-leste' },
	// 	{ code: 593, country: 'Ecuador' },
	// 	{ code: 20, country: 'Egypt' },
	// 	{ code: 503, country: 'El Salvador' },
	// 	{ code: 240, country: 'Equatorial Guinea' },
	// 	{ code: 291, country: 'Eritrea' },
	// 	{ code: 372, country: 'Estonia' },
	// 	{ code: 251, country: 'Ethiopia' },
	// 	{ code: 500, country: 'Falkland Islands (malvinas)' },
	// 	{ code: 298, country: 'Faroe Islands' },
	// 	{ code: 679, country: 'Fiji' },
	// 	{ code: 358, country: 'Finland' },
	// 	{ code: 33, country: 'France' },
	// 	{ code: 689, country: 'French Polynesia' },
	// 	{ code: 241, country: 'Gabon' },
	// 	{ code: 220, country: 'Gambia' },
	// 	{ code: 995, country: 'Georgia' },
	// 	{ code: 49, country: 'Germany' },
	// 	{ code: 233, country: 'Ghana' },
	// 	{ code: 350, country: 'Gibraltar' },
	// 	{ code: 30, country: 'Greece' },
	// 	{ code: 299, country: 'Greenland' },
	// 	{ code: 502, country: 'Guatemala' },
	// 	{ code: 224, country: 'Guinea' },
	// 	{ code: 245, country: 'Guinea-bissau' },
	// 	{ code: 592, country: 'Guyana' },
	// 	{ code: 509, country: 'Haiti' },
	// 	{ code: 504, country: 'Honduras' },
	// 	{ code: 852, country: 'Hong Kong' },
	// 	{ code: 36, country: 'Hungary' },
	// 	{ code: 91, country: 'India' },
	// 	{ code: 62, country: 'Indonesia' },
	// 	{ code: 98, country: 'Iran, Islamic Republic Of' },
	// 	{ code: 964, country: 'Iraq' },
	// 	{ code: 353, country: 'Ireland' },
	// 	{ code: 44, country: 'Isle Of Man' },
	// 	{ code: 972, country: 'Israel' },
	// 	{ code: 39, country: 'Italy' },
	// 	{ code: 225, country: 'Côte D&apos;ivoire' },
	// 	{ code: 81, country: 'Japan' },
	// 	{ code: 962, country: 'Jordan' },
	// 	{ code: 7, country: 'Kazakhstan' },
	// 	{ code: 254, country: 'Kenya' },
	// 	{ code: 686, country: 'Kiribati' },
	// 	{ code: 965, country: 'Kuwait' },
	// 	{ code: 996, country: 'Kyrgyzstan' },
	// 	{ code: 856, country: 'Lao People&apos;s Democratic Republic' },
	// 	{ code: 371, country: 'Latvia' },
	// 	{ code: 961, country: 'Lebanon' },
	// 	{ code: 266, country: 'Lesotho' },
	// 	{ code: 231, country: 'Liberia' },
	// 	{ code: 218, country: 'Libya' },
	// 	{ code: 423, country: 'Liechtenstein' },
	// 	{ code: 370, country: 'Lithuania' },
	// 	{ code: 352, country: 'Luxembourg' },
	// 	{ code: 853, country: 'Macao' },
	// 	{ code: 389, country: 'Macedonia, The Former Yugoslav Republic Of' },
	// 	{ code: 261, country: 'Madagascar' },
	// 	{ code: 265, country: 'Malawi' },
	// 	{ code: 60, country: 'Malaysia' },
	// 	{ code: 960, country: 'Maldives' },
	// 	{ code: 223, country: 'Mali' },
	// 	{ code: 356, country: 'Malta' },
	// 	{ code: 692, country: 'Marshall Islands' },
	// 	{ code: 222, country: 'Mauritania' },
	// 	{ code: 230, country: 'Mauritius' },
	// 	{ code: 262, country: 'Mayotte' },
	// 	{ code: 52, country: 'Mexico' },
	// 	{ code: 691, country: 'Micronesia, Federated States Of' },
	// 	{ code: 373, country: 'Moldova, Republic Of' },
	// 	{ code: 377, country: 'Monaco' },
	// 	{ code: 976, country: 'Mongolia' },
	// 	{ code: 382, country: 'Montenegro' },
	// 	{ code: 212, country: 'Morocco' },
	// 	{ code: 258, country: 'Mozambique' },
	// 	{ code: 264, country: 'Namibia' },
	// 	{ code: 674, country: 'Nauru' },
	// 	{ code: 977, country: 'Nepal' },
	// 	{ code: 31, country: 'Netherlands' },
	// 	{ code: 687, country: 'New Caledonia' },
	// 	{ code: 64, country: 'New Zealand' },
	// 	{ code: 505, country: 'Nicaragua' },
	// 	{ code: 227, country: 'Niger' },
	// 	{ code: 234, country: 'Nigeria' },
	// 	{ code: 683, country: 'Niue' },
	// 	{ code: 850, country: 'Korea, Democratic People&apos;s Republic Of' },
	// 	{ code: 47, country: 'Norway' },
	// 	{ code: 968, country: 'Oman' },
	// 	{ code: 92, country: 'Pakistan' },
	// 	{ code: 680, country: 'Palau' },
	// 	{ code: 507, country: 'Panama' },
	// 	{ code: 675, country: 'Papua New Guinea' },
	// 	{ code: 595, country: 'Paraguay' },
	// 	{ code: 51, country: 'Peru' },
	// 	{ code: 63, country: 'Philippines' },
	// 	{ code: 870, country: 'Pitcairn' },
	// 	{ code: 48, country: 'Poland' },
	// 	{ code: 351, country: 'Portugal' },
	// 	{ code: 1, country: 'Puerto Rico' },
	// 	{ code: 974, country: 'Qatar' },
	// 	{ code: 40, country: 'Romania' },
	// 	{ code: 7, country: 'Russian Federation' },
	// 	{ code: 250, country: 'Rwanda' },
	// 	{ code: 590, country: 'Saint Barthélemy' },
	// 	{ code: 685, country: 'Samoa' },
	// 	{ code: 378, country: 'San Marino' },
	// 	{ code: 239, country: 'Sao Tome And Principe' },
	// 	{ code: 966, country: 'Saudi Arabia' },
	// 	{ code: 221, country: 'Senegal' },
	// 	{ code: 381, country: 'Serbia' },
	// 	{ code: 248, country: 'Seychelles' },
	// 	{ code: 232, country: 'Sierra Leone' },
	// 	{ code: 65, country: 'Singapore' },
	// 	{ code: 421, country: 'Slovakia' },
	// 	{ code: 386, country: 'Slovenia' },
	// 	{ code: 677, country: 'Solomon Islands' },
	// 	{ code: 252, country: 'Somalia' },
	// 	{ code: 27, country: 'South Africa' },
	// 	{ code: 82, country: 'Korea, Republic Of' },
	// 	{ code: 34, country: 'Spain' },
	// 	{ code: 94, country: 'Sri Lanka' },
	// 	{ code: 290, country: 'Saint Helena, Ascension And Tristan Da Cunha' },
	// 	{ code: 508, country: 'Saint Pierre And Miquelon' },
	// 	{ code: 249, country: 'Sudan' },
	// 	{ code: 597, country: 'Suriname' },
	// 	{ code: 268, country: 'Swaziland' },
	// 	{ code: 46, country: 'Sweden' },
	// 	{ code: 41, country: 'Switzerland' },
	// 	{ code: 963, country: 'Syrian Arab Republic' },
	// 	{ code: 886, country: 'Taiwan, Province Of China' },
	// 	{ code: 992, country: 'Tajikistan' },
	// 	{ code: 255, country: 'Tanzania, United Republic Of' },
	// 	{ code: 66, country: 'Thailand' },
	// 	{ code: 228, country: 'Togo' },
	// 	{ code: 690, country: 'Tokelau' },
	// 	{ code: 676, country: 'Tonga' },
	// 	{ code: 216, country: 'Tunisia' },
	// 	{ code: 90, country: 'Turkey' },
	// 	{ code: 993, country: 'Turkmenistan' },
	// 	{ code: 688, country: 'Tuvalu' },
	// 	{ code: 971, country: 'United Arab Emirates' },
	// 	{ code: 256, country: 'Uganda' },
	// 	{ code: 44, country: 'United Kingdom' },
	// 	{ code: 380, country: 'Ukraine' },
	// 	{ code: 598, country: 'Uruguay' },
	// 	{ code: 1, country: 'United States' },
	// 	{ code: 998, country: 'Uzbekistan' },
	// 	{ code: 678, country: 'Vanuatu' },
	// 	{ code: 39, country: 'Holy See (vatican City State)' },
	// 	{ code: 58, country: 'Venezuela, Bolivarian Republic Of' },
	// 	{ code: 84, country: 'Viet Nam' },
	// 	{ code: 681, country: 'Wallis And Futuna' },
	// 	{ code: 967, country: 'Yemen' },
	// 	{ code: 260, country: 'Zambia' },
	// 	{ code: 263, country: 'Zimbabwe' }
	// ]);

	// var selectedOption = _.find(auth.countryCodes(), function(option) {
	// 	return option.country === 'United States';
	// });

	// auth.selectedCountry = ko.observable(selectedOption);

	// auth.signInUp = function(formElement) {
	// 	$('.auth_field').blur();

	// 	var password = $(formElement).find('input[name=auth_password]').val();

	// 	if (auth.signUpMode()) {
	// 		var email = $(formElement).find('input[name=auth_email]').val();
	// 		var displayName = $(formElement).find('input[name=auth_displayName]').val();
	// 		var passwordConfirm = $(formElement).find('input[name=auth_confirmPassword]').val();

	// 		if (email.length < 1) {

	// 			app.myViewModel.errors.showBasic('Please enter your email address.');
	// 			return false;
	// 		}

	// 		if (displayName.length < 1) {

	// 			app.myViewModel.errors.showBasic('Please enter your first and last name.');
	// 			return false;
	// 		}

	// 		if (password.length < 1 || passwordConfirm < 1 || password !== passwordConfirm) {

	// 			app.myViewModel.errors.showBasic('Please enter and confirm a password.');
	// 			return false;
	// 		}

	// 		app.myViewModel.loading.start();

	// 		var user = new Parse.User();

	// 		user.set('username', auth.phoneNumber());
	// 		user.set('password', password);
	// 		user.set('email', email);
	// 		user.set('displayName', displayName);

	// 		user.signUp(null, {
	// 			success: function(user) {
	// 				auth.currentUser(user);
	// 				app.myViewModel.push.init();
	// 				auth.goToHome();
	// 			},
	// 			error: function(user, error) {
	// 				app.myViewModel.errors.showBasic(auth.sanitizeErrors(error));
	// 			}
	// 		});

	// 	} else if (auth.signInMode()) {

	// 		var username = $(formElement).find('input[name=auth_username]').val();

	// 		// validation
	// 		if (username.length < 1) {

	// 			app.myViewModel.errors.showBasic('Please enter your phone number.');
	// 			return false;
	// 		}

	// 		if (password.length < 1) {

	// 			app.myViewModel.errors.showBasic('Please enter your password.');
	// 			return false;
	// 		}

	// 		app.myViewModel.loading.start();

	// 		var scrubbedUsername = username.replace(/[^0-9.]/g, ''); // remove anything except numbers
	// 		scrubbedUsername = formatE164("US", '+' + auth.selectedCountry().code + scrubbedUsername);

	// 		Parse.Cloud.run('checkIfUserSuspended', {
	// 			username: scrubbedUsername,
	// 			timestamp: moment.utc().valueOf()
	// 		}).then(function(suspended) {
	// 			if (suspended) {
	// 				app.myViewModel.errors.showBasic('Your account has been suspended. Please email info@ioapp.co to re-activate your account.');
	// 				return false;
	// 			} else {
	// 				return Parse.User.logIn(scrubbedUsername, password);
	// 			}
	// 		}).then(function(user) {
	// 			if (user) {

	// 				auth.signUpMode(false);
	// 				auth.verifyMode(false);
	// 				auth.forgotMode(false);
	// 				auth.signInMode(false);
	// 				auth.signUpPhoneMode(false);

	// 				auth.currentUser(user);
	// 				app.myViewModel.push.init();
	// 				auth.goToHome();
	// 				app.myViewModel.contacts.getContacts();
	// 			}
	// 		}, function(error) {
	// 			app.myViewModel.errors.showBasic(auth.sanitizeErrors(error));
	// 		});
	// 	}
	// };

	// auth.signUpPhone = function(formElement) {
	// 	$('.auth_field').blur();

	// 	var phoneNumber = $(formElement).find('input[name=auth_phonenumber]').val();

	// 	var scrubbedPhoneNumber = phoneNumber.replace(/[^0-9.]/g, ''); // remove anything except numbers

	// 	auth.signInPhoneNumber(scrubbedPhoneNumber);
	// 	auth.phoneNumber(formatE164("US", '+' + auth.selectedCountry().code + scrubbedPhoneNumber));

	// 	if (!isValidNumber(auth.phoneNumber())) {

	// 		app.myViewModel.errors.showBasic('Please check your phone number. It doesn\'t look right to us.');
	// 		return false;
	// 	}

	// 	app.myViewModel.loading.start();

	// 	Parse.Cloud.run('checkPhoneNumber', {
	// 		phoneNumber: auth.phoneNumber(),
	// 		timestamp: moment.utc().valueOf()
	// 	}, {
	// 		success: function(responseCode) {
	// 			if (responseCode == 'blacklisted') {
	// 				app.myViewModel.errors.showBasic('This phone number is suspended. Please email info@ioapp.co to re-activate the phone number.');
	// 			} else if (responseCode == 'error') {
	// 				auth.signUpPhoneMode(false);
	// 				auth.signInMode(true);
	// 				app.myViewModel.loading.cancel();
	// 			} else {
	// 				auth.verifyMode(true);
	// 				auth.sendVerifyCode();
	// 			}
	// 		},
	// 		error: function(error) {
	// 			app.myViewModel.errors.showBasic(auth.sanitizeErrors(error));
	// 		}
	// 	});
	// };

	// auth.sendVerifyCode = function() {
	// 	$('.auth_field').blur();
	// 	$('.signupphone input, .signupphone select').attr('disabled', 'disabled');
	// 	app.myViewModel.loading.start();
	// 	Parse.Cloud.run('sendVerifyCode', {
	// 		phoneNumber: auth.phoneNumber(),
	// 		timestamp: moment.utc().valueOf()
	// 	}, {
	// 		success: function(code) {
	// 			app.myViewModel.loading.cancel();
	// 			auth.verifyCode(code);
	// 		},
	// 		error: function(error) {
	// 			$('input[name=auth_verifycode]').val('');
	// 			app.myViewModel.errors.showBasic('We ran into a problem sending the code. Please try again.');
	// 		}
	// 	});
	// };

	// auth.verifyPhoneNumber = function() {
	// 	$('.auth_field').blur();

	// 	var code = $('input[name=auth_verifycode]').val();
	// 	$('input[name=auth_verifycode]').val('');

	// 	if (code.length < 1) {
	// 		app.myViewModel.errors.showBasic('Please enter the validation code.');
	// 		return false;
	// 	}

	// 	if (djb2Code(code) == auth.verifyCode()) {
	// 		$('.verify input, .verify select').attr('disabled', 'disabled');
	// 		auth.signUpMode(true);
	// 	} else {
	// 		app.myViewModel.errors.showBasic('Incorrect verification code. Please try again or send a new code.');
	// 	}
	// };

	// auth.goToHome = function() {
	// 	app.myViewModel.invites.reloadInvites();
	// 	app.myViewModel.loading.start();
	// };

	// auth.goBackToStepOne = function() {
	// 	$('.signupphone input, .signupphone select').removeAttr('disabled');
	// 	auth.verifyMode(false);
	// };

	// auth.resetPassword = function() {
	// 	var email = $('input[name=auth_forgotemail]').val();

	// 	if (email.length < 1) {
	// 		app.myViewModel.errors.showBasic('Please enter your email address.');
	// 		return false;
	// 	}

	// 	app.myViewModel.loading.start();

	// 	Parse.User.requestPasswordReset(email, {
	// 		success:function() {
	// 			$('.auth_field').blur();
	// 			$('form[name=auth_forgot] input').val('');
	// 			auth.forgotMode(false);
	// 			app.myViewModel.errors.showBasic('Please check your email.');

	// 		},
	// 		error:function(error) {
	// 			app.myViewModel.errors.showBasic(auth.sanitizeErrors(error));
	// 		}
	// 	});
	// };

	// auth.goNew = function(item) {
	// 	$('input').blur();
	// 	auth.resetJoin();
	// 	auth.signUpPhoneMode(true);
	// };

	// auth.goForgot = function(item) {
	// 	$('input').blur();
	// 	auth.signInMode(false);
	// 	$('.signupphone input, .signupphone select').attr('disabled', 'disabled');
	// 	auth.forgotMode(true);
	// };

	// auth.resetJoin = function() {
	// 	$('form[name=auth_signup] input').val('');
	// };

	// auth.logout = function(item) {
	// 	app.myViewModel.invites.list([]);
	// 	app.myViewModel.profile.show(false);
	// 	app.myViewModel.newInvite.blankInvite();
	// 	app.myViewModel.contacts.blank();
	// 	app.myViewModel.what.blank();
	// 	app.myViewModel.where.blank();
	// 	Parse.User.logOut();
	// 	auth.currentUser(null);
	// 	auth.signUpMode(false);
	// 	auth.signUpPhoneMode(false);
	// 	auth.signInMode(false);
	// 	auth.forgotMode(false);
	// 	auth.verifyMode(false);
	// };

	// auth.close = function() {
	// 	$('#auth input, #auth select').removeAttr('disabled');
	// 	$('.auth_field').blur();
	// 	auth.signUpMode(false);
	// 	auth.signUpPhoneMode(false);
	// 	auth.forgotMode(false);
	// 	auth.signInMode(false);
	// };

	// auth.openLink = function(link) {
	// 	var ref = window.open('http://inorout.parseapp.com/' + link + '.html', '_blank', 'location=no');
	// };

	// auth.sanitizeErrors = function(error) {
	// 	switch(error.code)
	// 	{
	// 		case 101:
	// 			return 'Please enter a valid phone number and password.';
	// 		case 202:
	// 			return 'That phone number is already registered to an account.';
	// 		case 124:
	// 			return 'Oops! We messed up. Please try again.';
	// 		case 141:
	// 			return 'Please enter a valid phone number and password.';
	// 		default:
	// 			return error.message.charAt(0).toUpperCase() + error.message.slice(1) + '.';
	// 	}
	// };

	// auth.init = function() {
	// 	currentUser = Parse.User.current();
	// 	if (currentUser) {
	// 		auth.currentUser(currentUser);
	// 		if (app.myViewModel.contacts) {
	// 			app.myViewModel.contacts.getContacts();
	// 		}
	// 	}
	// };

	// auth.init();

	return self;
}

module.exports = Auth;
