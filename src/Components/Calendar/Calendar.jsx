import React, { useEffect, useState } from "react";

import styles from "./Calendar.module.css";

// components
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

const Calendar = () => {
  const [isMobile, setIsMobile] = useState(false);

  function checkSize() {
    if (window.innerWidth <= 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    // doesnt check onload
    window.addEventListener("resize", checkSize);
  }, []);

  return (
    <section className={styles.calendar}>
      <CalendarHeader />

      <div>
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

        <CalendarGrid isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Calendar;
