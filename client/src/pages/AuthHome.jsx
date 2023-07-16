import React, { useEffect, useState } from 'react'
import DoctorView from '../components/DoctorView'
import Header from '../components/Header'
import { SERVER_URL} from '../services/helper'

const AuthHome = () => {

    const [doctorList, setDoctorList] = useState([])

    const fetchDoctors = () => {

        fetch(`${SERVER_URL}doctor/user-get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then(json => {
                setDoctorList(json)
            })
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    return (
        <>
            <Header />

            <div className="min-h-screen max-h-max bg-slate-100 w-full flex flex-col gap-5 items-center px-5 py-28 md:px-20 md:py-36">

                {
                    doctorList && doctorList?.map((data) => {
                        return (
                            <DoctorView key={data._id} data={data} />
                        )
                    })
                }


            </div>
        </>
    )
}

export default AuthHome