/**
 * Created with JetBrains WebStorm.
 * User: xiaohei107
 * Date: 13-1-27
 * Time: 下午7:31
 * To change this template use File | Settings | File Templates.
 */
var pomelo = window.pomelo;


//连接Gate服务器得到分配的Connector服务器host和port
function connectToGateAndGetConnector(uid,callback){
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({host: window.location.hostname,port: 3014,log: true}, function() {
        pomelo.request(route, {uid: uid}, function(data) {
            pomelo.disconnect();
            if(data.code === 500) {
                alert("data.code = 500");
                return;
            }
            callback(data.host, data.port);
        });
    });

}
// show login panel
function showLogin() {
    $("#loginView").show();
    $("#chatHistory").hide();
    $("#toolbar").hide();
    $("#loginError").hide();
    $("#loginUser").focus();

    $("#login").click(function() {
        var username = $("#loginUser").attr("value");
        var password = $('#loginPassword').val();

        //连接Gate服务器得到分配的Connector服务器host和port
        connectToGateAndGetConnector(username,function(host,port){//username(uid)用来做分配Connector服务器的依据

            pomelo.init({host:host,port:port,log:true},function(){
                var route = "connector.entryHandler.enter";
                pomelo.request(route,{username:username,password:password},function(data){

                    console.log(data);
                });

            });

        });

    });

};

$(document).ready(function() {
    //when first time into chat room.
    showLogin();



});

