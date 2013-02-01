var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.area = function(session, msg, app, cb) {
	var areaServers = app.getServersByType('area');

	if(!areaServers || areaServers.length === 0) {
		cb(new Error('can not find area servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), areaServers);

	cb(null, res.id);
};