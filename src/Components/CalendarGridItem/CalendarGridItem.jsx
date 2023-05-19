import React, { useState } from "react";
import styles from "./CalendarGridItem.module.css";

import EventItemsList from "../EventItemsList/EventItemsList";
import { createPortal } from "react-dom";
import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const CalendarGridItem = ({ dayData, isMobile }) => {
  const portalDiv = document.getElementById("portalDiv");

  const [modalOpen, setModalOpen] = useState(false);

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
      >
        <p>{dayData.day}</p>
        <EventItemsList events={dayData.events} />
      </div>
    </>
  );
};

export default CalendarGridItem;