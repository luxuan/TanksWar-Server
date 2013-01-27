/**
 * Created with JetBrains WebStorm.
 * User: xiaohei107
 * Date: 13-1-28
 * Time: 上午12:55
 * To change this template use File | Settings | File Templates.
 */
/**
 * Initialize a new 'User' with the given 'opts'.
 *
 * @param {Object} opts
 * @api public
 */

var UserInfo = function(opts) {
    this.id = opts.id;
    this.username = opts.username;
    this.password = opts.password;
};

/**
 * Expose 'Entity' constructor
 */

module.exports = UserInfo;
