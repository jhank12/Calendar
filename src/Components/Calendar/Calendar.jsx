import React, { useState } from "react";

import styles from "./Calendar.module.css";

// components
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

const Calendar = () => {
  const [currentMonthData, setCurrentMonthData] = useState({});

  // maybe put in redux
  function monthDays(data) {
    setCurrentMonthData(data);
  }

  return (
    <section className={styles.calendar}>
      <CalendarHeader monthDays={monthDays} />

      
        <div className={styles.daysOfWeek}>
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
        </div>
        <CalendarGrid monthData={currentMonthData} />
      
    </section>
  );
};

export default Calendar;