const jwt = require('jsonwebtoken');
require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET

const fetchAdmin = (req, res, next) => {

    const token = req.header('admin-auth-token')

    if (!token) {
        return res.json({ error: 'Please authenticate using valid token' })
    }

    try {

        const data = jwt.verify(token, jwtSecret)

        req.admin = data.admin
        next();

    } catch (error) {
        res.json({ error: 'Please authenticate using valid token' })
    }

}

module.exports = fetchAdmin