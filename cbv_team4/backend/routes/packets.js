const router = require('express').Router(); //create a router since this is a route we are creating
let Packet = require('../models/packet.model'); //require the model from the model folder

//handles http get (retrieving from DB) requests
router.route('/').get((req, res) => {
    Packet.find()
        .then(packets => res.json(packets))
        .catch(err => res.status(400).json('Error: ' + err));
});

//handles http POST (adding to DB) requests
router.route('/add').post((req, res) => {
    const index = req.body.index;
    const timestamp = req.body.timestamp
    const packet_type = req.body.packet_type;
    const packet_id = req.body.packet_id;
    const packet_data = req.body.packet_data;


    const newPacket = new Packet({
        index,
        timestamp,
        packet_type,
        packet_id,
        packet_data
    });

    //save project to database
    newPacket.save()
        .then(() => res.json('Packet added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; //standard to do this