import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import MainContext from '../context/MainContext';

const Header = () => {

    const { myProfile, fetchMyProfile } = useContext(MainContext)

    const navigate = useNavigate()

    const [headerOpen, setHeaderOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

        localStorage.removeItem('auth-token')
        navigate('/login')
        window.location.reload()

    }

    useEffect(() => {

        if (localStorage.getItem('auth-token')) {
            fetchMyProfile()
        }

    }, [localStorage.getItem('auth-token')])

    return (
        <>
            <div className='hidden lg:flex bg-slate-100 items-center top-0 fixed justify-between z-50 px-10 py-5 w-full'>


                <Link to='/' className="flex gap-2 items-center">
                    <img src={logo} alt="" className='w-14' />
                    <div className='font-bold text-lg'>My Medi</div>
                </Link>

                {
                    localStorage.getItem('auth-token') ?

                        <>
                            <div className='flex gap-4 h-full w-max'>

                                <NavLink className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/'>Home</NavLink>

                                <NavLink className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/my-appointment'>My Appointments</NavLink>

                                <NavLink className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/myprofile'>My Profile</NavLink>

                            </div>

                            <button
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                className=''
                            >
                                <Avatar>{myProfile?.name?.slice(0, 1).toUpperCase()}</Avatar>

                            </button>

                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                className='bg-transparent flex flex-col'
                            >

                                <MenuItem>

                                    <button onClick={
                                        () => {
                                            handleClose()
                                            handleLogout()
                                        }
                                    } className='text-black mx-2 rounded w-full flex items-center gap-2'>

                                        <LogoutIcon fontSize="small" />

                                        Logout

                                    </button>

                                </MenuItem>
                            </Menu>
                        </>
                        :
                        <div className='flex gap-2'>
                            <Link to='/login' className='bg-blue-600 px-5 py-1 text-white font-medium rounded'>LOGIN</Link>
                            <Link to='/signup' className='bg-blue-600 px-5 py-1 text-white font-medium rounded'>SIGNUP</Link>
                        </div>

                }

            </div>

            <div className='flex lg:hidden p-5 bg-slate-100 items-center top-0 fixed justify-between z-50 w-full border border-b'>
                <Link to='/' className="flex gap-2 items-center">
                    <img src={logo} alt="" className='w-8' />
                </Link>

                <button onClick={() => {
                    headerOpen ? setHeaderOpen(false) : setHeaderOpen(true)
                }} className='w-max flex flex-col gap-1'>

                    <div className={headerOpen ? 'w-9 border-[3px] border-blue-600 rounded-full duration-300 transition-all rotate-45 translate-y-1' : 'w-9 border-[3px] border-blue-600 rounded-full duration-300 transition-all '}></div>

                    {
                        headerOpen ? null : <div className='w-9 border-[3px] border-blue-600 rounded-full duration-300 transition-all'></div>
                    }


                    <div className={headerOpen ? 'w-9 border-[3px] border-blue-600 rounded-full duration-300 transition-all -rotate-45 -translate-y-1' : 'w-9 border-[3px] border-blue-600 rounded-full duration-300 transition-all'}></div>

                </button>

            </div>

            <div className={headerOpen ? 'flex flex-col lg:hidden pt-24 pb-10 px-10 bg-slate-100 fixed justify-between z-40 w-full shadow-lg duration-300 h-max' : 'flex flex-col lg:hidden p-0 bg-slate-100 fixed justify-between z-40 w-full shadow-lg duration-300 h-0 overflow-hidden'}>


                {
                    localStorage.getItem('auth-token') ?

                        <>
                            <div className='flex flex-col gap-4 h-full w-full'>

                                <NavLink onClick={() => setHeaderOpen(false)} className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/'>Home</NavLink>

                                <NavLink onClick={() => setHeaderOpen(false)} className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/my-appointment'>My Appointments</NavLink>

                                <NavLink onClick={() => setHeaderOpen(false)} className={({ isActive }) => isActive ? 'text-lg font-bold' : 'text-lg'} to='/myprofile'>My Profile</NavLink>

                                <button className='bg-blue-600 px-5 py-1 text-white font-medium rounded w-full'
                                    onClick={
                                        () => {
                                            handleLogout()
                                            setHeaderOpen(false)
                                        }
                                    }
                                >
                                    LOGOUT
                                </button>

                            </div>

                        </>
                        :
                        <div className='flex flex-col gap-2'>
                            <Link to='/login' onClick={() => setHeaderOpen(false)} className='bg-blue-600 px-5 py-1 text-white font-medium rounded text-center'>LOGIN</Link>
                            <Link to='/signup' onClick={() => setHeaderOpen(false)} className='bg-blue-600 px-5 py-1 text-white font-medium rounded text-center'>SIGNUP</Link>
                        </div>

                }

            </div>

        </>
    )
}

export default Header