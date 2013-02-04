var schedule = require('pomelo-schedule');

var userinfoDAO = require('../../../dao/userinfoDAO');

var logger = require('pomelo-logger').getLogger(__filename);
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
		this.app = app;
	};

var handler = Handler.prototype;



handler.enter = function(msg, session, next) {
	console.log("invoke enter");
	var self = this;


    //检测游戏账号是否在数据库中
    userinfoDAO.checkUserinfoByUsernameAndPassword(msg,function(err,res){

        if(err)
        {
            logger.error("checkUserinfoByUsernameAndPassword failed");
            next(new Error('fail to checkUserinfoByUsernameAndPassword at enter'));
            return;
        }else{

           if(res.uid == 0)
           {
               next(null, {code: 200, reason: "用户不存在，请确认账户信息是否填写正确!"});
               return;
           }else{
               console.log("res="+res);
               var rid = res.userid;
               var uid = res.username + '*' + rid;
               var sessionService = self.app.get('sessionService');



               //console.log("sessionService.getByUid(uid)="+sessionService.getByUid(uid));
               //判断用户是否重复登陆
               if( !! sessionService.getByUid(uid)) {
                   sessionService.kick(uid,function(){
                       next(null, {
                           code: 500,
                           error: true,
                           reason:"当前玩家已在线，不能重复登陆"
                       });
                       return;

                   });

               }

               session.bind(uid);
               session.set('rid', rid);
               session.push('rid', function(err) {
                   if(err)
                   {
                       console.error('set rid for session service failed! error is : %j', err.stack);
                   }
               });


               //测试我修改的pomelo源代码
//               var sessionService = this.app.get('sessionService');
//               console.log("sessionService.getAll()="+sessionService.getAll());
//               var thesessions = sessionService.getAll();
//               for(var hehe in thesessions)
//               {
//                   console.log("hehe="+hehe);
//               }


               next(null, {code: 200,userinfo: res});
            }

        }


    });


};

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
//var onUserLeave = function(app, session) {
//    console.log("invoke");
//		if(!session || !session.uid) {
//			return;
//		}
//		app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
//	};