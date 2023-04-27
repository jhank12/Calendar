import React, { useState } from "react";

import styles from "./DayEventsModalList.module.css";

import ModalWithOverlay from "../ReusableComponents/ModalWithOverlay/ModalWithOverlay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import DayEventModal from "../DayEventModal/DayEventModal";
import ModalOverlay from "../ReusableComponents/ModalOverlay/ModalOverlay";
import EventModal from "../EventModal/EventModal";

const DayEventsModalList = ({ events, setModalOpen }) => {
  // change to idx of the clicked event
  const [eventCounter, setEventCounter] = useState(0);
  console.log(events.length)
  function increment() {
    if (eventCounter == events.length - 1) {
      return;
    } else {
      setEventCounter((count) => count + 1);
    }
  }

  function decrement() {
    if (eventCounter == 0) {
      return;
    } else {
      setEventCounter((count) => count - 1);
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalOverlay setIsOpen={setIsOpen} onClick={() => setModalOpen(false)}>
      <EventModal onClick={setEventCounter} setModalOpen={setModalOpen} events={events} eventCounter={eventCounter} increment={increment} decrement={decrement} event={events[eventCounter]} />
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
