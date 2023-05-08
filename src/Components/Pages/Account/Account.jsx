import React from 'react'

import { AuthContext } from '../../../Contexts/AuthContext'

import { useContext } from 'react'
const Account = () => {
  
  const { signout } = useContext(AuthContext)

  return (
    <div>Account

      <button onClick={signout}>Sign Out</button>
    </div>
  )
}

export default Account