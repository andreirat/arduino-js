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
        socket.on('led0:on', function (data) {
            leds[0].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led0:off', function (data) {
            leds[0].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led1:on', function (data) {
            leds[1].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led1:off', function (data) {
            leds[1].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led2:on', function (data) {
            leds[2].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led2:off', function (data) {
            leds[2].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led3:on', function (data) {
            leds[3].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led3:off', function (data) {
            leds[3].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led4:on', function (data) {
            leds[4].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led4:off', function (data) {
            leds[4].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led5:on', function (data) {
            leds[5].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led5:off', function (data) {
            leds[5].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led6:on', function (data) {
            leds[6].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led6:off', function (data) {
            leds[6].off();
            console.log('LED OFF RECEIVED');
            
        });

                socket.on('led7:on', function (data) {
            leds[7].on();
           console.log('LED ON RECEIVED');
        });

        socket.on('led7:off', function (data) {
            leds[7].off();
            console.log('LED OFF RECEIVED');
            
        });
    });

