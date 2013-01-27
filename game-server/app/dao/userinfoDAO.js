var pomelo = require('pomelo');
var logger = require('pomelo-logger').getLogger(__filename);
var userinfoDao = module.exports;
var utils = require('../util/utils');
var UserInfo = require('../pojo/userinfo');

userinfoDao.checkUserinfoByUsernameAndPassword = function(msg, cb)
{
	var sql = 'select * from userinfo where username = ? and password = ?';
	var args = [msg.username,msg.password];
	pomelo.app.get('dbclient').query(sql, args, function(err,res)
    {
		if (err)
        {
			logger.error('get userinfo by checkUserinfoByUsernameAndPassword for userinfoDao failed!' + err.stack);
			utils.invokeCallback(cb, err);
            return;
		} else {
            var userId = 0;
            if (!!res && res.length === 1) {
                var rs = res[0];
                userId = rs.userid;
                rs.uid = rs.userid;
                utils.invokeCallback(cb,null, rs);
            } else {
                utils.invokeCallback(cb, null, {uid:0, username: msg.username});
            }

		}
	});
};

