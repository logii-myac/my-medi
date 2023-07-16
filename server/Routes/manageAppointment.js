const express = require('express')
const router = express.Router()
const fetchUser = require('../Middlewares/fetchUser');
const fetchDoctor = require('../Middlewares/fetchDoctor');
const fetchAdmin = require('../Middlewares/fetchAdmin');
const Appointment = require('../Models/Appointment');

const { spawn } = require('child_process')

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



router.post('/create', fetchUser, async (req, res) => {

    try {

        const { doctorID, time, status } = req.body;

        const sessionUserID = req.user.id;

        const data = Appointment({
            doctorID: doctorID,
            time: time,
            status: status,
            userID: sessionUserID
        })

        await data.save()

        res.json({
            success: true,
            message: 'Appointment Created!'
        })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/checkin', upload.single('video'), fetchUser, async (req, res) => {

    try {

        const { originalname, buffer } = req.file

        const userID = req.user.id

        const validateAppointment = await Appointment.findOne({ _id: req.body.appointmentID, userID: userID, isChecked: false })

        if (!validateAppointment) {
            return res.json({ error: 'Please select the right appointment.' })
        }

        const videoFilePath = `uploads/${userID}.mp4`;
        const outputDir = `checkinFrames/${userID}`;

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


                        const childPython = spawn('python', ['../server/ml/model.py', userID])

                        childPython.stdout.on('data', async (data) => {

                            if (data.toString().slice(0, 4) == 'True') {

                                validateAppointment.isChecked = true
                                await validateAppointment.save()

                                res.json({ success: true, message: 'Checkin Successful' })
                            } else {
                                res.json({ error: 'Please Try Again' })
                            }

                        })

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
                        res.json({ error: 'Please Try Again' });
                    })
                    .run();
            }
        });

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/doctor-update', fetchDoctor, async (req, res) => {

    try {

        let newData = {}

        const { timeAssinged, status, appointmentID } = req.body

        const appointment = await Appointment.findById(appointmentID)

        if (!appointment) {
            return res.json({ error: 'Appointment Invalid' })
        }

        if (timeAssinged) {
            newData.timeAssinged = timeAssinged
        }
        if (status) {
            newData.status = status
        }

        await Appointment.findByIdAndUpdate(appointmentID, { $set: newData }, { new: true })

        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/user-delete', fetchUser, async (req, res) => {

    try {

        const { appointmentID } = req.body

        const appointment = await Appointment.findById(appointmentID)

        if (appointment.userID != req.user.id) {
            return res.json({ error: 'Invalid User' })
        }

        await Appointment.findByIdAndDelete(appointmentID)

        res.json({ success: true, message: 'Appointment Deleted' })

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/user-fetch', fetchUser, async (req, res) => {

    try {

        const sessionUserID = req.user.id

        const data = await Appointment.find({ userID: sessionUserID }).sort({ _id: -1 })

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/doctor-fetch', fetchDoctor, async (req, res) => {

    try {

        const sessionDoctorID = req.doctor.id

        const data = await Appointment.find({ doctorID: sessionDoctorID, isChecked: true, status: { $nin: 'complete' } }).sort({ _id: -1 })

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

router.post('/admin-fetch', fetchAdmin, async (req, res) => {

    try {

        const data = await Appointment.find().sort({ _id: -1 })

        res.json(data)

    } catch (error) {
        console.log(error)
        res.json({ error: 'Internal Server Error' })
    }

})

module.exports = router;