var request = require('request')
  , crypto = require('crypto');

module.exports = function cloudstack(options) {
	if (!options) {
		options = {};
	}
	
	var apiUri = options.apiUri || process.env.CLOUDSTACK_API_URI
	  , apiKey = options.apiKey || process.env.CLOUDSTACK_API_KEY
	  , apiSecret = options.apiSecret || process.env.CLOUDSTACK_API_SECRET;

	this.exec = function(cmd, params, callback) {
		var paramString = genSignedParamString(
			apiKey, 
			apiSecret, 
			cmd,
			params
		);

		var uri = apiUri + '?' + paramString;
		request(uri, function(err, res, body) {
			if (err) {
				return callback(err);
			}

			var parsedBody = JSON.parse(body);

			if (res.statusCode == 200) {
				var result = parsedBody[cmd.toLowerCase() + 'response'];

				return callback(null, result);
			} 

			// TODO: need all the error condition here
			callback(parsedBody);
		});
	};

	var genSignedParamString = function(apiKey, apiSecret, cmd, params) {
		params.apiKey = apiKey;
		params.command = cmd;		
		params.response = 'json';

		var paramKeys = [];
		for(var key in params) {
			if(params.hasOwnProperty(key)){
				paramKeys.push(key);
			};
		};
		
		paramKeys.sort();
		
		var qsParameters = [];
		for(var i = 0; i < paramKeys.length; i++) {
			key = paramKeys[i];
			qsParameters.push(key + '=' + encodeURIComponent(params[key]));
		}

		var queryString = qsParameters.join('&')
		  , cryptoAlg = crypto.createHmac('sha1', apiSecret)
		  , signature = cryptoAlg.update(queryString.toLowerCase()).digest('base64');

		return queryString + '&signature=' + encodeURIComponent(signature);
	};
};