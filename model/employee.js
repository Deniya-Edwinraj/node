const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    employee_name: {
        required: true,
        type: String
    },
    Department: {
        required: true,
        type: String
    },
    Destination: {
        required: true,
        type: String
    },
    Salary: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)