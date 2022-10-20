require('dotenv').config();

var axios = require('axios')

console.log('packets');

var packetType = 'N/A';

var can = require('socketcan');


var channel = can.createRawChannel("vcan0", true);

// Log any message 
var n = 0
var added = false
channel.addListener("onMessage", function (msg) {
    //console.log(msg)
    if (!process.env['PAUSE_TRAFFIC']) {
        const packet = {
            index: n,
            packet_id: msg.id,
            packet_data: msg.data.toString('hex'),
            timestamp: msg.ts_sec
        }
        if (!added) {
            // console.log(msg)
            axios.post('http://localhost:5000/live_packets/add', packet)
                .then(res => console.log(res.data));
            added = true
            n = n + 1
        }
    } else
       added = false
});

// Reply any message
channel.addListener("onMessage", channel.send, channel);

async function wait(time) {
    await new Promise(r => setTimeout(r, time));
}

async function wait_start() {
    console.log(process.env['PAUSE_TRAFFIC'])
    var response = await axios.get("http://localhost:5000/live_packets/")
    while (!process.env['PROJECT_CREATED']) {
       wait(100);
    }
    channel.start();
}

wait_start();