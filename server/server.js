const express = require('express');
const connectToMongo = require('./Config/db');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();
const env = process.env;

const PORT = env.port;

connectToMongo()

app.use(bodyParser.json({limit: '50mb'}))
app.use(cors({ origin: '*' }))

app.use('/api/admin', require('./Routes/manageAdmin'))
app.use('/api/user', require('./Routes/manageUser'))
app.use('/api/doctor', require('./Routes/manageDoctor'))
app.use('/api/appointment', require('./Routes/manageAppointment'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})