const mongoose = require('mongoose');
// it used to load the mongoose module

const dataSchema = new mongoose.Schema({
    // mongoose.Schema is a constructor. This constructor takes an object that defines the fields of the schema and their validation rules
    // schema- schema in Mongoose is a blueprint for the documents in a collection, defining the fields they should have and the validation rules for those fields.
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
    // data that we have to assaign
})

module.exports = mongoose.model('Data', dataSchema)
// It makes the model available for other modules in the application to use. The module.exports statement exports the 'Data' model so that it can be imported and used in other files.
