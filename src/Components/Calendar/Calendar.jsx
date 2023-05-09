import React from "react";

import styles from "./Calendar.module.css";

// components
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

const Calendar = () => {


  return (
    <section className={styles.calendar}>
      <CalendarHeader />

        <div>
        <div className={styles.daysOfWeek}>
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>

          {/* <p>Sun</p>
          <p>Mon</p>
          <p>Tues</p>
          <p>Wed</p>
          <p>Thurs</p>
          <p>Fri</p>
          <p>Sat</p> */}
        </div>
        <CalendarGrid  />
          </div>      
      
    </section>
  );
};

export default Calendar;