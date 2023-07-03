import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {

    const { isAuthenticated ,loading} = useSelector(state => state.user);
    useEffect(() => {

    }, [isAuthenticated])

    if (isAuthenticated) {
      return <Outlet/>

    }
    if(isAuthenticated===false && loading ===false){
      return <Navigate to='/login' />

    }


  
   
}

export default Protected