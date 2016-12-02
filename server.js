// server.js
var express        = require('express');
var app            = express();
var router =       express.Router();


var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var Oled = require('oled-js');
var font = require('oled-font-5x7');
var io=require('socket.io')(httpServer);
var board = new five.Board();
var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/pages/index.html');
});
httpServer.listen(port);
console.log('Server available at http://localhost:' + port);

var clients = [];
var led;
var leds = [];
var ledPins = [];
var oled;

/*
 ** @description Options for Oled display SSD1306
 */
var opts = {
    width: 128,
    height: 64,
    address: 0x3C
};


board.on("ready", function() {
    console.log('Arduino connected');


    oled = new Oled(board, five, opts);
    oled.turnOnDisplay();
    oled.clearDisplay(true);
    oled.update();

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
    });

    socket.on('pushText', function (data) {
        console.log(data);
        writestring(data);
    });

    socket.on('clearText', function () {
        clearDisplay();
    });

});

function writestring(data){
    oled.clearDisplay(true);
    oled.update();
    oled.setCursor(1, 1);
    oled.writeString(font, 3, data, 1, true, 2);
    oled.update();
}

function clearDisplay(){
    oled.clearDisplay(true);
    oled.update();
}