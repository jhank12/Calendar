import React from 'react'
import styles from './ModalContainer.module.css'

const ModalContainer = ({children, className}) => {
  console.log(className)
  return (
    <div className={`${styles.loginSignup} ${className}`}>
      {children}
    </div>
  )
}

export default ModalContainer