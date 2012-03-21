var nock = require('nock');

module.exports = function mocks() {
	this.engage = function() {
		nock("http://host:8080")
			.get('/client/api?account=TestUser&apiKey=TestUserApiKey&command=deployVirtualMachine&domainId=1&response=json&serviceOfferingId=1&templateId=211&zoneId=1&signature=7wdCP6pJhVHL4ULQJzyh60Xd9Nw%3D')
			.reply(200, {
				deployvirtualmachineresponse: {
					jobid: 123,
					id: 456
				}
			})
			.get('/client/api?apiKey=TestUserApiKey&command=queryAsyncJobResult&jobid=123&response=json&signature=7%2BzLnDw0TvYezkZovSYda2AABxY%3D')
			.reply(200, {
				queryasyncjobresultresponse: {
					jobstatus: 1
				}
			});
	};
};