import React, { useState } from "react";
import styles from "./CalendarGridItem.module.css";

import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";

import { removeEvent } from "../../Redux/Slices/EventReducer";

// components

import EventItemsList from "../EventItemsList/EventItemsList";

const CalendarGridItem = ({ dayData }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.calendarDayItem}>
      {dayData.day}
      {/* {dayData.month} */}

      {dayData.events.length > 0 && <EventItemsList events={dayData.events} />}
    </div>
  );
};

export default CalendarGridItem;

// have day events in events reducer
// when day event gets clicked retrieve all events for that day
// render modal for each of the events but start on the event that was clicked

// each item should show:
// - date
// - any events for that day
// have click event for every day
