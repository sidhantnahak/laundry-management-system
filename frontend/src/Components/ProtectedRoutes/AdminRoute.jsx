import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const Protected2 = ({ isAdmin }) => {

  const { user, loading,isAuthenticated } = useSelector(state => state.user);
  useEffect(() => {

  }, [user])

  if (user && (user.role === "admin" && isAdmin) && loading===false) {
    return <Outlet />

  }
  if(isAuthenticated===false && loading ===false){
    return <Navigate to='/login' />

  }






}

export default Protected2