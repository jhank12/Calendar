import React, {useState} from "react";

import Dropdown from "../ReusableComponents/Dropdown/Dropdown";
import DropdownOptions from "../ReusableComponents/Dropdown/DropdownOptions/DropdownOptions";

import "E:/Web Development/React Projects/calendar/src/Styles/CommonDropdownStyles.css";

const MonthDropdown = ({ currentMonth, setMonthCounter, monthsArr }) => {
  
  const [optionsOpen, setOptionsOpen] = useState(false)

  function monthHandler(month){
    setMonthCounter(monthsArr.indexOf(month))
    setOptionsOpen(false)
  }
  
  return (
    <Dropdown>

      <div className='dropdownTop' onClick={() => setOptionsOpen(!optionsOpen)}>
        <h1>{currentMonth}</h1>
      </div>

      {/* change dropdown styling to semi transparent with bg blur */}

      {optionsOpen && 
      
        <DropdownOptions className='optionsContainer'>
          {monthsArr.map((month, idx) => {
            return <p key={idx} onClick={() => monthHandler(month)}>{month}</p>
          })}
        </DropdownOptions>
      }
    </Dropdown>
  );
};

export default MonthDropdown;