import React, { useEffect, useState } from "react";

import styles from "./Calendar.module.css";

// components
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

const Calendar = () => {




  return (
    <section className={styles.calendar}>
      {/* <h2>for mobile only have the squares that have events be colored for the the rest have transparent background</h2> */}
      <CalendarHeader />

      <div className={styles.daysGridContainer}>
        <div className={styles.daysOfWeek} id={styles.daysDesktop}>
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
        </div>

        <div className={styles.daysOfWeek} id={styles.daysMobile}>
          <p>Su</p>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>Th</p>
          <p>F</p>
          <p>Sa</p>
        </div>

        <CalendarGrid />
      </div>
    </section>
  );
};

export default Calendar;
