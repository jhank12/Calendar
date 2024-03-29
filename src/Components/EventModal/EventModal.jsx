import React, { useContext } from "react";

import styles from "./EventModal.module.css";

import LabelInputWrap from "../ReusableComponents/LabelInputWrap/LabelInputWrap";
import ModalContainer from "../ReusableComponents/ModalContainer/ModalContainer";

import { useSelector } from "react-redux";

import { updateDoc, doc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { AuthContext } from "../../Contexts/AuthContext";

const EventModal = ({
  event,
  eventsLength,
  increment,
  decrement,
  setModalOpen,
  idx,
}) => {
  const { currentUser } = useContext(AuthContext);

  const allEvents = useSelector((state) => state.userEvents.value.allEvents);

  const docRef = doc(db, "users", currentUser.uid);

  const eventCopy = { ...event };

  function removeEventHandler() {
    const filteredEvents = allEvents.filter((ev) => {
      return ev.id !== eventCopy.id;
    });

    updateDoc(docRef, {
      email: currentUser.email,
      events: [...filteredEvents],
    });

    if (idx === eventsLength - 1) {
      console.log("decrement");
      decrement();
    }

    if (eventsLength === 1) {
      setModalOpen(false);
    }
  }

  function updateEventHandler(e) {
    const key = e.currentTarget.id;

    const updatedValue = prompt(`update ${key}`);

    eventCopy[key] = updatedValue;

    const updatedEventsList = allEvents.map((ev) =>
      ev.id === eventCopy.id ? eventCopy : ev
    );

    updateDoc(docRef, {
      email: currentUser.email,
      events: [...updatedEventsList],
    });
  }

  return (
    <ModalContainer className={styles.eventModal}>
      <header className={styles.modalHeader}>
        <div className={styles.basicFlex}>
          <h2>{event.title}</h2>

          <svg
            onClick={updateEventHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#787878"
            class={` ${styles.eventModalSvg} bi bi-pencil`}
            viewBox="0 0 16 16"
            id="title"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </div>

        <div className={styles.eventCounterContainer}>
          <svg
            onClick={decrement}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#787878"
            class={` ${styles.eventModalSvg} bi bi-chevron-left`}
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>

          <h3>
            <span className={styles.textGray}>
              {idx + 1}/{eventsLength}
            </span>
          </h3>

          <svg
            onClick={increment}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#787878"
            class={`${styles.eventModalSvg} bi bi-chevron-right`}
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </header>

      <LabelInputWrap>
        <label htmlFor="eventDesc">Description</label>
        <div className={styles.descIconWrap}>
          <textarea
            className={styles.description}
            placeholder={event.description}
            disabled
          />

          <svg
            onClick={updateEventHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            class={`${styles.eventModalSvg} bi bi-pencil`}
            viewBox="0 0 16 16"
            id="description"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        </div>
      </LabelInputWrap>

      <div className={styles.modalBottom}>
        <div className={styles.iconContainer} onClick={removeEventHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            class={` bi bi-trash3`}
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>

          <p>Delete</p>
        </div>

        <button
          className={`${styles.eventModalClose} mainActionBtn`}
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      </div>
    </ModalContainer>
  );
};

export default EventModal;
