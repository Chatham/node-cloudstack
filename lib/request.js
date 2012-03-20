var HttpRequest = require('request')
  , QueryString = require('./querystring');
  
function Request(options) {
	this.options = options;
	
	this.qs = new (QueryString)({
		apiKey: this.options.apiKey || '',
		apiSecret: this.options.apiSecret || ''
	});

	this.qs.addParam('account', this.options.account || '');
	this.qs.addParam('command', this.options.command || '');	
	this.qs.addParam('domainId', this.options.domainId || 1);
	this.qs.addParam('response', this.options.response || 'json');

	// add additional parameters if specified
	if (options.params) {
		for (var p in options.params) {
			this.qs.addParam(p, options.params[p]);
		}
	}
	
	// generate the uri
	this.uri = 'http://#host:#port/client/api?#qs'
		.replace(/#host/, this.options.host || 'localhost')
		.replace(/#port/, this.options.port || 8080)
		.replace(/#qs/, this.qs.toString());
};
	
Request.prototype.exec = function(callback) {
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

module.exports = Request;