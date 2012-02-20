var crypto = require('crypto')
  , qs = require('querystring');

module.exports = function QueryString(options) {
	this.params = {};
	this.options = options || {};
	
	this.params['apiKey'] = this.options.apiKey;	
	
	this.addParam = function(key, value) {
		if (!key) { throw Error('Missing parameter "key"'); }
		if (key.length == 0) { throw Error('Value for parameter "key" cannot be empty.'); }
		
		if (!value) { throw Error('Missing value for key "' + key + '"'); }
		if (value.length == 0) { throw Error('Value for key "' + key + '" cannot be empty.'); }
		
		this.params[key] = encodeURIComponent(value);
	};
	
	this.toString = function() {
		// sort keys as required by documentation to sign
		var keys = [];
		for(var key in this.params) {
			if(this.params.hasOwnProperty(key)){
				keys.push(key);
			};
		};
		keys.sort();
		
		var components = [];
		for(var i=0; i<keys.length; i++) {
			key = keys[i];
			components.push(key + '=' + this.params[key]);
		}
		var str = components.join('&');
		
		var sig = crypto.createHmac('sha1', this.options.apiSecret).update(str.toLowerCase()).digest('base64');
		str += '&signature=' + encodeURIComponent(sig);
		return str;
	};
};