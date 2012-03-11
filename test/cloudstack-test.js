var CloudstackClient = require('../lib/client');  

exports['CreateClient'] = function(test) {
	var client = (require('../lib/cloudstack')).createClient({
		host: 'cloudhost'
	});

	test.equal(client.host, 'cloudhost');
	test.equal(client.port, 8080);
	test.equal(client.apiKey, '');
	test.equal(client.apiSecret, '');
	test.equal(client.account, '');
	
	test.done();
};