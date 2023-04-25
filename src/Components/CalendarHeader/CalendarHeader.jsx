import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";

import styles from "./CalendarHeader.module.css";

import MonthsRow from "../MonthsRow/MonthsRow";

import NewEventModal from "../NewEventModal/NewEventModal";

import { AuthContext } from "../../Contexts/AuthContext";

import { Link } from "react-router-dom";

const CalendarHeader = ({ monthDays, allEvents }) => {
  const portalDiv = document.getElementById("portalDiv");

  const [isOpen, setIsOpen] = useState(false);

  const { signout } = useContext(AuthContext);

  return (
    <section className={styles.calendarHeader}>
      {isOpen &&
        createPortal(<NewEventModal setIsOpen={setIsOpen} />, portalDiv)}

      <MonthsRow monthDays={monthDays} events={allEvents} />

      <div className={styles.optionsContainer}>
        <button
          onClick={() => setIsOpen(true)}
          className={`${styles.addEventBtn} mainActionBtn`}
        >
          Add Event
        </button>
        <Link to="/account">
          <div className={styles.accountIcon}></div>
        </Link>
      </div>
    </section>
  );
};

export default CalendarHeader;
