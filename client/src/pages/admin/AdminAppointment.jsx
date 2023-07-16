import React, { useEffect, useState } from 'react'
import SideNavAdmin from '../../components/SideNavAdmin'
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVER_URL } from './../../services/helper';

const Appointment = (props) => {

    const { _id, userID, doctorID, time, timeAssinged, status, isChecked } = props.data

    return (
        <div className='w-full h-max flex items-center justify-between bg-slate-200 p-5 hover:bg-slate-800 hover:text-white duration-300 transition-all ease-in-out hover:shadow-lg rounded-lg'>

            <div className='flex gap-5 items-center w-full'>

                <div className='font-medium'>ID : {_id}</div>
                <div className='font-medium'>User ID : {userID}</div>
                <div className='font-medium'>Doctor ID : {doctorID}</div>
                <div className='font-medium'>Status : {status}</div>
                <div className='font-medium'>Date : {time?.slice(0, 10)}</div>
                <div className='font-medium'>Time : {timeAssinged}</div>

                <div className={isChecked ? 'bg-green-600 p-1 rounded-full' : 'bg-red-500 p-1 rounded-full'}></div>

            </div>

        </div >
    )

}

const AdminAppointment = () => {

    const [dataList, setDataList] = useState([])

    const fetchAppointment = () => {
        fetch(`${SERVER_URL}appointment/admin-fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-auth-token': localStorage.getItem('admin-auth-token')
            }
        })
            .then(res => res.json())
            .then(json => setDataList(json))
    }

    useEffect(() => {
        fetchAppointment()
    }, [])

    return (
        <div className='h-screen flex'>

            <SideNavAdmin />

            <div className='h-screen w-full flex flex-col gap-2 p-6'>

                <div className="text-lg font-medium">Manage Appointments</div>

                <div className='w-full flex flex-col gap-5 m-2 overflow-x-auto'>

                    {
                        dataList?.map((data) => {
                            return (
                                <Appointment key={data._id} data={data} />
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}

export default AdminAppointment