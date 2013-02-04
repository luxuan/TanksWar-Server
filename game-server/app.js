var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
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

	// filter configures
	app.filter(pomelo.timeout());

	
	//配置数据库
	app.loadConfig('mysql', app.getBase() + '/../shared/config/mysql.json');
	var dbclient = require('./app/dao/mysql/mysql').init(app);
	app.set('dbclient', dbclient);
});

app.configure('production|development', 'gate', function() {
    //chenyl 因为数据库只有一个，服务器有多个，如果配置在app.configure('production|development'中的话每启动一个服务器
    //就会调用一次actResourceIncrease方法，而gate服务器只有一个，所以配置在gate服务器中正好
    act.actResourceIncrease();
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
