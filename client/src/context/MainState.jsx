import React, { useState } from 'react'
import MainContext from './MainContext'
import { ADMIN_AUTH_TOKEN, SERVER_URL} from '../services/helper'

const MainState = (props) => {

    const [doctorList, setDoctorList] = useState([])

    const fetchDoctors = () => {

        fetch(`${SERVER_URL}doctor/admin-get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-auth-token': ADMIN_AUTH_TOKEN
            }
        })
            .then(res => res.json())
            .then(json => setDoctorList(json))

    }

    const [myProfile, setMyProfile] = useState({})

    const fetchMyProfile = () => {

        fetch(`${SERVER_URL}user/user-fetch-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setMyProfile(json))
    }

    return (
        <MainContext.Provider value={{
            doctorList,
            fetchDoctors,
            myProfile,
            fetchMyProfile
        }}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainState