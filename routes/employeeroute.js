const express = require('express');

const router = express.Router()

module.exports = router;

const Model = require('../model/employee');

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
