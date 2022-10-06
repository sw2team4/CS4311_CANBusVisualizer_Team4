
console.log('packets');

    var packetType = 'N/A';

    var can = require('socketcan');

    var channel = can.createRawChannel("vcan0", true);

   
    // Log any message 
    channel.addListener("onMessage", function(msg) { 

            document.getElementById('pkt').innerHTML += `<tr>
            <td>${msg.ts_sec}</td>
            <td>${packetType}</td>
            <td>${msg.id}</td>
            <td>${msg.data}</td> 
            </tr>`

    });

    // Reply any message
    channel.addListener("onMessage", channel.send, channel);

    channel.start();





