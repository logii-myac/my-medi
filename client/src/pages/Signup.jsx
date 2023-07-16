import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../services/helper'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { toast } from 'react-toastify'

const Signup = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        dob: '',
        height: '',
        weight: '',
        bloodGroup: "",
        contactNo: "",
        city: "",
        password: "",
        confirmPassword: ""
    })

    const [errorMessage, setErrorMessage] = useState('')

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)

    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
        setError(false)

    }

    const handleSignup = async (e) => {

        e.preventDefault()
        setLoading(true)

        if (data.password === data.confirmPassword) {

            fetch(`${SERVER_URL}user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(json => {

                    if (json.success) {

                        localStorage.setItem('auth-token', json.authToken)
                        toast.success('Registration Success', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        navigate('/register-face')

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

        } else {
            setErrorMessage(json.error)
            setError(true)
            setLoading(false)
        }

    }

    return (

        <>

            <Header />

            <div className='h-screen bg-slate-100 w-full flex'>

                <form method='POST' onSubmit={handleSignup} className=' p-5 w-full sm:w-[60%] lg:w-[40%] xl:w-[20%] m-auto h-max flex flex-col gap-2'>
                    <div className='font-bold'>Register</div>

                    <input
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Name'
                        name='name'
                        value={data.name}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="email"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Email'
                        name='email'
                        value={data.email}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full '
                        placeholder='DD-MM-YYYY'
                        pattern="\d{2}-\d{2}-\d{4}"
                        name='dob'
                        value={data.dob}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="number"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Height (cms)'
                        name='height'
                        value={data.height}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="number"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Weight (kgs)'
                        name='weight'
                        value={data.weight}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Blood Group'
                        name='bloodGroup'
                        value={data.bloodGroup}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Contact No'
                        name='contactNo'
                        value={data.contactNo}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='City'
                        name='city'
                        value={data.city}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="password"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Password'
                        name='password'
                        value={data.password}
                        onChange={onChange}
                        required
                    />

                    <input
                        type="password"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={onChange}
                        required
                    />

                    {
                        error ?
                            <div className='text-red-600 font-medium animate-pulse text-center'>Password doesn't match</div>
                            : null
                    }

                    {
                        errorMessage ?
                            <div className='text-red-600 font-medium animate-pulse text-center'>{errorMessage}</div>
                            : null
                    }

                    <button
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                    >

                        {loading ? 'Loading...' : 'REGISTER'}

                    </button>

                </form>

            </div>
        </>
    )
}

export default Signup