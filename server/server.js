const express = require('express');
const connectToMongo = require('./Config/db');
const app = express()
const cors = require('cors')

require('dotenv').config();
const env = process.env;

const PORT = env.port;

connectToMongo()

app.use(express.json())
app.use(cors())

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