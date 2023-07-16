import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import MedicationIcon from '@mui/icons-material/Medication';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';


const SideNavAdmin = () => {

    const navigate = useNavigate()

    const handleAdminLogout = () => {

        navigate('/admin')
        localStorage.removeItem('admin-auth-token')

    }

    return (
        <div className='w-max flex flex-col duration-300 gap-2 bg-black text-white p-5'>

            <div className='font-bold text-xl'>Admin Panel</div>

            <NavLink to='/admin/home' className={({ isActive }) => isActive ? 'w-full h-max flex gap-2 items-center bg-white p-2 text-black font-medium rounded' : 'w-full h-max flex gap-2 items-center p-2 text-white rounded'}>
                <MedicationIcon />
                <div>Manage Doctors</div>
            </NavLink>

            <NavLink to='/admin/users' className={({ isActive }) => isActive ? 'w-full h-max flex gap-2 items-center bg-white p-2 text-black font-medium rounded' : 'w-full h-max flex gap-2 items-center p-2 text-white rounded'}>
                <ManageAccountsIcon />
                <div>Manage Users</div>
            </NavLink>

            <NavLink to='/admin/appointments' className={({ isActive }) => isActive ? 'w-full h-max flex gap-2 items-center bg-white p-2 text-black font-medium rounded' : 'w-full h-max flex gap-2 items-center p-2 text-white rounded'}>
                <SummarizeIcon />
                <div>Manage Appointments</div>
            </NavLink>

            <button onClick={handleAdminLogout} className='w-full h-max flex gap-2 items-center p-2 text-white hover:bg-white hover:text-black duration-300 rounded '>
                <LogoutIcon />
                <div>Logout</div>
            </button>

        </div>
    )
}

export default SideNavAdmin