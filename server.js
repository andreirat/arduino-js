// server.js
var express        = require('express');
var app            = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var font = require('oled-font-5x7');
var io=require('socket.io')(httpServer);
var board = new five.Board();
var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/pages/index.html');
});
httpServer.listen(port);

console.log('Hello Rat ! Server is runing on port' + port);


var servos;
board.on("ready", function() {
    console.log('Your system is ready. Board id is ' +board.id);
    servos = new five.Servos([3, 10]);
    servos.center();
    this.repl.inject({
        servos: servos
    });
    

});

io.on('connection', function (socket) {
    console.info('New client connected (id=' + socket.id + ').');
    socket.on('servo:1', function(data) {
        console.log(data);
        servos[0].to(data);
    });
    socket.on('servo:2', function(data) {
        servos[1].to(data);
    });
    socket.on('servo:data', function(data) {
        console.log(data);
    });
});
