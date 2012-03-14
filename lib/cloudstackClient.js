var request = require('./request')
  , AsyncJobPoller = require('./asyncJobPoller')
  , EventEmitter = require('events').EventEmitter;

function CloudStackClient(options) {
	this._options = {
		host: options.host || 'localhost',
		port: options.port || 8080,
		account: options.account || '',
		apiKey: options.apiKey || '',
		apiSecret: options.apiSecret || ''
	};
};

CloudStackClient.prototype.buildRequestArgs = function(command, params) {
	var args = {
		host: this._options.host,
		port: this._options.port,
		account: this._options.account,
		apiKey: this._options.apiKey,
		apiSecret: this._options.apiSecret
	};
	
	args.command = command;
	
	if (params) {
		args.params = params;
	}	

	return(args);
};

CloudStackClient.prototype.listVirtualMachines = function(callback) {
	var args = this.buildRequestArgs('listVirtualMachines');

	new request(args).exec(callback);
};

CloudStackClient.prototype.listVirtualMachine = function(id, callback) {
	var args = this.buildRequestArgs('listVirtualMachines', {
		id: id
	});

	new request(args).exec(callback);
}

CloudStackClient.prototype.deployVirtualMachine = function(templateId, serviceOfferingId, zoneId, callback) {
	var self = this;

	var args = this.buildRequestArgs('deployVirtualMachine', {
		templateId: templateId,
		serviceOfferingId: serviceOfferingId,
		zoneId: zoneId
	});

	var vmid = 0;
	var emitter = new EventEmitter();

	new request(args).exec(function(res) {
		vmid = res.data.id;

		new AsyncJobPoller(self, emitter, res.data.jobid).start();

		callback({
			vmid: vmid,
			emitter: emitter
		});
	});	
};

CloudStackClient.prototype.destroyVirtualMachine = function(id, callback) {
	var args = this.buildRequestArgs('destroyVirtualMachine', {
		id: id
	});

	new request(args).exec(callback);
};

CloudStackClient.prototype.stopVirtualMachine = function(id, callback) {
	var args = this.buildRequestArgs('stopVirtualMachine', {
		id: id
	});

	new request(args).exec(callback);
};

CloudStackClient.prototype.startVirtualMachine = function(id, callback) {
	var args = this.buildRequestArgs('startVirtualMachine', {
		id: id
	});

	new request(args).exec(callback);
};

CloudStackClient.prototype.queryAsyncJobResult = function(jobid, callback) {
	var args = this.buildRequestArgs('queryAsyncJobResult', {
		jobid: jobid
	});

	new request(args).exec(callback);
};

module.exports = CloudStackClient;