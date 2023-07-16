const express = require('express');
const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken');

require('dotenv').config();
const env = process.env;

const jwtSecret = env.JWT_SECRET

// ROUTE 1 : create a new admin

router.post('/create', async (req, res) => {

    try {

        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(400).json({ error: "Sorry a Admin with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new admin

        admin = await Admin.create({
            email: req.body.email,
            password: secPass
        })

        const data = {
            admin: {
                id: admin.id
            }
        }

        const authtoken = jwt.sign(data, jwtSecret)

        // res.json(Admin)
        res.json({ success: true, authtoken })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// ROUTE 2 : authenticate admin to the system

router.post('/authenticate', async (req, res) => {

    try {

        const { email, password } = req.body;

        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passCompare = await bcrypt.compare(password, admin.password);

        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        res.json({ success: true, authToken })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

module.exports = router