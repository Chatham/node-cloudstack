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
	client.deployVirtualMachine(211, 1, 1, function(result) {
		result.emitter.on('success', function() {
			test.done();
		});

		result.emitter.on('fail', function() {
			test.fail();
			test.done();
		});
	});	
};