var act = module.exports;
var userinfoDAO = require('../dao/userinfoDAO');
var schedule = require('pomelo-schedule');

act.actResourceIncrease = function()
{
    console.log("&&&&&&&&&&actResourceIncrease&&&&&&&&&&");
    userinfoDAO.getAllIncreaseUser(function(err,users){
        for(var i = 0; i < users.length; i++) {
            //console.log(users[i].username);
            schedule.scheduleJob({period : 2000}, updateIncrease, {uid: users[i].userid,foodadd: users[i].foodadd,oiladd: users[i].oiladd,ironadd: users[i].ironadd,mineadd: users[i].mineadd});
        }

    });

}


var updateIncrease = function(date)
{

    userinfoDAO.updateIncrease(date,function(err,res){
        console.log(res);


    });
}