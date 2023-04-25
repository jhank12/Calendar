import React from 'react'

import styles from './Modal.module.css'

import ModalContainer from '../ModalContainer/ModalContainer'

const Modal = ({children}) => {
  return (
    <div className={styles.modalOverlay}>
      <ModalContainer>
         {children}
      </ModalContainer>
    </div>
  )
}

export default Modal