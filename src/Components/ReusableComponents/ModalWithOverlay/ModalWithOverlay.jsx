import React from 'react'

import styles from './ModalWithOverlay.module.css';
import ModalContainer from '../ModalContainer/ModalContainer';

const ModalWithOverlay = ({children, setIsOpen}) => {
  return (
    <div className={styles.modalOverlay} 
    onClick={(e) => {
      console.log(e.target.className)
      if(e.target.className == styles.modalOverlay) {
         setIsOpen(false)
      } else {
         return
      }
    }}
    >
      <ModalContainer>
         {children}
      </ModalContainer>
    </div>
  )
}

export default ModalWithOverlay