import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return user !== null 
  && user.isAdmin ? <Outlet/> 
  :<Navigate to="/login" replace />;


}

export default AdminRoutes



