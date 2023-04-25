import React, { useState, useEffect } from "react";

import styles from "./CalendarGrid.module.css";

import CalendarGridItem from "../CalendarGridItem/CalendarGridItem";

import { useSelector } from "react-redux";

const CalendarGrid = ({ monthData }) => {
  const currentMonthDaysArr = new Array();

  // make state arr
  const daysArr = [];

  const { month, daysCount, monthStartDay } = monthData;
  const eventsInMonth = useSelector((state) => state.userEvents.value.eventsInMonth)

  console.log('dfadsf',eventsInMonth)


  for (let i = 1; i <= daysCount; i++) {
    

    daysArr.push({ i: i, events: [] });
  }

  // get index of day with event.day
  // add property to it with the event

  if (eventsInMonth) {
    eventsInMonth.forEach((ev, idx) => {
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
