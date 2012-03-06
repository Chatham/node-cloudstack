var vows = require('vows')
  , assert = require('assert')
  , client = require('../lib/client');
  
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
					port: 8081,
					account: 'cloud_account',
					apiKey: 'api_key',
					apiSecret: 'api_secret'
				});
			},
			'the host property is equal to the specified value': function(topic) {
				assert.equal(topic.host, 'cloudhost');
			},
			'the port property is equal to the specified value': function(topic) {
				assert.equal(topic.port, 8081);
			},
			'the account property is equal to the specified value': function(topic) {
				assert.equal(topic.account, 'cloud_account');
			},
			'the apiKey property is equal to the specified value': function(topic) {
				assert.equal(topic.apiKey, 'api_key');
			},
			'the apiSecret property is equal to the specified value': function(topic) {
				assert.equal(topic.apiSecret, 'api_secret');
			}
		}
	},
	
	'when listVirtualMachines is called': {
		'and no machines are running': {
			'the result': {
				topic: function() {
					new client({
						host: '127.0.0.1',
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
}).export(module);
