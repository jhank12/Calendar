import React, { useState } from "react";

import DropdownContainer from "../ReusableComponents/Dropdown/DropdownContainer";
import DropdownOptions from "../ReusableComponents/Dropdown/DropdownOptions/DropdownOptions";
import DropdownTop from "../ReusableComponents/Dropdown/DropdownTop/DropdownTop";

const MonthDropdown = ({ currentMonth, setMonthCounter, monthsArr }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  function optionSelectHandler(selectedOption) {
    setMonthCounter(monthsArr.indexOf(selectedOption));
    setOptionsOpen(false);
  }

  return (
    <DropdownContainer>
      <DropdownTop
        current={currentMonth}
        toggleOptions={() => setOptionsOpen(!optionsOpen)}
      />

      {optionsOpen && (
        <DropdownOptions
          options={monthsArr}
          optionSelect={optionSelectHandler}
        />
      )}
    </DropdownContainer>
  );
};

export default MonthDropdown;
