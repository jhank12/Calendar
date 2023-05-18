import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";

import styles from "./CalendarHeader.module.css";

import MonthsRow from "../MonthsRow/MonthsRow";

import NewEventModal from "../NewEventModal/NewEventModal";

import Sidebar from "../Sidebar/Sidebar";

import { Link } from "react-router-dom";

import AccountIcon from "../AccountIcon/AccountIcon";

const CalendarHeader = ({ allEvents }) => {
  const portalDiv = document.getElementById("portalDiv");

  const [isOpen, setIsOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className={styles.calendarHeader}>
      {isOpen &&
        createPortal(<NewEventModal setIsOpen={setIsOpen} />, portalDiv)}

      <MonthsRow events={allEvents} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
        className={styles.hamburgerIcon}
        onClick={() => setSidebarOpen(true)}
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>

      {sidebarOpen &&
        createPortal(
          <Sidebar
            setSidebarOpen={setSidebarOpen}
            setAddEventOpen={setIsOpen}
          />,
          portalDiv
        )}

      <div className={styles.options}>
        <button
          onClick={() => setIsOpen(true)}
          className={`${styles.addEventBtn} mainActionBtn`}
        >
          Add Event
        </button>

        <AccountIcon />
      </div>
    </section>
  );
};

export default CalendarHeader;
