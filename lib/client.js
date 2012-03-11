var request = require('./request');

module.exports = function Client(options) {
	this.host = options.host || 'localhost',
	this.port = options.port || 8080,
	this.account = options.account || '',
	this.apiKey = options.apiKey || '',
	this.apiSecret = options.apiSecret || ''
	
	this.buildArgs = function(command, params) {
		var args = {
			host: this.host,
			port: this.port,
			account: this.account,
			apiKey: this.apiKey,
			apiSecret: this.apiSecret
		};
		
		args.command = command;
		args.params = params;

		return args;
	};

	this.listVirtualMachines = function(callback) {
		var args = this.buildArgs('listVirtualMachines');

		new request(args).exec(callback);
	};

	this.deployVirtualMachine = function(templateId, serviceOfferingId, zoneId, callback) {
		var args = this.buildArgs('deployVirtualMachine', {
			templateId: templateId,
			serviceOfferingId: serviceOfferingId,
			zoneId: zoneId
		});

		new request(args).exec(callback);
	};

	this.destroyVirtualMachine = function(id, callback) {
		var args = this.buildArgs('destroyVirtualMachine', {
			id: id
		});

		request(args).exec(callback);
	};

	this.stopVirtualMachine = function(id, callback) {
		var args = this.buildArgs('stopVirtualMachine', {
			id: id
		});

		request(args).exec(callback);
	};

	this.startVirtualMachine = function(id, callback) {
		var args = this.buildArgs('startVirtualMachine', {
			id: id
		});

		request(args).exec(callback);
	};
};
