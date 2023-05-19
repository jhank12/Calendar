import React from 'react'
import styles from './DropdownTop.module.css';

const DropdownTop = ({current, toggleOptions}) => {
  return (
    <div className={styles.dropdownTop} onClick={() => toggleOptions()}><h1>{current}</h1></div>
  )
}

export default DropdownTop