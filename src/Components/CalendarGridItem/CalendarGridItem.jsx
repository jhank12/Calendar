import React, { useState, useEffect } from "react";
import styles from "./CalendarGridItem.module.css";

import EventItemsList from "../EventItemsList/EventItemsList";
import { createPortal } from "react-dom";
import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const CalendarGridItem = ({ dayData, idx }) => {
  const portalDiv = document.getElementById("portalDiv");

  const [modalOpen, setModalOpen] = useState(false);

  const [ isMobile, setIsMobile ] = useState(false)

  function checkSize() {
    if (window.innerWidth <= 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    window.addEventListener("resize", checkSize);
  }, []);

  function openEvents() {
    if (dayData.events.length > 0 && isMobile) {
      setModalOpen(true);
    } else {
      return;
    }
  }


  return (
    <>
      {modalOpen &&
        createPortal(
          <DayEventsModalList
            setModalOpen={setModalOpen}
            events={dayData.events}
          />,
          portalDiv
        )}

      <div
        className={`${styles.calendarGridItem} day-${
          dayData.events.length > 0 ? dayData.events[0].tag : ""
        } ${dayData.inCurrentMonth ? 'dayInMonth' : 'notInMonth'}`}
        onClick={openEvents}

        key={idx}
      >
        <p>{dayData.day}</p>
        <EventItemsList events={dayData.events} />
      </div>
    </>
  );
};

export default CalendarGridItem;