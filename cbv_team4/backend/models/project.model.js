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
  analyst_initials: { type: String, required: true },
  event_name: { type: String, required: true },
  event_date: { type: Date, required: true },
  can_id: { type: Number, required: true },
  vehicle_id: { type: String, required: true },
  baud_rate: { type: Number, required: true },
  dbc_file_name: { type: String, required: true },
  off_limits_file_name: { type: String, required: false},
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;