

import React, { useState } from "react";
import DropdownContainer from "../ReusableComponents/Dropdown/DropdownContainer";
import DropdownTop from "../ReusableComponents/Dropdown/DropdownTop/DropdownTop";
import DropdownOptions from "../ReusableComponents/Dropdown/DropdownOptions/DropdownOptions";

const YearDropdown = ({ currentYear, setCurrentYear }) => {
  const yearsArr = [];

  for (let i = 2020; i < 2050; i++){
    yearsArr.push(i)
  }

  const [optionsOpen, setOptionsOpen] = useState(false);

  function optionSelectHandler(selectedOption) {
    setCurrentYear(selectedOption)
    setOptionsOpen(false)
  }

  return (
    <DropdownContainer>
      <DropdownTop current={currentYear} toggleOptions={() => setOptionsOpen(!optionsOpen)}/>

      {optionsOpen && 
        <DropdownOptions options={yearsArr} optionSelect={optionSelectHandler}/>
      }
    </DropdownContainer>
  );
};

export default YearDropdown;
