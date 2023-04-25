import React, {useState} from 'react'

import ModalWithOverlay from '../ReusableComponents/ModalWithOverlay/ModalWithOverlay'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const DayEventsModalList = ({events, setModalOpen}) => {

   // change to idx of the clicked event
   const [currentEvent, setCurrentEvent ] = useState(0);

   const [ isOpen, setIsOpen ] = useState(false)
  
   return (
   <ModalWithOverlay setIsOpen={setModalOpen}>

      {events.map(ev => {
        return (
          <div>{JSON.stringify(ev)}</div>
        )
      })}
   </ModalWithOverlay>
  )
}

export default DayEventsModalList