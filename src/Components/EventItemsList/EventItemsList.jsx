import React, { useState } from "react";

import styles from "./EventItemsList.module.css";

import { createPortal } from "react-dom";

import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const EventItemsList = ({ events }) => {
  const [eventModalsOpen, setEventModalsOpen] = useState(false);
  const portalDiv = document.getElementById("portalDiv");

  const [startCount, setStartCount] = useState(0);

  function showEventsModals(startCount) {
    setStartCount(startCount);

    setEventModalsOpen(true);
  }

  return (
    <>
      {eventModalsOpen &&
        createPortal(
          <DayEventsModalList
            setModalOpen={setEventModalsOpen}
            events={events}
            startCount={startCount}
          />,
          portalDiv
        )}

      {events.length > 0 && (
        <div className={styles.eventItemsList}>
          {events.map((ev, idx) => {
            const { tag, id } = ev;

            if (idx <= 2) {
              return (
                <div
                  key={id}
                  onClick={() => showEventsModals(idx)}
                  className={`${styles.eventItem} eventItem-${tag}`}
                >
                  <p className={styles.eventItemText}>{ev.title}</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default EventItemsList;