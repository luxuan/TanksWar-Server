/**
 * Created with JetBrains WebStorm.
 * User: xiaohei107
 * Date: 13-2-2
 * Time: 上午12:31
 * To change this template use File | Settings | File Templates.
 */
var architectureDAO = require('../../../dao/architectureDAO');

var handler = module.exports;





handler.increaseArchitectureLevel = function(msg,session,next){
    architectureDAO.increaseArchitectureLevel(msg,function(err,result){
        if(err)
        {
            logger.error('incresseLevel failed!');
            next(new Error('fail to incresseLevel'));
        }else{
            next(null, {code: 200, result: result});
        }

    });

}


handler.getArchitecture = function(msg, session, next) {
    console.log("invoke getArchitecture");
    //得到数据库的建筑的信息
//console.log("session.get(rid)="+session.get("rid"));


    architectureDAO.getArchitectureByCategory(msg.category,session.get("rid"),function(err,Resources) {
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
            next(null, {code: 200, architecture: Resources});
        }
    });

}

handler.addArchitecture  = function(msg, session, next) {
    console.log("invoke addArchitecture");
//	console.log(msg.pointx+","+msg.alevel);
    architectureDAO.createArchitecture(msg, function(err,Resources) {
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