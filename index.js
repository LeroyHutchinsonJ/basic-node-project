const express = require('express');
const app = express();
//This is a package that helps us tell the time
const moment = require('moment');

//This is a module to control file paths
const path = require('path');

//Imports the logger module(Middleware) by digging in to the middleware folder
const logger = require("./middleware/logger");



//Init middleware
//app.use(logger);


//Initializing the body parser to post data
app.use(express.json());

//This is to handle url encoded data
app.use(express.urlencoded({extended:false}));

//Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//Tells the program to run the file
app.use('/api/members', require('./routes/api/members'));

//Selects the port
const PORT = process.env.PORT || 5000;

//This listens to a port, this runs the web server
app.listen(PORT, () => console.log("Server started on " + PORT));