import { useState } from 'react'

import './App.css'

import Home from './Components/Pages/Home/Home'
import Login from './Components/Pages/Login/Login'
import Signup from './Components/Pages/Signup/Signup'
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword'
import Account from './Components/Pages/Account/Account'
import { AuthContextProvider } from './Contexts/AuthContext'

import { Routes, Route, Link } from 'react-router-dom'

function App() {

  return (

    // maybe put context one level below
    <AuthContextProvider>

    <main>
      {/* have react router with login, signup, home */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/account' element={<Account />} />



        <Route path='/home' element={<Home />} />

      </Routes>
    </main>
    </AuthContextProvider>
  )
}

export default App
