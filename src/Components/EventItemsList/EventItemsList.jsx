import React, { useState } from "react";

import styles from "./EventItemsList.module.css";

import { createPortal } from "react-dom";

import DayEventsModalList from "../DayEventsModalList/DayEventsModalList";

const EventItemsList = ({ events }) => {
  const [eventModalsOpen, setEventModalsOpen] = useState(false);
  const portalDiv = document.getElementById("portalDiv");
  const [ day, setDay ] = useState(null)

  const [ dayEvents, setDayEvents ] = useState(null)

  function showEventsModals(events) {
   console.log(events)

   setDayEvents(events)
   setEventModalsOpen(true)
  }

  return (
    <>

      {eventModalsOpen && 
      
         createPortal(<DayEventsModalList setModalOpen={setEventModalsOpen} events={events} />, portalDiv)
      }

      <div className={styles.eventItemsList}>
        {events &&
          events.map((ev) => {
            const { tag, id, day } = ev;

            return (
              <div key={id} onClick={() => showEventsModals(events)} className={`${styles.eventItem} eventItem-${tag}`}>
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
