import React from 'react'
import styles from './LabelInputWrap.module.css'

const LabelInputWrap = ({children}) => {
  return (
    <div className={styles.labelInputWrap}>{children}</div>
  )
}

export default LabelInputWrap