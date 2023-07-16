import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../services/helper'
import { Link, useNavigate } from 'react-router-dom'

const DoctorLogin = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })
        setError(false)

    }

    const handleLogin = async (e) => {

        e.preventDefault()

        setLoading(true)

        fetch(`${SERVER_URL}doctor/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {

                if (json.success) {

                    localStorage.setItem('doctor-auth-token', json.authToken)

                    navigate('/doctor/home')
                    setLoading(false)

                } else {
                    setError(json.error)
                    setLoading(false)
                }

            })

    }

    useEffect(() => {
        if (localStorage.getItem('doctor-auth-token')) {
            navigate('/doctor/home')
        }
    }, [])

    return (
        <div className='h-screen flex'>

            <form method='POST' onSubmit={handleLogin} className='w-[20%] m-auto h-max flex flex-col gap-2'>

                <div className='font-bold'>Login as Doctor</div>

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
                    type="password"
                    className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                    placeholder='Password'
                    name='password'
                    value={data.password}
                    onChange={onChange}
                    required
                />

                {
                    error ?
                        <div className='text-red-600 font-medium animate-pulse text-center'>{error}</div>
                        : null
                }

                <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                >

                    {loading ? 'Loading...' : 'LOGIN'}

                </button>

                <div className='text-center p-2'>or</div>

                <Link to='/' className='text-center bg-slate-200 py-1 rounded font-medium duration-300 transition-all ease-in-out hover:bg-black hover:text-white'>BACK TO HOME</Link>

            </form>

        </div>
    )
}

export default DoctorLogin