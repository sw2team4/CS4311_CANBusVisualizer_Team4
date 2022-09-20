const router = require('express').Router(); //create a router since this is a route we are creating
let User = require('../models/user.model'); //require the model from the model folder

//handles http get (retrieving from DB) requests
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handles http POST (adding to DB) requests
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  //save user to database
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
module.exports = router; //standard to do this