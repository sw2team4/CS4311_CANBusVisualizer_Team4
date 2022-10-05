var can = require('socketcan');

var channel = can.createRawChannel("vcan0", true);


export const displayPKT = () => {
    channel.addListener("onMessage", function(msg) { 

        document.getElementById('pkt').innerHTML += `<tr>
        <td>${msg.ts_sec}</td>
        <td>${packetType}</td>
        <td>${msg.id}</td>
        <td>${msg.data}</td> 
        </tr>`

});
}
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





