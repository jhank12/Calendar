import React from 'react'
import styles from './ModalContainer.module.css'

const ModalContainer = ({children}) => {
  return (
    <div className={styles.loginSignup}>
      {children}
    </div>
  )
}

export default ModalContainer