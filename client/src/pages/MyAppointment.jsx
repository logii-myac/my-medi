import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { SERVER_URL } from '../services/helper'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Appointment = (props) => {

    const { _id, doctorID, time, timeAssinged, status, isChecked } = props.data;

    const { refresh } = props;

    const [drProfile, setDrProfile] = useState({})

    const fetchDrProfile = () => {

        fetch(`${SERVER_URL}doctor/user-get-doctor-profile/${doctorID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setDrProfile(json))

    }

    const handleDelete = () => {

        fetch(`${SERVER_URL}appointment/user-delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ appointmentID: _id })
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {

                    refresh()

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

                } else {
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

    useEffect(() => {
        fetchDrProfile()
    }, [])

    return (

        <>
            <div className='w-full md:w-[70%] p-8 flex flex-col md:flex-row md:justify-between md:items-center bg-white border shadow-lg shadow-black/20 rounded-lg'>

                <div className="flex flex-col h-full justify-between">

                    <p className='w-max md:text-2xl font-bold'>Dr {drProfile.name}</p>

                    <div className='font-medium'>{drProfile?.type?.toUpperCase()}</div>

                    <div className='text-slate-400 font-bold'>{drProfile?.city}</div>

                </div>

                {
                    status !== "complete" ?
                        <div className='flex flex-row gap-4 md:flex-col'>

                            {

                                isChecked ? <div className='font-bold'>Appointed Time : {timeAssinged ? timeAssinged : 'waiting'}</div> :
                                    <Link to='/checkin' state={{ data: props.data }} className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 lg:w-max text-center'>
                                        CHECKIN
                                    </Link>
                            }

                            <button onClick={handleDelete} className='py-1 px-3 rounded hover:bg-slate-300 font-medium duration-300'>DELETE</button>

                        </div>
                        :
                        <div className='flex flex-row gap-4 md:flex-col'>
                            <div className='font-medium text-lg'>{status.toUpperCase()}</div>
                            <div className='font-medium text-lg'>{time?.slice(0, 10)}</div>
                        </div>

                }


            </div>
        </>

    )

}

const MyAppointment = () => {

    const [dataList, setDataList] = useState([])

    const fetchAppointment = () => {

        fetch(`${SERVER_URL}appointment/user-fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setDataList(json))

    }

    useEffect(() => {
        fetchAppointment()
    }, [])

    return (
        <>
            <Header />

            <div className="max-h-max min-h-screen bg-slate-100 w-full flex flex-col gap-5 items-center justify-center px-5 py-24 md:px-20 md:py-36">

                {
                    dataList.length ?
                        dataList?.map((data) => {
                            return (
                                <Appointment key={data._id} data={data} refresh={fetchAppointment} />
                            )
                        }) :

                        <div className='flex flex-col items-center gap-5 justify-center h-full'>

                            <div className='text-lg font-medium'>You have not booked any appointments yet !</div>
                            <Link to='/' className='bg-blue-700 text-white w-max px-5 py-1 rounded'>BOOK NOW</Link>

                        </div>
                }

            </div>
        </>
    )
}

export default MyAppointment