var vows = require('vows')
  , assert = require('assert')  
  , Client = require('../lib/client')
  , CloudStack = require('../lib/cloudstack');

vows.describe('CloudStack Object Tests').addBatch({
	'When you call .createClient': {
		topic: function() {
			return CloudStack.createClient({
				host: 'cloudhost'
			});
		},
		'an object of type Client is returned': function(topic) {
			assert.instanceOf(topic, Client);
		},
		'the options are passed to the constructor': function(topic) {
			assert.equal(topic.host, 'cloudhost');
		}
	}
}).export(module);
