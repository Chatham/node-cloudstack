var client = require('../lib/client');

var args = (process.env.LIVE)
	? require('./live/clientargs.json')
	: require('./nonlive/clientargs.json');

if (!process.env.LIVE) {
	var mocks = require('./nonlive/mocks');
	(new mocks()).engage();
}

exports['listVirtualMachines'] = function(test) {
	new client(args).listVirtualMachines(function(res) {	
		test.equal(res.status, 'ok');
		test.deepEqual(res.data, {});
		test.done();
	});
};