exports.createClient = function(options) {
	if (!options) {
		throw Error('Missing parameter "options".')
	}
	
	return new (require('./cloudstackClient'))(options);
};