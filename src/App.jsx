import { useState, useContext } from 'react'

import './App.css'

import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login/Login'
import Signup from './Components/Pages/Signup/Signup'
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword'
import Account from './Components/Pages/Account/Account'
import { AuthContextProvider } from './Contexts/AuthContext'
import { AuthContext } from './Contexts/AuthContext'

import { Routes, Route, Link } from 'react-router-dom'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'

function App() {



  return (

    // maybe put context one level below
    <AuthContextProvider>

    <main>
      {/* have react router with login, signup, home */}
      <Routes>
        <Route path='/*' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} exact/>
          <Route path='/account' element={<Account />} />

        </Route>


      </Routes>
    </main>
    </AuthContextProvider>
  )
}

export default App
