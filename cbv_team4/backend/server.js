const express = require('express');
const cors = require('cors'); //helps get outside packages from express
const mongoose = require('mongoose'); //helps connect to mongodb 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//set up middleware 
app.use(cors());
app.use(express.json()); //helps pars JSON

//database uri - retrieved from the mongodb 
const uri = process.env.COMPASS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
  mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//import them basically
const projectsRouter = require('./routes/projects');
const packetsRouter = require('./routes/packets');

//use those files ------- THIS IS DOING THE CRUD OPERATION
app.use('/projects', projectsRouter);
app.use('/packets', packetsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});