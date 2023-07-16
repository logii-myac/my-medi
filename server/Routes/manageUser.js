const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middlewares/fetchUser');
const fetchAdmin = require('../Middlewares/fetchAdmin');
const fetchDoctor = require('../Middlewares/fetchDoctor');

// initializing packages for video processing
const multer = require('multer');
const fs = require('fs-extra');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


// const upload = multer({ dest: 'uploads/' });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// initialization for environment variables

require('dotenv').config();
const env = process.env;

const jwtSecret = env.JWT_SECRET

// ROUTE 1 create new user in the db

router.post('/create', async (req, res) => {

    try {

        const { email, password, name, dob, height, weight, bloodGroup, contactNo, city } = req.body;

        const validateUser = await User.findOne({ email: email })

        if (validateUser) {
            return res.json({ error: 'User Already Exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        const user = await User.create({
            email: email,
            password: secPass,
            name: name,
            dob: dob,
            height: height,
            weight: weight,
            bloodGroup: bloodGroup,
            contactNo: contactNo,
            city: city
        })

        await user.save()

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)

        res.json({
            success: true,
            authToken,
            message: 'Account Created Register Face'
        })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/register-face', upload.single('video'), fetchUser, async (req, res) => {

    try {

        const { originalname, buffer } = req.file

        const userID = req.user.id

        const videoFilePath = `uploads/${userID}.mp4`;
        const outputDir = `frames/${userID}`;

        const desiredFrameCount = 1;
        const videoDuration = 4;

        fs.writeFile(videoFilePath, buffer, (err) => {
            if (err) {
                console.error('Error saving video file:', err);
                res.status(500).json({ error: 'Failed to save video file.' });
            } else {
                fs.mkdirSync(outputDir, { recursive: true });

                const outputPath = `${outputDir}/frame-%d.png`;

                const frameRate = desiredFrameCount / videoDuration; // Calculate frame rate based on desired frame count and video duration

                ffmpeg()
                    .input(videoFilePath)
                    .outputOptions('-vf', `fps=${frameRate}`) // Set frame rate based on calculated value
                    .output(outputPath)
                    .on('start', () => {
                        console.log('Extracting frames...');
                    })
                    .on('end', () => {

                        res.json({ success: true, message: 'Face ID registered!' });
                        // Delete the uploaded video file
                        fs.unlink(videoFilePath, (err) => {
                            if (err) {
                                console.error('Error deleting video file:', err);
                            } else {
                                console.log('Video file deleted.');
                            }
                        });

                    })
                    .on('error', (err) => {
                        console.error('Error extracting frames:', err);
                        res.status(500).json({ error: 'Please Try Again' });
                    })
                    .run();
            }
        });

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// ROUTE 2 authenticate a user by email and password
router.post('/authenticate', async (req, res) => {

    try {

        const { email, password } = req.body;

        const validateUser = await User.findOne({ email: email })

        if (!validateUser) {
            return res.json({ error: 'Invalid Credentials' })
        }

        const passCompare = await bcrypt.compare(password, validateUser.password)

        if (!passCompare) {
            return res.json({ error: 'Invalid Credentials' })
        }

        const data = {
            user: {
                id: validateUser.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)

        res.json({ success: true, message: 'Login Success', authToken: authToken })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

// ROUTE 3 this route can be used by user to update profile data
router.put('/update', fetchUser, async (req, res) => {

    try {

        const sessionUserID = req.user.id

        const { name, dob, height, weight, bloodGroup, contactNo, city } = req.body;

        let newData = {}

        if (name) { newData.name = name }
        if (dob) { newData.dob = dob }
        if (bloodGroup) { newData.bloodGroup = bloodGroup }
        if (contactNo) { newData.contactNo = contactNo }
        if (city) { newData.city = city }

        let user = await User.findById(sessionUserID)
        if (!user) {
            return res.json({ error: 'User not found' })
        }

        user = await User.findByIdAndUpdate(sessionUserID, { $set: newData }, { new: true })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})


router.post('/admin-fetch', fetchAdmin, async (req, res) => {

    try {

        const data = await User.find().sort({ _id: -1 }).select('-password')

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/user-fetch-profile', fetchUser, async (req, res) => {

    try {

        const sessionUserID = req.user.id;

        const data = await User.findById(sessionUserID).select('-password')

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/doctor-fetch-profile/:id', fetchDoctor, async (req, res) => {

    try {

        const data = await User.findById(req.params.id).select('-password')

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

module.exports = router;