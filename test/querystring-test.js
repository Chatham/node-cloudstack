var vows = require('vows')
  , assert = require('assert')
  , QueryString = require('../lib/querystring');
  
vows.describe('QueryString Tests').addBatch({
	'when constructed with an "apiKey" value in the options': {
		topic: function() {
			return new QueryString({
				apiKey: 'ApiKeyString'
			});
		},
		'the params object has a property called "apiKey"': function(topic) {
			assert.isDefined(topic.params['apiKey']);
		},
		'the "apiKey" property has the correct value': function(topic) {
			assert.equal(topic.params['apiKey'], 'ApiKeyString');
		}
	},
	'when a parameter is added': {
		topic: function() {
			var qs = new QueryString();
			qs.addParam('Property', 'Property Value');
			
			return qs;
		},
		'the property now exists in the .params collection': function(topic) {
			assert.isDefined(topic.params['Property']);
		},
		'the property value has been set and uri encoded': function(topic) {
			assert.equal(topic.params['Property'], 'Property%20Value');
		}
	},
	'when converted to a string': {
		topic: function() {
			return new QueryString({
				apiKey: 'ApiKeyString',
				apiSecret: 'ApiSecretString'
			}).toString();
		},
		'the apiKey is included as a parameter': function(topic) {
			assert.include(topic, 'apiKey=ApiKeyString');
		},
		'the signature is included as a parameter': function(topic) {
			assert.include(topic, 'signature=');
		},
		'the signature is generated properly': function(topic) {
			assert.include(topic, 'signature=9MQbwfKzCXVlfuNV80wmrXnzL%2B4%3D');
		}
	}
}).export(module);
