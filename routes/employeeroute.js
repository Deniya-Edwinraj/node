const express = require('express');
// used to import the Express.js module
// By calling require('express'), we are importing the Express.js module into our current module

const router = express.Router()
// express.Router() function returns a new router object that is an instance of the express.Router class
// This router object can be used to define custom routes for the web server

module.exports = router;
// its exporting the router object, the other modules in the application can import this router object and use it.

const Model = require('../model/employee');
//importing the Model class from the file located at '../model/model' 

// post
router.post('/post', async (req, res) => {
    const data = new Model({
        employee_name: req.body.employee_name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
