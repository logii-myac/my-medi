import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {

        if (localStorage.getItem('auth-token')) {
            navigate('/')
        }

    }, [])

    return (
        <>

            <Header />

            <div className='h-screen bg-slate-100 flex items-center justify-center'>

                <div className="flex flex-col gap-3 px-5">

                    <div className='flex flex-col sm:flex-row gap-1 sm:text-3xl text-4xl font-bold sm:mx-auto'><p className='text-blue-700'>My Medi</p><p className='sm:text-3xl text-lg'>your won medical assistant</p> </div>

                    <div className='text-sm sm:mx-auto'>easing the process in the field of medical interaction</div>

                    <div className='flex flex-col justify-center sm:flex-row gap-3 font-bold w-full'>
                        <Link to='/login' className='bg-white border border-blue-700 py-1 w-full sm:w-[120px] rounded text-center'>LOGIN</Link>
                        <Link to='/signup' className='bg-blue-700 text-white py-1 w-full sm:w-[120px] rounded text-center'>REGISTER</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home