var vows = require('vows')
  , assert = require('assert')
  , client = require('../lib/client')
  , nock   = require('nock');

vows.describe('Client Tests').addBatch({
	'when client is constructed': {
		'with a null options object': {
			topic: function() {
				return new client({});
			},
			'the host property defaults to localhost': function(topic) {
				assert.equal(topic.host, '127.0.0.1');
			},
			'the port property defaults to 8080': function(topic) {
				assert.equal(topic.port, 8080);
			},
			'the account property defaults to empty string': function(topic) {
				assert.equal(topic.account, '');
			},
			'the apiKey property defaults to empty string': function(topic) {
				assert.equal(topic.apiKey, '');
			},
			'the apiSecret property defaults to empty string': function(topic) {
				assert.equal(topic.apiSecret, '');
			}
		},
		'with a complete options object': {
			topic: function() {
				return new client({
					host: 'cloudhost',
					port: 54321,
					account: 'TestUser',
					apiKey: 'TestUserApiKey',
					apiSecret: 'TestUserApiSecret'
				});
			},
			'the host property is equal to the specified value': function(topic) {
				assert.equal(topic.host, 'cloudhost');
			},
			'the port property is equal to the specified value': function(topic) {
				assert.equal(topic.port, 54321);
			},
			'the account property is equal to the specified value': function(topic) {
				assert.equal(topic.account, 'TestUser');
			},
			'the apiKey property is equal to the specified value': function(topic) {
				assert.equal(topic.apiKey, 'TestUserApiKey');
			},
			'the apiSecret property is equal to the specified value': function(topic) {
				assert.equal(topic.apiSecret, 'TestUserApiSecret');
			}
		}
	},
	
	'when listVirtualMachines is called': {
		'and no machines are running': {
			'the result': {
				topic: function() {
					if(process.env.NOCK) {
					 	nock("http://cloudhost:54321")   
					  		.get("/client/api?account=TestUser&apiKey=TestUserApiKey&command=listVirtualMachines&domainId=1&response=json&signature=acSwdq7p634LFmIvR3em%2FZzlKEE%3D")
					   		.reply(200, {
					   			listvirtualmachinesresponse: {}
					   		});
					}

					new client({
						host: 'cloudhost',
						port: 54321,
						account: 'TestUser',
						apiKey: 'TestUserApiKey',
						apiSecret: 'TestUserApiSecret'
					}).listVirtualMachines(this.callback);
				},
				'has a "status" property': function(topic) {
					assert.isDefined(topic.status);
				},
				'has a "data" property': function(topic) {
					assert.isDefined(topic.data);
				},
				'the value of the status property is "ok"': function(topic) {
					assert.equal(topic.status, "ok");
				},
				'the value of the data property is an empty object': function(topic) {
					assert.deepEqual(topic.data, {});
				}
			}
		}
	}
}).export(module, { error: false });
