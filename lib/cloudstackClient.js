var request = require('./request')
  , AsyncJobPoller = require('./asyncJobPoller')
  , EventEmitter = require('events').EventEmitter;

function CloudStackClient(options) {
	this._options = options;
};

CloudStackClient.prototype.buildRequestArgs = function(command, params) {
	var args = {
		command: command	
	};
	
	for (var o in this._options) {
		args[o] = this._options[o];
	}
	
	if (params) {
		args.params = params;
	}	

	return(args);
};

CloudStackClient.prototype.exec = function(command, requiredParams, optionalParams, callback) {
	var params = {};

	if (requiredParams) {
		for (p in requiredParams) {
			params[p] = requiredParams[p];
		}
	}

	if (optionalParams) {
		for (p in optionalParams) {
			params[p] = optionalParams[p];
		}
	}

	var args = this.buildRequestArgs(command, params);

	new request(args).exec(callback);
};

CloudStackClient.prototype.listVirtualMachines = function(params, callback) {
	this.exec('listVirtualMachines', {}, params, callback);
};

CloudStackClient.prototype.deployVirtualMachine = function(templateId, serviceOfferingId, zoneId/*, params, callback*/) {
	var self = this;

	var params, callback;
	if (typeof arguments[3] === 'function') {
		params = {};
		callback = arguments[3];
	} else {
		params = arguments[3];
		callback = arguments[4];
	}

	var requiredParams = {
		templateId: templateId,
		serviceOfferingId: serviceOfferingId,
		zoneId: zoneId
	};

	this.exec('deployVirtualMachine', requiredParams, params, function(res) {
		if (res.status == 'error') {
			console.log(res);
		}

		var vmid = res.data.id;
		var jobid = res.data.jobid;
		var emitter = new EventEmitter();

		new AsyncJobPoller(self, emitter, jobid).start();

		callback({
			vmid: vmid,
			emitter: emitter
		});
	});
};

CloudStackClient.prototype.destroyVirtualMachine = function(id, callback) {
	this.exec('destroyVirtualMachine', { id: id }, {}, callback);
};

CloudStackClient.prototype.stopVirtualMachine = function(id, callback) {
	this.exec('stopVirtualMachine', { id: id }, {}, callback);
};

CloudStackClient.prototype.startVirtualMachine = function(id, callback) {
	this.exec('startVirtualMachine', { id: id }, {}, callback);
};

CloudStackClient.prototype.rebootVirtualMachine = function(id, callback) {
	this.exec('rebootVirtualMachine', { id: id }, {}, callback);
};

CloudStackClient.prototype.updateVirtualMachine = function(id/*, params, callback*/) {
	var params, callback;
	if (typeof arguments[1] === 'function') {
		params = {};
		callback = arguments[1];
	} else {
		params = arguments[1];
		callback = arguments[2];
	}

	this.exec('updateVirtualMachine', { id: id }, params, callback);
};

CloudStackClient.prototype.queryAsyncJobResult = function(jobid, callback) {
	this.exec('queryAsyncJobResult', { jobid: jobid }, {}, callback);
};

CloudStackClient.prototype.listTemplates = function(templateFilter/*, params, callback*/) {
	var params, callback;
	if (typeof arguments[1] === 'function') {
		params = {};
		callback = arguments[1];
	} else {
		params = arguments[1];
		callback = arguments[2];
	}

	this.exec('listTemplates', { templateFilter: templateFilter }, params, callback);
};

CloudStackClient.prototype.listServiceOfferings = function(/*params, callback*/) {
	var params, callback;
	if (typeof arguments[0] === 'function') {
		params = {};
		callback = arguments[0];
	} else {
		params = arguments[0];
		callback = arguments[1];
	}

	this.exec('listServiceOfferings', {}, params, callback);
};

CloudStackClient.prototype.listZones = function(/*params, callback*/) {
	var params, callback;
	if (typeof arguments[0] === 'function') {
		params = {};
		callback = arguments[0];
	} else {
		params = arguments[0];
		callback = arguments[1];
	}

	this.exec('listZones', {}, params, callback);
};

module.exports = CloudStackClient;