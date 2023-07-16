import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
    return localStorage.getItem("admin-auth-token") ? children : <Navigate to="/admin" />
}

export default AdminRoute