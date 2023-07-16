import React, { useEffect, useState } from 'react'
import SideNavAdmin from '../../components/SideNavAdmin'
import DeleteIcon from '@mui/icons-material/Delete';
import { ADMIN_AUTH_TOKEN, SERVER_URL } from './../../services/helper';

const User = (props) => {

  const { name, email, _id, contactNo, city } = props.data

  return (
    <>
      <div className='w-full h-max flex items-center justify-between bg-slate-200 p-5 hover:bg-slate-800 hover:text-white duration-300 transition-all ease-in-out hover:shadow-lg rounded-lg'>

        <div className='flex gap-5 items-center w-full'>

          <div className='text-xl font-bold'>Name : {name}</div>
          <div className='text-lg font-medium'>Email : {email}</div>
          <div className='font-medium text-slate-400'>ID : {_id}</div>
          <div className='font-medium text-slate-400'>Contact No : {contactNo}</div>
          <div className='font-medium text-slate-400'>City : {city}</div>

        </div>

      </div>
    </>
  )

}

const AdminUser = () => {

  const [userList, setUserList] = useState([])

  const fetchUser = () => {

    fetch(`${SERVER_URL}user/admin-fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-auth-token': ADMIN_AUTH_TOKEN
      }
    })
      .then(res => res.json())
      .then(json => {
        setUserList(json)
      })

  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='h-screen flex'>

      <SideNavAdmin />

      <div className='h-screen w-full flex flex-col gap-2 p-6'>

        <div className="text-lg font-medium">Manage Users</div>

        <div className='w-full flex flex-col gap-5 m-2 overflow-x-auto'>

          {
            userList.map((data) => {
              return (
                <User key={data._id} data={data} />
              )
            })
          }

        </div>

      </div>

    </div>
  )
}

export default AdminUser