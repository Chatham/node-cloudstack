var querystring = require('../lib/querystring');

exports['when constructed with an "apiKey" value in the options'] = function(test) {
	var qs = new querystring({
		apiKey: 'TestApiKey'
	});

	test.equal(qs.params.apiKey, 'TestApiKey');

	test.done();
};

exports['when a parameter is added'] = function(test) {
	var qs = new querystring();
	qs.addParam('Property', 'Property Value');

	test.equal(qs.params.Property, 'Property%20Value');

	test.done();
};

exports['when converted to a string'] = function(test) {
	var qs = new querystring({
		apiKey: 'ApiKeyString',
		apiSecret: 'ApiSecretString'
	}).toString();

	test.ok(qs.match(/apiKey=ApiKeyString/));
	test.ok(qs.match(/signature=9MQbwfKzCXVlfuNV80wmrXnzL%2B4%3D/));

	test.done();
};