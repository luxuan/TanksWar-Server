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
                utils.invokeCallback(cb,null, rs);
            } else {
                utils.invokeCallback(cb, null, {userId:userId, username: msg.username});
            }

		}
	});
};

userinfoDao.getAllIncreaseUser = function(cb)
{
    console.log("getAllIncreaseUser invoke");
    var sql = 'select * from userinfo where foodadd != 0 and oiladd != 0 and ironadd != 0 and mineadd != 0';

    pomelo.app.get('dbclient').query(sql, function(err,res)
    {
        if (err)
        {
            logger.error('getAllIncreaseUser for userinfoDao failed!' + err.stack);
            utils.invokeCallback(cb, err);
            return;
        } else {

            console.log("res="+res);
                utils.invokeCallback(cb,null, res);


        }
    });
};

userinfoDao.updateIncrease = function(date,cb)
{


    console.log(date.uid+" "+date.foodadd+" "+date.oiladd+" "+date.ironadd+" "+date.mineadd);
    var sql = ' update userinfo SET food = food+?,oil = oil+?,iron=iron+?,mine=mine+? where userid =?';
    var args = [date.foodadd,date.oiladd,date.ironadd,date.mineadd,date.uid];
    pomelo.app.get('dbclient').query(sql,args, function(err,res)
    {
        if (err)
        {
            logger.error('getAllIncreaseUser for userinfoDao failed!' + err.stack);
            utils.invokeCallback(cb, err);
            return;
        } else {

            console.log("res="+res);
            utils.invokeCallback(cb,null, res);


        }
    });
}