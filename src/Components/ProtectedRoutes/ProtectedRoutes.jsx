import React from 'react'

import { useContext } from 'react'

import { Outlet, Routes, Navigate } from 'react-router-dom'

import { AuthContext } from '../../Contexts/AuthContext'

import Login from '../Pages/Login/Login'

const ProtectedRoutes = () => {
   
   const {currentUser} = useContext(AuthContext)
  
   return (
      <>
      
         {currentUser ? <Outlet/> : <h2>Not Logged In</h2>}
      </>
  )
}

export default ProtectedRoutes