import React, { useState, useContext } from "react";
import styles from "./NewEventModal.module.css";

import ModalContainer from "../ReusableComponents/ModalContainer/ModalContainer";
import LabelInputWrap from "../ReusableComponents/LabelInputWrap/LabelInputWrap";

import { addEvent } from "../../Redux/Slices/EventReducer";

import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Modal from "../ReusableComponents/Modal/Modal";
import ModalWithOverlay from "../ReusableComponents/ModalWithOverlay/ModalWithOverlay";

import { db } from 'E:/Web Development/React Projects/calendar/src/firebase/config.js'
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { AuthContext } from 'E:/Web Development/React Projects/calendar/src/Contexts/AuthContext.jsx'

const NewEventModal = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  const allEvents = useSelector((state) => state.userEvents.value);

  const { currentUser } = useContext(AuthContext)

  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  function formatDate(e) {
    //  console.log(e.target.value);

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
      tag: "red",
      day: day,
      id:nanoid()
    };
    
    const docRef = doc(db, "users", currentUser.uid);

    const { allEvents: events, monthsData } = allEvents
    console.log(events)
    // console.log(docRef)  
    updateDoc(docRef, {
      email: currentUser.email,
      events: [...events, newEventObj]
    })

    // dispatch(addEvent(newEventObj));

    // updateDoc

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
            
          />
        </LabelInputWrap>

        <LabelInputWrap>
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </LabelInputWrap>

        <LabelInputWrap>
          <label>Description</label>
          <input
            type=""
            className={styles.descInput}
            onChange={(e) => setDescription(e.target.value)}
            
          />
        </LabelInputWrap>

        <button className={`${styles.newEventSave} mainActionBtn`}>Save</button>
      </form>
    </ModalWithOverlay>

    // <ModalContainer setIsOpen={setIsOpen}>
    //   <header className={styles.modalHeader}>
    //     <h2>Add New Event</h2>
    //     <span className={styles.modalClose} onClick={() => setIsOpen(false)}>x</span>
    //   </header>

    //   <form onSubmit={formSubmit}>
    //     <LabelInputWrap>
    //       <label>Date</label>
    //       <input
    //         type="date"
    //         placeholder="mm/dd/yyyy"
    //         onChange={(e) => formatDate(e)}
    //       />
    //     </LabelInputWrap>

    //     <LabelInputWrap>
    //       <label>Title</label>
    //       <input type="text" onChange={(e) => setTitle(e.target.value)} />
    //     </LabelInputWrap>

    //     <LabelInputWrap>
    //       <label>Description</label>
    //       <input
    //         type=""
    //         className={styles.descInput}
    //         onChange={(e) => setDescription(e.target.value)}
    //       />
    //     </LabelInputWrap>

    //     <button className={`${styles.newEventSave} mainActionBtn`}>Save</button>
    //   </form>
    // </ModalContainer>
  );
};

export default NewEventModal;
