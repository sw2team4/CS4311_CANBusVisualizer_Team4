const router = require('express').Router(); //create a router since this is a route we are creating
let Project = require('../models/project.model'); //require the model from the model folder

//handles http get (retrieving from DB) requests
router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handles http POST (adding to DB) requests
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const analyst_initials = req.body.analyst_initials;
  const event_name = req.body.event_name;
  const event_date = Date.parse(req.body.event_date);
  const can_id = req.body.can_id;
  const vehicle_id = req.body.vehicle_id;
  const baud_rate = req.body.baud_rate;
  const dbc_file_name = req.body.dbc_file_name;
  const off_limits_file_name = req.body.off_limits_file_name;

  const newProject = new Project({
    name,
    analyst_initials,
    event_name,
    event_date,
    can_id,
    vehicle_id,
    baud_rate,
    dbc_file_name,
    off_limits_file_name
  });

  //save project to database
  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
module.exports = router; //standard to do this