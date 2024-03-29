import React, { useState, useContext } from "react";
import styles from "./NewEventModal.module.css";

import LabelInputWrap from "../ReusableComponents/LabelInputWrap/LabelInputWrap";

import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import ModalWithOverlay from "../ReusableComponents/ModalWithOverlay/ModalWithOverlay";

// import { doc, updateDoc } from "firebase/firestore";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { AuthContext } from "../../Contexts/AuthContext";

const NewEventModal = ({ setIsOpen }) => {
  const allEvents = useSelector((state) => state.userEvents.value.allEvents);

  const { currentUser } = useContext(AuthContext);

  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ eventColor, setEventColor ] = useState('')

  function formatDate(e) {
    const originalDate = e.target.value;

    const hyphenIdxArr = [];

    for (let i = 0; i < originalDate.length; i++) {
      if (originalDate[i] == "-") {
        hyphenIdxArr.push(i);
      }
    }

    const month = parseInt(
      originalDate.slice(hyphenIdxArr[0] + 1, hyphenIdxArr[1])
    );
    const day = originalDate.slice(hyphenIdxArr[1] + 1);
    const year = originalDate.slice(0, hyphenIdxArr[0]);

    console.log(e.currentTarget.value);
    const date = `${month}-${day}-${year}`;
    setDay(day);
    setDate(date);
  }

  function formSubmit(e) {
    e.preventDefault();

    const newEventObj = {
      date: date,
      title: title,
      description: description,
      tag: eventColor,
      day: day,
      id: nanoid(),
    };

    console.log(allEvents);

    const docRef = doc(db, "users", currentUser.uid);

    updateDoc(docRef, {
      email: currentUser.email,
      events: [...allEvents, newEventObj],
    });

    setIsOpen(false);
  }


  return (
    <ModalWithOverlay setIsOpen={setIsOpen}>
      <header className={styles.modalHeader}>
        <h2>Add New Event</h2>
        <span className={styles.modalClose} onClick={() => setIsOpen(false)}>
          x
        </span>
      </header>

      <form onSubmit={formSubmit}>
        <LabelInputWrap>
          <label>Date</label>
          <input
            type="date"
            placeholder="mm/dd/yyyy"
            onChange={(e) => formatDate(e)}
            required
          />
        </LabelInputWrap>

        <LabelInputWrap>
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </LabelInputWrap>

        <LabelInputWrap>
          <label>Description</label>
          <input
            type=""
            className={styles.descInput}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </LabelInputWrap>

        <LabelInputWrap>
          <label>Color</label>

          <div className={styles.colorCirclesContainer}>
            

            <div
              className={[`${styles.colorCircle} ${styles.redCircle}`]}
              id="red"

              onClick={(e) => setEventColor(e.currentTarget.id)}
            ></div>
            <div
              className={[`${styles.colorCircle} ${styles.greenCircle}`]}
              id="green"
              onClick={(e) => setEventColor(e.currentTarget.id)}
            ></div>

            <div
              className={[`${styles.colorCircle} ${styles.yellowCircle}`]}
              id="yellow"
              onClick={(e) => setEventColor(e.currentTarget.id)}
            ></div>
          </div>
        </LabelInputWrap>

        <button className={`${styles.newEventSave} mainActionBtn`}>Save</button>
      </form>
    </ModalWithOverlay>
  );
};

export default NewEventModal;
