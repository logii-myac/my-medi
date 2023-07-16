const express = require('express');
const Doctor = require('../Models/Doctor');
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchAdmin = require('../Middlewares/fetchAdmin')
const fetchDoctor = require('../Middlewares/fetchDoctor')
const fetchUser = require('../Middlewares/fetchUser')

require('dotenv').config()
const env = process.env;

const jwtSecret = env.JWT_SECRET

// ROUTE 1 admins can add doctors to the database and provid ethem the password
router.post('/create', fetchAdmin, async (req, res) => {

    try {

        const { email, password, name, city, type } = req.body

        const validateDoctor = await Doctor.findOne({ email: email })

        if (validateDoctor) {
            return res.json({ error: 'Doctor already exists with this email' })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        const doctor = await Doctor.create({
            email: email,
            password: secPass,
            name: name,
            city: city,
            type: type
        })

        await doctor.save()

        res.json({
            success: true,
            message: 'Doctor Credentials Created'
        })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// Route 2 doctors can authenticate using email and password
router.post('/authenticate', async (req, res) => {

    try {

        const { email, password } = req.body

        const validateDoctor = await Doctor.findOne({ email: email })

        if (!validateDoctor) {
            return res.json({ error: 'Invalid Credentials' })
        }

        const passCompare = await bcrypt.compare(password, validateDoctor.password)

        if (!passCompare) {
            return res.json({ error: 'Invalid Credentials' })
        }

        const data = {
            doctor: {
                id: validateDoctor.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)

        res.json({ success: true, message: 'Login Success', authToken: authToken })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// ROUTES to get the list of doctors at different levels

router.post('/admin-get', fetchAdmin, async (req, res) => {

    try {

        const data = await Doctor.find().sort({ _id: -1 })

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/user-get', fetchUser, async (req, res) => {

    try {

        const data = await Doctor.find().sort({ _id: -1 })
        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})


router.post('/user-get-doctor-profile/:id', fetchUser, async (req, res) => {

    try {

        const data = await Doctor.findById(req.params.id)

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// ROUTE to delete a doctor

router.post('/delete', fetchAdmin, async (req, res) => {

    try {

        const validateDoctor = await Doctor.findById(req.body.id)

        if (!validateDoctor) {
            return res.json({ error: 'DOCTOR NOT FOUND' })
        }

        await Doctor.findByIdAndDelete(req.body.id)

        res.json({ success: true, message: 'Doctor Deleted' })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})
module.exports = router