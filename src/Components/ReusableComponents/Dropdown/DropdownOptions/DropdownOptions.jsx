import React from 'react'

import styles from './DropdownOptions.module.css'

const DropdownOptions = ({children}) => {
  return (
    <div className={styles.optionsContainer}>{children}</div>
  )
}

export default DropdownOptions