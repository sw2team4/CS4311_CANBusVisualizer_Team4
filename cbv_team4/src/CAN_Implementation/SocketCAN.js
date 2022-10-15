
var dbc_can = require("dbc-can");
const { text } = require("express");
var fs = require('fs');
const { get } = require("http");

const filePath = './CSS-Electronics-SAE-J1939-2018-08_v1.2.dbc'
const dbc = new dbc_can.default()
const textFile = './J1939-Sample-Data-CL3000.txt';

async function get_data() {
        const dbc_file = await dbc.load(filePath).then(data => { return data });
        return dbc_file
}

async function getTextFile() {
        var text = await fs.readFileSync(textFile);
        return text.toString();
}

async function parseCANFile() {
        let packets = [];
        const lines = await getTextFile();
        const line_array = lines.split('\n');

        for (let i = 0; i < line_array.length; i++) {
                const msg = line_array[i].split(';');


                var packet = {
                        index: i,
                        timestamp: msg[0],
                        packet_type: msg[1],
                        packet_id: parseInt(msg[2], 16),
                        packet_data: msg[3]

                }
                packets[i] = packet;
        }
        parse_data(packets)

}

//use loaded dbc file to parse can data
async function parse_data(packets) {
        var data = await get_data().then(data => { return data });
        console.log(packets[0].packet_data);
        // for (let i = 0; i < packets.length; i++) {
        //         let packet = packets[i]
        //         try {
        //                 const can = new dbc_can.Can(data)
        //                 const canFrame = can.createFrame(packet.packet_id, packet.packet_data); // id from txt file

        //                 let boundMsg = can.decode(canFrame);
        //                 let boundSignals = boundMsg?.signals;
        //         } catch {
        //                 console.log("not found index: " + i)
        //         }
        // }
}


parseCANFile();

