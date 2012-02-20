var vows = require('vows')
  , assert = require('assert')
  , Client = require('../lib/client')
  , nock = require('nock');
  
// mock the upcoming request
nock('192.168.22.227')
  .get('/client/api?account=self_provision&apiKey=ffMgLTrJ7DrINZvFRNSAcOrPN8hFlQ9o9_RyW-96NY1-zoY0RgcZ4Kkb5LRFdimLXcviNAsSZIIb8kZ878pMZw&command=listVirtualMachines&domainId=1&response=json&signature=4OVPoc41dm3%2BMXnMucjL9wDJszE%3D')
  .reply(200, "{ \"listvirtualmachinesresponse\" : { } }", { 
  	server: 'Apache-Coyote/1.1',
    'content-type': 'text/javascript;charset=UTF-8',
    'content-length': '39',
    date: 'Mon, 20 Feb 2012 01:12:18 GMT' 
  });
  
vows.describe('Client Tests').addBatch({
	'when client is constructed': {
		'with a null options object': {
			topic: function() {
				return new Client({});
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
				return new Client({
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
					new Client({
						host: '192.168.22.227',
						port: 8080,
						account: 'self_provision',
						apiKey: 'ffMgLTrJ7DrINZvFRNSAcOrPN8hFlQ9o9_RyW-96NY1-zoY0RgcZ4Kkb5LRFdimLXcviNAsSZIIb8kZ878pMZw',
						apiSecret: '2BKpg7t0yPJ_pB4Y08OAOIGlCpaCLYaMHSPqEBKqFZQxDUoA5ozsQKRkGaLeH0f0VOcgZEseBY6HCHP-hfbArg'
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
}).export(module, { "error": false });
