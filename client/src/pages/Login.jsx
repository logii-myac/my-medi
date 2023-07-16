import React, { useState } from 'react'
import { SERVER_URL } from '../services/helper'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)

    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleLogin = async (e) => {

        e.preventDefault()

        setLoading(true)

        fetch(`${SERVER_URL}user/authenticate`, {
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

                    toast.success('Login Success', {
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
                    setErrorMessage(json.error)
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

    return (
        <>

            <Header />

            <div className='h-screen bg-slate-100 w-full flex'>

                <form method='POST' onSubmit={handleLogin} className=' p-5 w-full sm:w-[60%] lg:w-[40%] xl:w-[20%] m-auto h-max flex flex-col gap-2'>

                    <div className='font-bold'>Login</div>

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
                        errorMessage ?
                            <div className='text-red-600 font-medium animate-pulse text-center'>{errorMessage}</div>
                            : null
                    }

                    <button
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                    >

                        {loading ? 'Loading...' : 'LOGIN'}

                    </button>

                    <div className='text-center p-2'>or</div>

                    <div className='flex flex-col gap-2'>

                        <Link to='/doctor' className='text-center bg-slate-200 py-1 rounded font-medium duration-300 transition-all ease-in-out hover:bg-black hover:text-white'>DOCTOR LOGIN</Link>
                        <Link to='/admin' className='text-center bg-slate-200 py-1 rounded font-medium duration-300 transition-all ease-in-out hover:bg-black hover:text-white'>ADMIN LOGIN</Link>

                    </div>

                </form>

            </div>
        </>
    )
}

export default Login