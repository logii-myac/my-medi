import React, { useContext, useEffect, useState } from 'react'
import SideNavAdmin from '../../components/SideNavAdmin'
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVER_URL } from './../../services/helper';
import MainContext from './../../context/MainContext';

const Doctor = (props) => {

    const { _id, name, email, type, city } = props.data;

    const { fetchDoctors } = useContext(MainContext)

    const handleDelete = () => {

        fetch(`${SERVER_URL}doctor/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-auth-token': localStorage.getItem('admin-auth-token')
            },
            body: JSON.stringify({ id: _id })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    fetchDoctors()
                }
            })

    }

    return (
        <div className='w-full h-max bg-white p-5 rounded-lg flex flex-col gap-1'>
            <div className='text-xl font-bold'>Dr {name}</div>
            <div className='text-lg font-medium'>{email}</div>
            <div className='font-medium text-slate-600'>{city}</div>
            <div className='font-medium text-slate-600'>{type}</div>
            <button onClick={handleDelete} className='bg-red-600 text-white p-1 rounded'><DeleteIcon /></button>
        </div>
    )

}

const AdminHome = () => {

    const [loading, setLoading] = useState(false)

    const { doctorList,
        fetchDoctors } = useContext(MainContext)

    const [error, setError] = useState('')

    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        city: '',
        type: ''
    })

    const handleAddDoctor = (e) => {

        e.preventDefault()

        fetch(`${SERVER_URL}doctor/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-auth-token': localStorage.getItem('admin-auth-token')
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {

                    fetchDoctors()
                    setData({
                        email: '',
                        password: '',
                        name: '',
                        city: '',
                        type: ''
                    })

                } else {
                    setError(json.error)
                }
            })

    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    return (
        <div className='h-screen flex'>

            <SideNavAdmin />

            <div className='h-screen w-full flex gap-5 p-6'>

                <form onSubmit={handleAddDoctor} method='POST' className='w-[50%] h-full flex flex-col gap-2 bg-slate-200 p-5 rounded-lg'>

                    <div className='font-medium text-lg'>
                        Add Doctor
                    </div>

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
                        type="password"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='Password'
                        name='password'
                        value={data.password}
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
                        type="text"
                        className='bg-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                        placeholder='type'
                        name='type'
                        value={data.type}
                        onChange={onChange}
                        required
                    />

                    {
                        error ? <div className='text-sm'>{error}</div> : null
                    }

                    <button
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 font-bold text-white py-1 px-3 rounded outline outline-1 outline-slate-400 focus:outline-black transition-all ease-in-out duration-300 w-full'
                    >

                        {loading ? 'Loading...' : 'ADD DOCTOR'}

                    </button>

                    <div className='text-slate-500'>Note : Please add a doctor and provide them the password so they can manage their appointments.</div>

                </form>

                <div className='h-full w-[50%] bg-slate-200 p-5 flex flex-col gap-5 rounded-lg'>

                    <div className='font-medium text-lg'>DOCTORS</div>

                    <div className='flex flex-col gap-2 h-full overflow-y-auto'>


                        {
                            doctorList?.map((data) => {
                                return (
                                    <Doctor key={data._id} data={data} />
                                )
                            })
                        }


                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminHome