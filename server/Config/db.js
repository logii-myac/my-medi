const mongoose = require('mongoose')

require('dotenv').config();
const env = process.env;
mongoose.set('strictQuery', true);

const mongoURI = env.mongoURI

const connectToMongo = async () => {

    try {

        await mongoose.connect(mongoURI)
        console.log('Connect to DB')

    } catch (error) {
        console.log('some error occured during db connection')
        console.log(error)
    }

}

module.exports = connectToMongo;
