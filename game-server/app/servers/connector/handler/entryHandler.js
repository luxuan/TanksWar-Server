var architectureDAO = require('../../../dao/architectureDAO');
var logger = require('pomelo-logger').getLogger(__filename);
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
		this.app = app;
	};

var handler = Handler.prototype;
/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */


handler.getArchitecture = function(msg, session, next) {
	console.log("invoke getArchitecture");
    //得到数据库的建筑的信息
	architectureDAO.getResourceByCategory(msg.category,function(err,Resources) {
		if (err) {
			logger.error('getResourceByCategory failed!');
			next(new Error('fail to getResourceByCategory'));
		} else {
			var length = Resources.length;
			var reTasks = [];
			var Resource;
			console.log(Resources);
			for (var i = 0; i < length; i++) {
				Resource = Resources[i];
				
			}

//            //得到最大的ID，用于新增建筑的时候
//            architectureDao.getMaxResourceIDByCategory(msg.category,function(err,Resources) {
//
//            }
			next(null, {code: 200, Resources: Resources});
		}
	});
	
}

handler.addArchitecture  = function(msg, session, next) {
	console.log("invoke addArchitecture");
	console.log(msg.pointx);
	architectureDAO.createArchitecture(msg.pointx,msg.pointy, msg.png,msg.category, function(err,Resources) {
		if (err) {
			logger.error('getGoldById0 failed!');
			next(new Error('fail to getGoldById0'));
		} else {
			
			var length = Resources.length;
			var reTasks = [];
			var Resource;
			
			for (var i = 0; i < length; i++) {
				Resource = Resources[i];
				
			}
	//		logger.error('length='+length);
			
	//		pomelo.pushMessage({route: 'updateGold', gold: Resource.gold});
			
			next(null, {code: 200, gold: Resource});
		}
	});

}


handler.deleteArchitecture  = function(msg, session, next) {
    console.log("invoke deleteArchitecture");
    console.log(msg.id);
    architectureDAO.deleteArchitecture(msg.id, function(err,Resources) {
        if (err) {
            logger.error('deleteArchitecture failed!');
            next(new Error('fail to deleteArchitecture'));
        } else {

            var length = Resources.length;
            var reTasks = [];
            var Resource;

            for (var i = 0; i < length; i++) {
                Resource = Resources[i];

            }
            //		logger.error('length='+length);

            //		pomelo.pushMessage({route: 'updateGold', gold: Resource.gold});

            next(null, {code: 200, gold: Resource});
        }
    });

}

handler.enter = function(msg, session, next) {
	console.log("invoke enter");
	var self = this;
	var rid = msg.rid;
	
	var uid = msg.username + '*' + rid
	var sessionService = self.app.get('sessionService');

	//duplicate log in
	if( !! sessionService.getByUid(uid)) {
		next(null, {
			code: 500,
			error: true
		});
		return;
	}

	session.bind(uid);
	session.set('rid', rid);
	session.push('rid', function(err) {
		if(err) {
			console.error('set rid for session service failed! error is : %j', err.stack);
		}
	});
	session.on('closed', onUserLeave.bind(null, self.app));

	
	self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, function(users) {
		next(null, {
			code: 200,
			users: users
		});
	});
};

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
		if(!session || !session.uid) {
			return;
		}
		app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
	};