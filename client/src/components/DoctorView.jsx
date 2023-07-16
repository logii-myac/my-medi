import React, { useState } from 'react'
import { SERVER_URL} from '../services/helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DoctorView = (props) => {

    const { _id, name, email, type, city } = props.data

    const [date, setDate] = useState('')

    const navigate = useNavigate()

    const handleBookAppointment = async (e) => {

        e.preventDefault()

        fetch(`${SERVER_URL}appointment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ doctorID: _id, time: date, status: 'new' })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
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

                    navigate('/my-appointment')
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

    return (
        <>
            <div className='w-full md:w-[70%] p-8 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-white border shadow-lg shadow-black/20 rounded-lg'>

                <div className="flex flex-col h-full justify-between">

                    <p className='w-max text-2xl font-bold'>Dr {name}</p>

                    <div className='font-medium'>{type?.toUpperCase()}</div>

                    <div className='text-slate-400 font-bold'>{city}</div>

                </div>

                <form method='POST' onSubmit={handleBookAppointment} className='flex flex-col mt-1 gap-1'>

                    <div>Book Appointment</div>

                    <div className='flex lg:flex-col gap-2'>

                        <input
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            type="date"
                            className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' />

                        <button type='submit' className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'>
                            BOOK
                        </button>

                    </div>

                </form>

            </div>
        </>
    )
}

export default DoctorView