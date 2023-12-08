// create route

const express = require('express');
// used to import the Express.js module
// By calling require('express'), we are importing the Express.js module into our current module

const router = express.Router()
// express.Router() function returns a new router object that is an instance of the express.Router class
// This router object can be used to define custom routes for the web server

module.exports = router;
// its exporting the router object, the other modules in the application can import this router object and use it.
 

// //Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

// //Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

// //Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })


const Model = require('../model/model');
//importing the Model class from the file located at '../model/model' 

// post
router.post('/post', async (req, res) => {
    //  post method of the router object is used to create a new route. The new route will listen for incoming POST requests at the '/post' URL path. 
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
// In this code, we are creating a new instance of the Model class, which represents a document in the MongoDB database. We are passing an object with two properties (name and age) to the constructor. The values of these properties are obtained from the request body using req.body.name and req.body.age, respectively. 
try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    // await keyword before calling the data.save() function. This ensures that the data.save() function has completed before proceeding with the rest of the code.
// data.save() function has completed successfully, the saved data is stored in the dataToSave variable
// dataToSave variable is sent as a JSON response
// sets the response status code to 200  

    catch (error) {
        res.status(400).json({message: error.message})
    }
    // catch block is used to handle these errors
    // catch block sends a JSON response with a 400 status code and an error message. The error.message part of the code is used to access the error message of the caught error. This message is then sent as a JSON response.
})

// get All
router.get('/getAll', async (req, res) => {
    // req is an instance of http.IncomingMessage, which represents the request to access a specific URL. It contains the request method, URL, and request headers among other data.
    try{
        const data = await Model.find();
        res.json(data)
    }
    // await keyword to wait for the Model.find() function to complete. The Model.find() function is used to fetch all data from the database. The await keyword ensures that the execution of the code inside the try block is paused until the Promise returned by Model.find() is resolved
    // // sends a JSON response with a 200 status code. The response body contains the data retrieved from the database
    catch(error){
        res.status(500).json({message: error.message})
    }
    // catch block is triggered if an error occurs in the try block
    // catch block, the error is captured using the error variable
// res.status(500).json() function is used to send a JSON response with a 500 status code, which indicates a server error
// 
    
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    // a new route called 'getOne' that takes an ID as a parameter.

    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    // It checks if the 'data' variable is not null after the execution of the 'Model.findById' function
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//  This block contains the code that will be executed if an error occurs in the try block. The error variable represents the error that was thrown

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    // The route used is the HTTP PATCH method, which is specifically designed for partial updates of resources
    try {
        const id = req.params.id;
        // The id variable is used to store the ID of the item that the client wants to update. In this case, the ID is extracted from the request parameters
        const updatedData = req.body;
        // used to assign the updated data value from the request body to the updatedData variable.

        const options = { new: true };
        // This method finds a matching item in the database using the provided ID, updates the item with the provided data, and returns the updated item

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
// await is used to pause the execution of the async function until the findByIdAndUpdate() method completes its execution
// id: The ID of the document to be updated
// updatedData: An object containing the updated data for the document.

        res.send(result)
        // sends the HTTP response to the client with the result data.
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
    // catch block is used to handle these errors
    // catch block sends a JSON response with a 400 status code and an error message. The error.message part of the code is used to access the error message of the caught error. This message is then sent as a JSON response.
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    // sets up a route to handle DELETE requests
    try {
        const id = req.params.id;
        // matches the data of this id This allows the server-side logic to know which record to delete from the database
        const data = await Model.findByIdAndDelete(id)
        // Model.findByIdAndDelete(id): This is the main line of code that performs the DELETE operation in the database
// await: This keyword is used to wait for the findByIdAndDelete method to complete before continuing with the rest of the code

        res.send(`Document with ${data.name} has been deleted..`)
        // it defines a DELETE route handler that finds a document in the MongoDB database based on its id and deletes it. Then, it sends an HTTP response back to the client with a message indicating the successful deletion of the document
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
    // if eeor is catch it sends an HTTP response back to the client with a status code of 400 and a JSON object containing an error message
})