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

exp.chat = function(session, msg, app, cb) {
    var chatServers = app.getServersByType('chat');

    if(!chatServers || chatServers.length === 0) {
        cb(new Error('can not find chat servers.'));
        return;
    }

    var res = dispatcher.dispatch(session.get('rid'), chatServers);

    cb(null, res.id);
};