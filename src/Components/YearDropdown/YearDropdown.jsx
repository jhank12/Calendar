import React, {useState} from "react";

import Dropdown from "../ReusableComponents/Dropdown/Dropdown";
import DropdownOptions from "../ReusableComponents/Dropdown/DropdownOptions/DropdownOptions";

import "E:/Web Development/React Projects/calendar/src/Styles/CommonDropdownStyles.css";

const YearDropdown = ({ currentYear, setCurrentYear}) => {
  
  const [optionsOpen, setOptionsOpen] = useState(false);

  const yearsArr = [];

  // find better way to do year
  for (let i = 2020; i < 2032; i++) {
   yearsArr.push(i)
  }

  function yearHandler(year) {
   console.log(year)
   setCurrentYear(year)
   setOptionsOpen(false)
   // setOptionsOpen(false)
  }
  
  return (
    <Dropdown>
      <div className='dropdownTop' onClick={() => setOptionsOpen(!optionsOpen)}>
        <h1>{currentYear}</h1>
      </div>

      {optionsOpen && 
      
        <DropdownOptions className='optionsContainer'>
          
          {yearsArr.map(year => {
            return <p key={year} onClick={(e) => yearHandler(year)}>{year}</p>
          })}

        </DropdownOptions>
      }
    </Dropdown>
  );
};

export default YearDropdown;