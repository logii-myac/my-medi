import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import MedicationIcon from '@mui/icons-material/Medication';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';



const SidebarDoctor = () => {

    const navigate = useNavigate()

    const handleLogout = () => {

        navigate('/doctor')
        localStorage.removeItem('doctor-auth-token')

    }

    return (
        <div className='w-max flex flex-col duration-300 gap-2 bg-black text-white p-5'>

            <div className='font-bold text-xl'>Doctors Panel</div>

            <NavLink to='/doctor/home' className={({ isActive }) => isActive ? 'w-full h-max flex gap-2 items-center bg-white p-2 text-black font-medium rounded' : 'w-full h-max flex gap-2 items-center p-2 text-white rounded'}>
                <MedicationIcon />
                <div>Manage Appointment</div>
            </NavLink>

            <button onClick={handleLogout} className='w-full h-max flex gap-2 items-center p-2 text-white hover:bg-white hover:text-black duration-300 rounded '>
                <LogoutIcon />
                <div>Logout</div>
            </button>

        </div>
    )
}

export default SidebarDoctor