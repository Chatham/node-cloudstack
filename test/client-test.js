var client = require('../lib/client')
  , nock   = require('nock');

var args = {
	host: 'controller',						
	account: 'TestUser',
	apiKey: 'TestUserApiKey',
	apiSecret: 'TestUserApiSecret'
};

exports['listVirtualMachines'] = function(test) {
	if(process.env.NOCK) {
		nock("http://controller:8080")   
	  		.get("/client/api?account=TestUser&apiKey=TestUserApiKey&command=listVirtualMachines&domainId=1&response=json&signature=acSwdq7p634LFmIvR3em%2FZzlKEE%3D")
	   		.reply(200, {
	   			listvirtualmachinesresponse: {}
	   		});
	}

	new client(args).listVirtualMachines(function(res) {	
		test.equal(res.status, 'ok');
		test.deepEqual(res.data, {});
		test.done();
	});
};