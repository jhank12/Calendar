import React, { useState } from "react";

import Dropdown from "../ReusableComponents/Dropdown/Dropdown";
import DropdownOptions from "../ReusableComponents/Dropdown/DropdownOptions/DropdownOptions";

import "E:/Web Development/React Projects/calendar/src/Styles/CommonDropdownStyles.css";

const MonthDropdown = ({ currentMonth, setMonthCounter, monthsArr }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  function monthHandler(monthNum) {
    setMonthCounter(monthNum);
    setOptionsOpen(false);
  }

  return (
    <Dropdown>
      <div className="dropdownTop" onClick={() => setOptionsOpen(!optionsOpen)}>
        <h1>{currentMonth}</h1>
      </div>


      {
        optionsOpen && (
          <DropdownOptions className={["optionsContainer monthOptions"]}>
            {monthsArr.map((month, idx) => {
              return (
                <p
                  key={idx}
                  onClick={() => monthHandler(monthsArr.indexOf(month))}
                >
                  {month}
                </p>
              );
            })}
          </DropdownOptions>
        )
 
      }
    </Dropdown>
  );
};

export default MonthDropdown;
