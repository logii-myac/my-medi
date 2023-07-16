import React from 'react'
import { Navigate } from 'react-router-dom'

function DoctorRoute({ children }) {
    return localStorage.getItem("doctor-auth-token") ? children : <Navigate to="/doctor" />
}

export default DoctorRoute