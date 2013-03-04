var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
//var userinfoDAO = require('./app/dao/userinfoDAO');
var schedule = require('pomelo-schedule');

var act = require('./app/util/activate');




/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'testcocos2d');
app.defaultConfiguration();

//app configure
app.configure('production|development', function() {
	// route configures 和remote请求有关，handler无关
	app.route('area', routeUtil.area);
    app.route('chat',routeUtil.chat);
	// filter configures
	app.filter(pomelo.timeout());

    // enable the system monitor modules
    app.enable('systemMonitor');

    //var sceneInfo = require('./app/modules/sceneInfo');
    var onlineUser = require('./app/modules/onlineUser');
    if(typeof app.registerAdmin === 'function'){
       // app.registerAdmin(sceneInfo, {app: app});
        app.registerAdmin(onlineUser, {app: app});
    }
    //Set areasIdMap, a map from area id to serverId.
    if (app.serverType !== 'master') {
        var areas = app.get('servers').area;
        var areaIdMap = {};
        for(var id in areas){
            areaIdMap[areas[id].area] = areas[id].id;
        }
        app.set('areaIdMap', areaIdMap);
    }
    // proxy configures
    app.set('proxyConfig', {
        cacheMsg: true,
        interval: 30,
        lazyConnection: true,
        enableRpcLog: true
    });

    // remote configures
    app.set('remoteConfig', {
        cacheMsg: true,
        interval: 30
    });


	//配置数据库
	app.loadConfig('mysql', app.getBase() + '/../shared/config/mysql.json');
	var dbclient = require('./app/dao/mysql/mysql').init(app);
	app.set('dbclient', dbclient);
});

app.configure('production|development', 'gate', function() {
    //chenyl 因为数据库只有一个，服务器有多个，如果配置在app.configure('production|development'中的话每启动一个服务器
    //就会调用一次actResourceIncrease方法，而gate服务器只有一个，所以配置在gate服务器中正好
    //chenyl 5秒后执行一次act.actResourceIncrease 不重复 只执行一次 其他执行方案可参考pomelo-schedule api
    //schedule.scheduleJob({start:Date.now()+5000}, simpleJob);
    //schedule.scheduleJob({start:Date.now()+1100},act.actResourceIncrease);

});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});


