var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
    io: new Galileo()
});

board.on("ready", function() {
    var led = new five.Led(13);
    led.blink();
});
