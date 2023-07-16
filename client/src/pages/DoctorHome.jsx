import React, { useEffect, useState } from 'react'
import SidebarDoctor from '../components/SidebarDoctor'
import { SERVER_URL } from '../services/helper'

const DoctorAppointment = (props) => {

    const { _id, userID, status, timeAssinged } = props.data;

    const { refresh } = props

    const [time, setTime] = useState('')

    const handleAssingnTime = (e) => {

        e.preventDefault()

        fetch(`${SERVER_URL}appointment/doctor-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'doctor-auth-token': localStorage.getItem('doctor-auth-token')
            },
            body: JSON.stringify({ timeAssinged: time, status: 'confirmed', appointmentID: _id })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    refresh()
                }
            })

    }

    const handleComplete = (e) => {

        e.preventDefault()

        fetch(`${SERVER_URL}appointment/doctor-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'doctor-auth-token': localStorage.getItem('doctor-auth-token')
            },
            body: JSON.stringify({ status: 'complete', appointmentID: _id })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    refresh()
                }
            })

    }

    const [userProfile, setUserProfile] = useState({})

    const { name, email, city } = userProfile;

    const fetchUserProfile = () => {

        fetch(`${SERVER_URL}user/doctor-fetch-profile/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'doctor-auth-token': localStorage.getItem('doctor-auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setUserProfile(json))

    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <>
            <form onSubmit={handleAssingnTime} method='POST' className='w-full flex gap-10 justify-between h-max items-center bg-slate-200 p-5 rounded-lg'>

                <div className="flex gap-2 w-full justify-between">

                    <div className='flex flex-col'>

                        <div className='text-sm opacity-40 font-medium'>Patient Name</div>
                        <div className='font-bold text-lg opacity-80'>{name}</div>

                    </div>

                    <div className='flex flex-col'>

                        <div className='text-sm opacity-40 font-medium'>Patient Email</div>
                        <div className='font-bold text-lg opacity-80'>{email}</div>

                    </div>

                    <div className='flex flex-col'>

                        <div className='text-sm opacity-40 font-medium'>Patient City</div>
                        <div className='font-bold text-lg opacity-80'>{city}</div>

                    </div>

                    <div className='flex flex-col'>

                        <div className='text-sm opacity-40 font-medium'>Patient ID</div>
                        <div className='font-bold text-lg opacity-80'>{userProfile?._id}</div>

                    </div>

                    <div className='flex flex-col'>

                        <div className='text-sm opacity-40 font-medium'>Status</div>
                        <div className='font-bold text-lg opacity-80'>{status}</div>

                    </div>

                    {
                        status === "new" ? null :
                            <div className='flex flex-col'>

                                <div className='text-sm opacity-40 font-medium'>Time</div>
                                <div className='font-bold text-lg opacity-80'>{timeAssinged}</div>

                            </div>
                    }



                </div>

                {
                    status === "new" ?
                        <div className='flex flex-col gap-2'>

                            <input type="time" value={time} onChange={e => setTime(e.target.value)} className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' required />

                            <button type='submit' className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'>
                                CONFIRM
                            </button>

                        </div>
                        : status === "confirmed" ?
                            <button className='px-3 py-1 hover:bg-green-600 hover:text-white duration-300 font-medium rounded' onClick={handleComplete}>COMPLETE</button>
                            : null
                }

            </form>
        </>
    )
}

const DoctorHome = () => {

    const [data, setData] = useState([])

    const fetchAppointment = () => {
        fetch(`${SERVER_URL}appointment/doctor-fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'doctor-auth-token': localStorage.getItem('doctor-auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setData(json))
    }

    useEffect(() => {
        fetchAppointment()
    }, [])

    return (
        <div className='h-screen flex'>

            <SidebarDoctor />

            <div className='h-screen w-full flex flex-col gap-5 p-6 overflow-x-auto'>

                <div className="flex w-full justify-between">
                    <div className='font-bold text-lg'>Appointments For You</div>
                    <button onClick={fetchAppointment} className='bg-black text-white font-medium px-2 py-1 rounded'>REFRESH</button>
                </div>


                {
                    data?.map((data) => {
                        return (
                            <DoctorAppointment key={data._id} data={data} refresh={fetchAppointment} />
                        )
                    })
                }

            </div>

        </div>
    )

}

export default DoctorHome