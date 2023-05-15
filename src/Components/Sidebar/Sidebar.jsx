import React from 'react'

import Calendar from '../Calendar/Calendar'

import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>

      <Calendar />

    </div>
  )
}

export default Sidebar