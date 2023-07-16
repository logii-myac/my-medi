import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import MainContext from '../context/MainContext'
import { SERVER_URL } from '../services/helper'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const MyProfile = () => {

    const { fetchMyProfile, myProfile } = useContext(MainContext)

    const { name, email, _id, contactNo, city, dob, bloodGroup } = myProfile;

    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState('')

    const [data, setData] = useState({
        name: '',
        contactNo: '',
        city: '',
        dob: '',
        bloodGroup: ''
    })

    const handleEditProfile = (e) => {

        e.preventDefault()

        setLoading(true)

        fetch(`${SERVER_URL}user/update`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    fetchMyProfile()
                    setLoading(false)
                    setMessage(json.message)
                    setData({
                        name: '',
                        contactNo: '',
                        city: '',
                        dob: '',
                        bloodGroup: ''
                    })

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

                    setMessage(json.error)
                }
            })

    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchMyProfile()
    }, [])

    return (
        <>
            <Header />

            <div className="h-screen overflow-x-auto bg-slate-100 w-full flex py-20 md:py-32">

                <form onSubmit={handleEditProfile} method='POST' className=' p-5 w-full sm:w-[60%] lg:w-[40%] xl:w-[20%] m-auto h-max flex flex-col gap-2'>

                    <div className='font-medium'>View & edit your profile</div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>User ID</div>
                        <input type="text" className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' value={_id} disabled placeholder='Edit Name' />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>Email</div>
                        <input type="text" className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' value={email} disabled placeholder='Edit Name' />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>Name : {name}</div>
                        <input type="text" name='name' value={data.name} onChange={onChange} className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' placeholder='Edit Name' />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>Contact No : {contactNo}</div>
                        <input type="text" name='contactNo' value={data.contactNo} onChange={onChange} className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' placeholder='Edit Contact No.' />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>City : {city}</div>
                        <input type="text" name='city' value={data.city} onChange={onChange} className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' placeholder='Edit City' />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>DOB : {dob}</div>
                        <input type="text"
                            placeholder='DD-MM-YYYY'
                            pattern="\d{2}-\d{2}-\d{4}"
                            className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                            name='dob' value={data.dob} onChange={onChange}
                        />
                    </div>

                    <div className='flex flex-col gap-1.5 w-full'>
                        <div className='text-sm'>Blood Group : {bloodGroup}</div>
                        <input type="text" name='bloodGroup' value={data.bloodGroup} onChange={onChange} className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full' placeholder='Edit Blood Group' />
                    </div>

                    {
                        message ?
                            <div className='font-medium opacity-60'>{message}</div>
                            : null
                    }

                    <button
                        className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full mt-3'
                        type='submit'
                    >
                        {
                            loading ? 'Loading...' : 'CONFIRM UPDATE'
                        }
                    </button>

                    <div className='text-center'>or</div>

                    <Link to='/register-face' className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full mt-3 text-center'>UPDATE FACE ID</Link>

                </form>
            </div>
        </>
    )
}

export default MyProfile