const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET

const fetchUser = (req, res, next) => {

    const token = req.header('auth-token')

    if (!token) {
        return res.json({ error: 'Please authenticate using valid token' })
    }

    try {

        const data = jwt.verify(token, jwtSecret)

        req.user = data.user
        next();

    } catch (error) {
        res.json({ error: 'Please authenticate using valid token' })
    }

}

module.exports = fetchUser;