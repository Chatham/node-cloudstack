var client = require('../lib/cloudstackClient');

var args = (process.env.LIVE)
	? require('./live/clientargs.json')
	: require('./nonlive/clientargs.json');

if (!process.env.LIVE) {	
	var mocks = require('./nonlive/mocks');
	(new mocks()).engage();
}

var client = new client(args);

exports['deployVirtualMachine'] = function(test) {
	var deployment = client.deployVirtualMachine(211, 1, 1);

	deployment.on('done', function(vm) {		
		test.done();
	});

	deployment.on('error', function(err) {
		test.fail('error: ' + err);
		test.done();
	});
};