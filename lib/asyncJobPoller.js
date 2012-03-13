module.exports = function AsyncJobPoller(client, emitter, jobId) {
	this._client = client;
	this._emitter = emitter;
	this._jobId = jobId;
	this._interval = null;

	this.poll = function(jobid, callback) {
		this._client.queryAsyncJobResult(jobid, function(res) {
			if (res.status == 'error') {
				callback(res.data);	
			} else if (res.status == 'ok') {
				callback(null, res.data);
			}
		});
	};

	this.start = function() {
		this._interval = setInterval(function(poller) {
			poller.poll(poller._jobId, function(err, status) {
				if (err) {
					poller._emitter.emit('error', err);
				} else {
					if (status.jobstatus == 1) {
						poller.stop();
						poller._emitter.emit('success', poller._jobId);
					} else if (status.jobstatus == 2) {
						poller.stop();
						poller._emitter.emit('fail', poller._jobId);
					}
				}
			});
		}, 2000, this);	
	};

	this.stop = function() {
		clearInterval(this._interval);
	};
};