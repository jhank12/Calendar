// import React from 'react'

// import styles from './DropdownOptions.module.css'

// const DropdownOptions = ({children, className = ''}) => {
//   console.log(...className)
//   return (
//     <div className={[...className]}>{children}</div>
//   )
// }

// export default DropdownOptions


import React from 'react'
import styles from './DropdownOptions.module.css';

const DropdownOptions = ({options, optionSelect}) => {
  
  return (
    <div className={styles.dropdownOptions}>
      {/* {JSON.stringify(options)} */}
      
      {options.map(option => {
        return <p onClick={() => optionSelect(option)}>{option}</p>
      })}

    </div>
  )
}
  

export default DropdownOptions