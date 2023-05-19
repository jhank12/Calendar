import React from 'react'
import styles from './DropdownContainer.module.css'
const DropdownContainer = ({children}) => {
  return (
    <div className={styles.dropdownContainer}>{children}</div>
  )
}

export default DropdownContainer