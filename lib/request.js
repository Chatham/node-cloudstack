var HttpRequest = require('request')
  , QueryString = require('./querystring');
  
module.exports = function Request(options) {
	this.options = options;
	
	// default host and port if necessary
	this.options.host = this.options.host || '127.0.0.1';
	this.options.port = this.options.port || 8080;

	// construct the query string
	this.qs = new (QueryString)({
		apiKey: this.options.apiKey,
		apiSecret: this.options.apiSecret
	});

	this.qs.addParam('account', this.options.account);
	this.qs.addParam('command', this.options.command);	
	this.qs.addParam('domainId', 1);
	this.qs.addParam('response', 'json');

	// add additional parameters if specified
	if (options.params) {
		for (var key in options.params) {
			this.qs.addParam(key, options.params[key]);
		}
	}
	
	// generate the uri
	this.uri = 'http://#host:#port/client/api?#qs'
		.replace(/#host/, this.options.host)
		.replace(/#port/, this.options.port)
		.replace(/#qs/, this.qs.toString());		
};
	
module.exports.prototype.exec = function(callback) {
	var self = this;
		
	if (!callback) callback = function() {};
	
	HttpRequest(this.uri, function(err, res, body) {		
		if (err) { 
			return callback({ status: 'error', data: err });
		}

		var data = JSON.parse(body)[self.options.command.toLowerCase() + 'response'];			

		if (res.statusCode == 200) {
			callback({				
				status: 'ok',
				data: data
			});
		} else {
			callback({
				status: 'error',
				data: data
			});
		}
	});
};