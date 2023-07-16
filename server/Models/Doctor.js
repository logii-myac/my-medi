const mongoose = require('mongoose')

const { Schema } = mongoose;

const DoctorSchema = new Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('doctor', DoctorSchema)