// server.js
var express        = require('express');
var app            = express();

var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var io=require('socket.io')(httpServer);

var board = new five.Board();

var port = 3000; 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});


httpServer.listen(port);


console.log('Server available at http://localhost:' + port);

var led;
var leds = [];
var ledPins = [];
var p;

board.on("ready", function() {
    console.log('Arduino connected');
    // led = new five.Led(3);
   ledPins = [2,3,4,5,6,7,8,9];
   leds = new five.Leds(ledPins);
});

io.on('connection', function (socket) {
        console.log(socket.id);
    var mesaj = {};
        socket.on('led:on', function (data) {
            leds[data.number].on();
           console.log('Led '+data.number+' on');
        });

        socket.on('led:off', function (data) {
            leds[data.number].off();
            console.log('Led '+data.number+' off');
            
        });
    });

