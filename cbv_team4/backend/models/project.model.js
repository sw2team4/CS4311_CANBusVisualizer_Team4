const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  //schema for a project
    name: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },  
  analyst_initials: { type: String, required: false },
  event_name: { type: String, required: false },
  event_date: { type: Date, required: false },
  can_id: { type: Number, required: false },
  vehicle_id: { type: String, required: false },
  baud_rate: { type: Number, required: false },
  dbc_file_name: { type: String, required: false },
  off_limits_file_name: { type: String, required: false},
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;