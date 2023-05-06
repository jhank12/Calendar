import React, { useState } from "react";

import styles from "./EventItemsList.module.css";

import { createPortal } from "react-dom";

import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const EventItemsList = ({ events }) => {
  const [eventModalsOpen, setEventModalsOpen] = useState(false);
  const portalDiv = document.getElementById("portalDiv");
  const [day, setDay] = useState(null);

  const [dayEvents, setDayEvents] = useState(null);

  const [startCount, setStartCount] = useState(0);

  function showEventsModals(events, startCount) {
    setDayEvents(events);
    setStartCount(startCount);

    setEventModalsOpen(true);
  }

  console.log(events, events.length)

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

      {/* figure out how to hide things on certain screen sizes */}
      {events.length > 0 && 
      <div className={styles.eventItemsList}>
          {events.map((ev, idx) => {
            const { tag, id, day } = ev;

            // only allows three to be shown
            if (idx <= 2) {
              return (
                <div
                  key={id}
                  onClick={() => showEventsModals(events, idx)}
                  className={`${styles.eventItem} eventItem-${tag}`}
                >
                  <p className={styles.eventItemText}>
                    {ev.title} {ev.date} {ev.tag}
                  </p>
                </div>
              );
            }
          })}
      </div>
      }
      
    </>
  );
};

export default EventItemsList;
