var pomelo = require('pomelo');
var logger = require('pomelo-logger').getLogger(__filename);
var architectureDao = module.exports;
var utils = require('../util/utils');

architectureDao.getResourceByCategory = function(category, cb) {
	var sql = 'select * from architecture where category = ?';
	var args = [category];
	pomelo.app.get('dbclient').query(sql, args, function(err,res) {
		if (err) {
			logger.error('get architecture by getResourceByCategory for architectureDao failed!' + err.stack);
			utils.invokeCallback(cb, err);
		} else {
			var length = res.length;
			var Resources = [];
			for (var i = 0; i < length; i ++) {
//				var task = createNewTask(res[i]);
				Resources.push(res[i]);
			}
			utils.invokeCallback(cb, null, Resources);
		} 
	});
};

architectureDao.updateResourceById = function(gold,id, cb) {
	var sql = 'update architecture set gold = ? where id = ?';
	
	
	var args = [gold,id];	
	pomelo.app.get('dbclient').query(sql, args, function(err, res) {
		if (!!err) {
			logger.error('update architecture failed!' + err.stack);
			utils.invokeCallback(cb, err);
		} else {
			utils.invokeCallback(cb, null, res);
		}
	});
};

architectureDao.createArchitecture = function(pointx,pointy, png,category,cb) {
	var sql = 'insert into architecture (pointx, pointy,png,category) values (?, ?, ?,?)';
	var args = [pointx, pointy, png,category];
	
	pomelo.app.get('dbclient').insert(sql, args, function(err, res) {
		if (err) {
			logger.error('create architecture for architectureDao failed! ' + err.stack);
			utils.invokeCallback(cb, err, null);
		} else {
			//原来如此，
//			var bag = new Bag({id: res.insertId});
	        utils.invokeCallback(cb, null, res);
		}
	});
	
};