import React, { useEffect, useState } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import { SERVER_URL} from '../services/helper';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterFaceID = () => {

    const [loading, setLoading] = useState(false)

    const [recordedFile, setRecordedFile] = useState(null)

    const navigate = useNavigate()

    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({
            video: true,
            onStop: (blobUrl, blob) => {

                setRecordedFile(blob);
                setLoading(true)

                const formData = new FormData()
                formData.append('video', blob)

                fetch(`${SERVER_URL}user/register-face`, {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    body: formData
                })
                    .then(res => res.json())
                    .then(json => {

                        if (json.success) {

                            setLoading(false)

                            toast.success(`${json.message}`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });

                            navigate('/')

                        } else {

                            setLoading(false)

                            toast.error(`${json.error}`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });

                        }

                    })

            }
        });

    const [recordingStatus, setRecordingStatus] = useState(false)

    useEffect(() => {

        if (recordingStatus) {
            setTimeout(() => {
                stopRecording()
                setRecordingStatus(false)
            }, 4000);
        }

    }, [recordingStatus])

    return (
        <>

            <Header />

            <div className="h-screen bg-slate-100 flex justify-center">

                <form method='POST' className='p-5 w-full md:w-[40%] lg:w-[25%] m-auto flex flex-col gap-2'>

                    <div className='font-bold'>Scan your face to register</div>

                    <div className='bg-white aspect-video rounded'>

                        {/* <video src={mediaBlobUrl} controls autoPlay loop className='w-full h-full rounded' /> */}

                        <Webcam className='w-full h-full rounded' />

                    </div>

                    <div className='text-sm text-slate-600'>Note : Please make sure that your face is properly visible.</div>

                    <button
                        type='button'
                        className={loading ? 'bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full cursor-not-allowed' : 'bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'}
                        onClick={() => {
                            setRecordingStatus(true)
                            startRecording()
                        }}
                        disabled={loading}
                    >

                        {
                            loading ? "loading..." : "START SCANNING"
                        }

                    </button>

                </form>

            </div>
        </>
    )
}

export default RegisterFaceID