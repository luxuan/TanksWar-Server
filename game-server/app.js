var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');

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

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
