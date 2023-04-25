import React, {useState} from "react";

import Dropdown from "../ReusableComponents/Dropdown/Dropdown";

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

      {optionsOpen && 
      
        <div className='optionsContainer'>
          {monthsArr.map((month, idx) => {
            return <p key={idx} onClick={() => monthHandler(month)}>{month}</p>
          })}
        </div>
      }
    </Dropdown>
  );
};

export default MonthDropdown;

