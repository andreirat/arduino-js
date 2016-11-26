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
var sequence = 1;
var clients = [];


httpServer.listen(port);


console.log('Server available at http://localhost:' + port);

var led;
var leds = [];
var ledPins = [];

board.on("ready", function() {
    console.log('Arduino connected');


    //set rgb pins
    led = new five.Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        }
    });
    //set initial state of rgb
    led.color({
        red: 0,
        blue: 0,
        green: 0
    });
    //set LED pins
    ledPins = [7,8,10,11];
    leds = new five.Leds(ledPins);

    //Set motion pin
    var motion = new five.Motion({
        pin: 2
    });

    // "calibrated" occurs once, at the beginning of a session,
    motion.on("calibrated", function() {
        console.log("calibrated");
    });

    // "motionstart" events are fired when the "calibrated"
    // proximal area is disrupted, generally by some form of movement
    motion.on("motionstart", function() {
        var date = new Date();
        io.emit('motionstart', date);
        leds[2].off();
        leds[3].on();
        console.log("motionstart");
    });

    // "motionend" events are fired following a "motionstart" event
    // when no movement has occurred in X ms
    motion.on("motionend", function() {
        var date = new Date();
        io.emit('motionend', date);
        leds[3].fadeOut();
        leds[2].on();
        console.log("motionend");
    });
});
    io.on('connection', function (socket) {
        console.info('New client connected (id=' + socket.id + ').');
        clients.push(socket);

        socket.on('led:on', function (data) {
                leds[data.number].on();
            console.log('Led '+data.number+' on');
            });

        socket.on('led:off', function (data) {
            leds[data.number].off();
            console.log('Led '+data.number+' off');
            
        });

        socket.on('rgb',function(data){
            led.color({
                red: data[0].value,
                blue: data[1].value,
                green: data[2].value
            });
            led.on();
        })


    });

