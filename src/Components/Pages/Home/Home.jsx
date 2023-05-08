import React, {useEffect} from 'react'

import Calendar from '../../Calendar/Calendar'

import { useContext } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext'

import { db } from '../../../firebase/config'

import { onSnapshot, getDoc, doc } from 'firebase/firestore'

import { setAllEvents } from '../../../Redux/Slices/EventReducer'

import { useDispatch } from 'react-redux'

const Home = () => {

  const dispatch = useDispatch();

  const {currentUser} = useContext(AuthContext)

  function getUserData(){
    onSnapshot(doc(db, "users", currentUser.uid), doc => {
      // if(doc.data().events.length > 0) {
        console.log(currentUser.email)
        dispatch(setAllEvents([]))
        dispatch(setAllEvents(doc.data().events))
      // }
    })
  }

  useEffect(() => {
    console.log('rendered')
    getUserData()

  }, [])

  // maybe get rid of home component

  return (
   <>
      <Calendar currentUser={currentUser}/>
   </>

  )
}

export default Home
   