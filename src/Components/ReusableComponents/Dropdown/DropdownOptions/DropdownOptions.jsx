import React from 'react'

import styles from './DropdownOptions.module.css'

const DropdownOptions = ({children, className}) => {
  console.log(...className)
  return (
    <div className={[...className]}>{children}</div>
  )
}

export default DropdownOptions