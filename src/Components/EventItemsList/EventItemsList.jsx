import React, { useState } from "react";

import styles from "./EventItemsList.module.css";

import { createPortal } from "react-dom";

import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const EventItemsList = ({ events }) => {
  const [eventModalsOpen, setEventModalsOpen] = useState(false);
  const portalDiv = document.getElementById("portalDiv");
  const [day, setDay] = useState(null);

  const [dayEvents, setDayEvents] = useState(null);

  const [startCount, setStartCount] = useState(0)

  function showEventsModals(events, startCount) {
    console.log(events);
    console.log('event item',startCount)

    setDayEvents(events);
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

      <div className={styles.eventItemsList}>
        {events &&
          events.map((ev, idx) => {
            const { tag, id, day } = ev;

            return (
              <div
                key={id}
                onClick={() => showEventsModals(events, idx)}
                className={`${styles.eventItem} eventItem-${tag}`}
              >
                <p>
                  {ev.title} {ev.date} {ev.tag}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default EventItemsList;
