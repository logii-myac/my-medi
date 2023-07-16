const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({

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
    dob: {
        type: String,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    contactNo: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    isAuth: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('user', UserSchema)