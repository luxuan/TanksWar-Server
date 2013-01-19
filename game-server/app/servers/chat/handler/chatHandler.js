var chatRemote = require('../remote/chatRemote');

module.exports = function(app) {
     return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.send = function(msg, session, next) {
    var channelService = this.app.get('channelService');
    var param = {
        route: 'onChat',
        msg: msg.content,
        from: msg.from,
        target: msg.target
    };
    channel = channelService.getChannel(msg.rid, false);

    //the target is all users
    if(msg.target == 0) {
        channel.pushMessage(param);
    }
    //the target is specific user
    else {
        var tuid = msg.target + '*' + msg.rid;
        var tsid = channel.getMember(tuid)['sid'];
        channelService.pushMessageByUids(param, [{
            uid: tuid,
            sid: tsid
        }]);
    }
    next(null, {
        route: msg.route
    });
};

/**
 * Get online users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.getUsers = function(msg, session, next) {
    var remote = chatRemote(this.app);
    var users = remote.get(msg.rid, false);
    next(null, {
        users: users
    });
};
