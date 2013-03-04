/**
 * Created with JetBrains WebStorm.
 * User: xiaohei107
 * Date: 13-2-4
 * Time: 下午2:03
 * To change this template use File | Settings | File Templates.
 */

//该文件用于定义一些常量信息
module.exports = {
    RES_CODE : {
        SUC_OK						: 1,		// success
        ERR_FAIL					: -1,		// Failded without specific reason
        ERR_USER_NOT_LOGINED		: -2,		// User not login
        ERR_CHANNEL_DESTROYED		: -10,		// channel has been destroyed
        ERR_SESSION_NOT_EXIST		: -11,		// session not exist
        ERR_CHANNEL_DUPLICATE		: -12,		// channel duplicated
        ERR_CHANNEL_NOT_EXIST		: -13		// channel not exist
    },



    Event:{
        chat:'onChat'
    },

    Channel:{
        ALL                         :1
    }




};