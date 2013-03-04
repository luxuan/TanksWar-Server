var act = module.exports;
var pomelo = require('pomelo');
var userinfoDAO = require('../dao/userinfoDAO');
var schedule = require('pomelo-schedule');
var consts  = require('../consts/consts.js');

act.actResourceIncrease = function()
{

    userinfoDAO.getAllIncreaseUser(function(err,users){
        for(var i = 0; i < users.length; i++) {
            //console.log(users[i].username);
            schedule.scheduleJob({period : 2000}, updateIncrease, {uid: users[i].userid,foodadd: users[i].foodadd,oiladd: users[i].oiladd,ironadd: users[i].ironadd,mineadd: users[i].mineadd});
        }
    });

    //TODO 得到所有的在线用户，由于该方法只执行一次，所以要在这个弄一个schedule，不能放在updateIncrease调用，因为推送在线用户，不是所有用户
    schedule.scheduleJob({period:2000},notifyOnlineUsers);




}

/**
 * 更新在线玩家客户端的信息
 */
var notifyOnlineUsers = function()
{

    pomelo.app.rpc.chat.chatRemote.get(consts.Channel.ALL, true, function(users){
//        next(null, {code: 200,userinfo: res,users:users});
        console.log("users.length="+users.length);

        //    var param = {
//        route: 'onUpdateResource',
//        shuju: '更新后的数据'
//    };
//    channel.pushMessage(param);

    });





}
/**
 * 更新数据库中玩家资源信息
 * @param data
 */
var updateIncrease = function(data)
{

    userinfoDAO.updateIncrease(data,function(err,res){
            if(!!err)
            {
               console.log("updateIncrease error in active.js:"+err);
            }
    });
}