import React from 'react'

import styles from './ModalOverlay.module.css'

const ModalOverlay = ({children, onClick}) => {
  return (
   <div className={styles.modalOverlay}
   onClick={(e) => {
      if (e.target.className == styles.modalOverlay) {
        onClick();
      } else {
        return;
      }
    }}>
      {children}
   </div>
  )
}

export default ModalOverlay