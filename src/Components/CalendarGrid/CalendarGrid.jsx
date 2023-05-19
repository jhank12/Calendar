import React, { useState, useEffect } from "react";

import styles from "./CalendarGrid.module.css";

import CalendarGridItem from "../CalendarGridItem/CalendarGridItem";

import { useSelector } from "react-redux";

const CalendarGrid = ({isMobile}) => {
  const [daysArr, setDaysArr] = useState([]);

  const monthsData = useSelector((state) => state.userEvents.value.monthsData);

  const { prevMonth, currentMonth, nextMonth } = monthsData;

  console.log(currentMonth)

  function buildGrid() {
    const gridDaysArr = [];

    const { monthStartDay: currMonthStartDay } = monthsData.currentMonth;

    let nextMonthCount = 1;

      for (let i = 1; i < 43; i++) {
        if (i <= currMonthStartDay) {
          const events = mapEventsToDays(
            prevMonth,
            prevMonth.daysCount - currMonthStartDay + i
          );

          gridDaysArr.push({
            day: prevMonth.daysCount - currMonthStartDay + i,
            events: events,
            inCurrentMonth: false
          });
        } else if (
          i > currMonthStartDay &&
          i <= currentMonth.daysCount + currMonthStartDay
        ) {
          const events = mapEventsToDays(currentMonth, i - currMonthStartDay);

          gridDaysArr.push({ day: i - currMonthStartDay, events: events, inCurrentMonth: true });
        } else {
          const events = mapEventsToDays(nextMonth, nextMonthCount);

          gridDaysArr.push({ day: nextMonthCount, events: events, inCurrentMonth: false });

          nextMonthCount++;
        }
      }

      setDaysArr(gridDaysArr);


    }



  function mapEventsToDays(month, num) {
    const monthEvents = month.events.filter((event) => {
      if (event.day == num) {
        return event;
      } else {
        return;
      }
    });

    return monthEvents;
  }

  useEffect(() => {
    if (Object.keys(monthsData).length > 0) {
      buildGrid();
    }
  }, [monthsData]);


  return (
    <>
      <div className={styles.calendarGrid}>
        {daysArr.map((day) => {
          return <CalendarGridItem dayData={day} isMobile={isMobile}/>;
        })}
      </div>
    </>
  );
};

export default CalendarGrid;