var dbc_can = require("dbc-can");
const { raw } = require("express");

const filePath = './CSS-Electronics-SAE-J1939-2018-08_v1.2.dbc'
const dbc = new dbc_can.default()

var socket_can = require('socketcan');
var channel = socket_can.createRawChannel("vcan0", false);

async function get_data() {
        const dbc_file = await dbc.load(filePath).then(data => { return data });
        return dbc_file
}

//use loaded dbc file to parse can data
async function parse_data() {
        var data = await get_data().then(data => { return data });

        channel.addListener("onMessage", function (msg) {
                try {
                        const can = new dbc_can.Can(data)
                        const canFrame = can.createFrame(msg.id, msg.data.toJSON().data);
                        
                        let boundMsg = can.decode(canFrame);
                        let boundSignals = boundMsg?.signals;

                        console.log(boundsSignals)
                } catch {
                        console.log('not found');
                }
        });

        channel.start();
}

parse_data();