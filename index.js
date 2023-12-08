require('dotenv').config();  
// used to load and configure the environment variables from the .env file.
// require-keyword in Node.js is used to include and load modules
// dotenv-instructing Node.js to include and execute the dotenv module
// .config-load the environment variables 

const express = require('express');
//  using Node.js's module system to import the express module
// express- provides set of features and handling web requests and responses

const mongoose = require('mongoose');
// imports the mongoose modules from mongoose package
// mongoose- its a mongodb odject modelling tool which provides straightforward and schema base solution

const mongoString = process.env.DATABASE_URL;
// access this environment variable and use it to connect to the MongoDB database
//  process.env- depicts the state of the system
mongoose.connect(mongoString);
// method is used to connect to a MongoDB database
const database = mongoose.connection;
// to access the connection instance created by Mongoose.

database.on('error', (error) => {
    console.log(error)
})
// When the 'error' event is triggered, the error object is passed to the listener, which logs the error object to the console 

database.once('connected', () => {
    console.log('Database Connected');
})
// once' method is used instead of the 'on' method to ensure that the event listener is only executed once
// connneted is an event is triggered when the 'database' connection instance successfully connects to the database.
const app = express();

app.use(express.json());
//  designed to parse incoming request bodies in JSON format

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
// 'app.listen' is the port number on which the server should listen for incoming connections
//  its a callback function that gets executed when the server starts listening

// routes
const routes = require('./routes/routes.js');
// importing the routes module from the ./routes/routes.js file

app.use('/api', routes)
// app use- It is used to define middleware functions 
// /api- This is the path that the middleware function
// routes- This is the middleware function that will be applied to incoming requests

