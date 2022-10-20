const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packetSchema = new Schema({
  //schema for a project
    index: { 
    type: Number,
    required: true,
    unique: false,
    trim: true,
    minlength: 1
  },
  timestamp: { type: String, required: false },
  packet_type: { type: String, required: false },
  packet_id: { type: String, required: false },
  packet_data: { type: String, required: false },
});

const Packet = mongoose.model('Live_Packet', packetSchema);

module.exports = Packet;