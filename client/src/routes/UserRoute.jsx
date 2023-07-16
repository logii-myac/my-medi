import React from 'react'
import { Navigate } from 'react-router-dom'

function UserRoute({ children }) {
    return localStorage.getItem("auth-token") ? children : <Navigate to="/welcome" />
}

export default UserRoute