import Dbc, { Can } from 'dbc-can';
import pkg from 'dbc-can';
const { CAN } = pkg;
const filePath = './CSS-Electronics-SAE-J1939-2018-08_v1.2.dbc'

const dbc = new Dbc();

// function to_dec(hex: Buffer) {
//     var res[]
//     const buff = Buffer.from(hex)
//     for ()
//     return res
// }

//01 00 90 a1 41 00 03
dbc.load(filePath).then(data=> {
    
    const can = new Can(data);
    const canFrame = can.createFrame(401, [0x01, 0x00, 0x90, 0xa1, 0x41, 0x00, 0x03]);

    let boundMsg = can.decode(canFrame);

    let boundSignals = boundMsg?.signals;

    console.log(boundSignals);
})
