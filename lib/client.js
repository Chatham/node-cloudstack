var Request = require('./request');

module.exports = function Client(options) {
	this.host = options.host || '127.0.0.1';
	this.port = options.port || 8080;
	this.account = options.account || '';
	this.apiKey = options.apiKey || '';
	this.apiSecret = options.apiSecret || '';

	this.listVirtualMachines = function(callback) {
		new Request({
			host: this.host,
			port: this.port,
			account: this.account,
			apiKey: this.apiKey,
			apiSecret: this.apiSecret,
			command: 'listVirtualMachines'
		}).exec(callback);
	};
};
