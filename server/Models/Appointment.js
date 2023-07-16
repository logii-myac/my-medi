const mongoose = require('mongoose')

const { Schema } = mongoose;

const AppointmentSchema = new Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        require: true
    },
    time: {
        type: Date,
    },
    timeAssinged: {
        type: String,
    },
    status: {
        type: String
    },
    isChecked: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('appointment', AppointmentSchema)