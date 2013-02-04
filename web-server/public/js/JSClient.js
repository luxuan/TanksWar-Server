/**
 * Created with JetBrains WebStorm.
 * User: xiaohei107
 * Date: 13-1-27
 * Time: 下午7:31
 * To change this template use File | Settings | File Templates.
 */
var pomelo = window.pomelo;

function getMyArchitecture(category,userid)
{
    var route = "area.architectureHandler.getArchitecture";
    pomelo.request(route,{category:category,userid:userid},function(data){

        console.log(data);
        if(data.code === 200)
        {

            for(var i = 0;i<data.architecture.length;i++)
            {

                var htmlvalue = "";
                for(var key in data.architecture[i])
                {
                        console.log("key="+key);
                    htmlvalue = htmlvalue+key+"="+data.architecture[i][key]+"   ";

                }

                var messageElement2 = document.createElement("button");
                messageElement2.value = "升级";
                $("#"+category).append(messageElement2);

                var messageElement = $(document.createElement("label"));
                messageElement.html(htmlvalue);
                $("#"+category).append(messageElement);



                $("#"+category).append('</br>');
            }
        }

       // $("#loginView");
    });
}

function enterGame(username,password,host,port)
{


    pomelo.init({host:host,port:port,log:true},function(){
        var route = "connector.entryHandler.enter";
        pomelo.request(route,{username:username,password:password},function(data){

            //如果返回的字段有reason说明用户信息有问题
            if(null != data.reason )
            {
                alert(data.reason);
            }else{
                $("#loginView").hide();
                $("#chatHistory").show();
                $("#username").html(data.userinfo.username);
                $("#food").html(data.userinfo.food);
                $("#oil").html(data.userinfo.oil);
                $("#iron").html(data.userinfo.iron);
                $("#mine").html(data.userinfo.mine);
                console.log(data.users);

                //得到自己军事区建筑
                getMyArchitecture("military",data.userinfo.userid);
                //得到自己资源区建筑
                getMyArchitecture("resource",data.userinfo.userid);



            }
        });
    });
}
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


    $("#loginUser").focus();



    $("#login").click(function() {
        var username = $("#loginUser").attr("value");
        var password = $('#loginPassword').val();

        //连接Gate服务器得到分配的Connector服务器host和port
        connectToGateAndGetConnector(username,function(host,port){//username(uid)用来做分配Connector服务器的依据

            enterGame(username,password,host,port);




        });

    });

};

$(document).ready(function() {
    //when first time into chat room.
    showLogin();




});

