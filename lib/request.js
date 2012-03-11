var HttpRequest = require('request')
  , QueryString = require('./querystring');
  
module.exports = function Request(options) {
	this.options = options;
	
	// default host and port if necessary
	this.options.host = this.options.host || '127.0.0.1';
	this.options.port = this.options.port || 8080;

	// construct the query string
	this.querystring = new (QueryString)({
		apiKey: this.options.apiKey,
		apiSecret: this.options.apiSecret
	});

	this.querystring.addParam('account', this.options.account);
	this.querystring.addParam('command', this.options.command);	
	this.querystring.addParam('domainId', 1);
	this.querystring.addParam('response', 'json');
	
	// generate the uri
	this.uri = 'http://#host:#port/client/api?#querystring'
		.replace(/#host/, this.options.host)
		.replace(/#port/, this.options.port)
		.replace(/#querystring/, this.querystring.toString());		
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