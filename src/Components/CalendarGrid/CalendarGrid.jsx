import React, { useState, useEffect } from "react";

import styles from "./CalendarGrid.module.css";

import CalendarGridItem from "../CalendarGridItem/CalendarGridItem";

const CalendarGrid = ({ monthData }) => {
  const currentMonthDaysArr = new Array();

  // make state arr
  const daysArr = [];

  const { month, daysCount, monthStartDay, events } = monthData;

  for (let i = 1; i <= daysCount; i++) {
    

    daysArr.push({ i: i, events: [] });
  }

  // get index of day with event.day
  // add property to it with the event

  if (events) {
    events.forEach((ev, idx) => {
      daysArr[ev.day - 1].events.push(ev);
    });
  }

  return (
    <div className={styles.calendarGrid}>
      {daysArr.map((day) => {
        return <CalendarGridItem dayData={day} />;
      })}
    </div>
  );
};

export default CalendarGrid;
