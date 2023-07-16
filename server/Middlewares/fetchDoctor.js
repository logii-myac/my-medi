const jwt = require('jsonwebtoken');
require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET

const fetchDoctor = (req, res, next) => {

    const token = req.header('doctor-auth-token')

    if (!token) {
        return res.json({ error: 'Please authenticate using valid token' })
    }

    try {

        const data = jwt.verify(token, jwtSecret)

        req.doctor = data.doctor
        next();

    } catch (error) {
        res.json({ error: 'Please authenticate using valid token' })
    }

}

module.exports = fetchDoctor