


import React from 'react'
import styles from './DropdownOptions.module.css';

const DropdownOptions = ({options, optionSelect}) => {
  
  return (
    <div className={styles.dropdownOptions}>
      
      {options.map(option => {
        return <p onClick={() => optionSelect(option)}>{option}</p>
      })}

    </div>
  )
}
  

export default DropdownOptions