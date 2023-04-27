import React from 'react'

import ModalContainer from '../ReusableComponents/ModalContainer/ModalContainer'


const DayEventModal = ({event}) => {
  return (
   <ModalContainer>
      <h3>{event.title}</h3>
   </ModalContainer>
  )
}

export default DayEventModal