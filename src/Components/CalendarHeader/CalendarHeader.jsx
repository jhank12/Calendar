import React, { useState } from "react";
import { createPortal } from "react-dom";

import styles from "./CalendarHeader.module.css";

import MonthsRow from "../MonthsRow/MonthsRow";

import NewEventModal from "../NewEventModal/NewEventModal";


import { Link } from "react-router-dom";

const CalendarHeader = ({ allEvents }) => {
  const portalDiv = document.getElementById("portalDiv");

  const [isOpen, setIsOpen] = useState(false);


  return (
    <section className={styles.calendarHeader}>
      {isOpen &&
        createPortal(<NewEventModal setIsOpen={setIsOpen} />, portalDiv)}

      <MonthsRow events={allEvents} />

      <div className={styles.optionsContainer}>
        <button
          onClick={() => setIsOpen(true)}
          className={`${styles.addEventBtn} mainActionBtn`}
        >
          Add Event
        </button>
        <Link to="/account">
          <div className={styles.accountIcon} ></div>
        </Link>
      </div>
    </section>
  );
};

export default CalendarHeader;