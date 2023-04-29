import React, { useState, useEffect } from "react";

import styles from "./CalendarGrid.module.css";

import CalendarGridItem from "../CalendarGridItem/CalendarGridItem";

import { useSelector } from "react-redux";

const CalendarGrid = ({ monthData }) => {
  // make state arr
  const daysArr = [];

  const { month, daysCount, monthStartDay } = monthData;
  
  const eventsInMonth = useSelector(
    (state) => state.userEvents.value.eventsInMonth
  );


  for (let i = 0; i <= daysCount + (monthStartDay - 1); i++) {
    
    if(i >= monthStartDay) {
      daysArr.push({i: i - (monthStartDay - 1), events: [], month: month});
    } 
    else if (i <= monthStartDay) {
      daysArr.push({i: 30 - i, events: [], month: 'not current'})
    }
    
    
  }

  if (eventsInMonth) {
    eventsInMonth.forEach((ev, idx) => {
      daysArr[ev.day - 1 + monthStartDay].events.push(ev);
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