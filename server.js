/**
 * 作者:ling
 * 创建时间:2017/9/12
 * 描述：websocket chat room
 */

var ws = require("nodejs-websocket");

var PORT = 3000;   //端口

var server = ws.createServer(function ( conn ) {

    conn.on("text",function ( data ) {
        console.log("收到：" + data );
        var dataJson = JSON.parse(data);
        if(dataJson.type === "SET_NICKNAME"){
            conn.nickName = dataJson.content;
            var mes = {};   //消息
            mes.type = "enter";
            mes.data = conn.nickName+"进入";
            broadcast(JSON.stringify(mes));
            console.log("设置用户昵称为",dataJson.content);
        }
        if(dataJson.type === "MSG"){
            var mes = {};   //消息
            mes.type = "content";
            mes.nickName = conn.nickName;
            mes.data = conn.nickName +":"+dataJson.content;
            broadcast(JSON.stringify(mes));
        }
    })

    conn.on("close",function ( code, reason) {
        console.log("连接关闭",code,reason);
        var mes = {};   //消息
        mes.type = "leave";
        mes.nickName = conn.nickName;
        mes.data = conn.nickName +"离开了";
        broadcast(JSON.stringify(mes));
    })

    conn.on("error",function (err) {
        console.log(err)
    })
}).listen(PORT);

function broadcast(msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

console.log("websocket服务在" + PORT +"端口开启")