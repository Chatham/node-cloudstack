var nock = require('nock');

module.exports = function mocks() {
	this.engage = function() {
		nock("http://controller:8080")
			.get("/client/api?account=TestUser&apiKey=TestUserApiKey&command=listVirtualMachines&domainId=1&response=json&signature=acSwdq7p634LFmIvR3em%2FZzlKEE%3D")
			.reply(200, {
				listvirtualmachinesresponse: {}
			});
	};
};