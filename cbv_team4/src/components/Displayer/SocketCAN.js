
g = require('../Globals')

console.log('packets');

    var packetType = 'N/A';

    var can = require('socketcan');

    var channel = can.createRawChannel("vcan0", true);
   
    // Log any message 
    channel.addListener("onMessage", function(msg) { 
        console.log(msg)

    });

    // Reply any message
    channel.addListener("onMessage", channel.send, channel);

async function wait_start() {
    while (!g.project_created) {
        await new Promise(r => setTimeout(r, 3000));
        console.log('test')
    }
}

wait_start();

    console.log('traffic started')

    //channel.start();





