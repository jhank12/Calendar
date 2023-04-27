import React, { useState } from "react";

import styles from "./DayEventsModalList.module.css";

import ModalWithOverlay from "../ReusableComponents/ModalWithOverlay/ModalWithOverlay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import DayEventModal from "../DayEventModal/DayEventModal";
import ModalOverlay from "../ReusableComponents/ModalOverlay/ModalOverlay";
import EventModal from "../EventModal/EventModal";

const DayEventsModalList = ({ events, setModalOpen, startCount }) => {
  // change to idx of the clicked event
  console.log(startCount)
  const [eventCounter, setEventCounter] = useState(startCount);
  
  function increment() {
    if (eventCounter == events.length - 1) {
      setEventCounter(0)
    } else {
      setEventCounter((count) => count + 1);
    }
  }

  function decrement() {
    if (eventCounter == 0) {
      setEventCounter(events.length - 1)

    } else {
      setEventCounter((count) => count - 1);
    }
  }



  return (
    <ModalOverlay onClick={() => setModalOpen(false)}>
      {events.map((event, idx) => {
        if(idx === eventCounter) {
          return <EventModal idx={idx} event={event} eventsLength={events.length} setModalOpen={setModalOpen} increment={increment} decrement={decrement}/>

        }
      })}
      {/* <EventModal setModalOpen={setModalOpen} events={events} eventCounter={eventCounter} increment={increment} decrement={decrement} event={events[eventCounter]} /> */}
    </ModalOverlay>
  );

  // have counter
  // send in event that matches counter

  //  return (
  //  <div className={styles.overlay} onClick={() => setModalOpen(false)}>
  //     {events.map(ev => {
  //       console.log(ev)
  //       return (
  //         // <DayEventModal event={ev}/>

  //         // modals are on top of each other

  //         <div className={styles.eventViewModal}>{ev.title}</div>

  //       )
  //     })}
  //  </div>
  // )
};

export default DayEventsModalList;
