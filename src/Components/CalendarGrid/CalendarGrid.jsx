import React, { useState, useEffect } from "react";

import styles from "./CalendarGrid.module.css";

import CalendarGridItem from "../CalendarGridItem/CalendarGridItem";

import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const CalendarGrid = ({ monthData }) => {
  // make state arr

  const [isLoading, setIsLoading] = useState(true);

  // const daysArr = [];

  const [daysArr, setDaysArr] = useState([]);

  const { month, daysCount, monthStartDay } = monthData;

  const monthsData = useSelector((state) => state.userEvents.value.monthsData);

  const { prevMonth, currentMonth, nextMonth } = monthsData;

  console.log(monthsData)

  function buildGrid() {
    const gridDaysArr = [];

    const { monthStartDay: currMonthStartDay } = monthsData.currentMonth;


    let nextMonthCount = 1;

    for (let i = 1; i < 43; i++) {

      // gridDaysArr.push({day: i, events: []})

      if(i <= currMonthStartDay) {
        console.log(prevMonth)
        const events = mapEventsToDays(prevMonth,  (prevMonth.daysCount - currMonthStartDay) + i)


        gridDaysArr.push({day: (prevMonth.daysCount - currMonthStartDay) + i, events: events})
      
      
      } else if(i > currMonthStartDay && i <= currentMonth.daysCount + currMonthStartDay) {

        const events = mapEventsToDays(currentMonth, i - currMonthStartDay)

        
        gridDaysArr.push({day: i - currMonthStartDay, events: events})
      } else {

        // const events = nextMonth.events.map(event => {
        //   if(event.day == nextMonthCount) {
        //     return event
        //   } else {
        //     return {}
        //   }
        // })

        const events = mapEventsToDays(nextMonth, nextMonthCount)
        
        gridDaysArr.push({day: nextMonthCount, events:events})

        nextMonthCount++
      }


    }

    setDaysArr(gridDaysArr);
  }

  function mapEventsToDays(month, num) {
    
    return month.events.map(event => {
      if(event.day == num) {
        return event
      } else {
        return {}
      }
    })

  }

  // have is loading bool one level above

  useEffect(() => {
    if (Object.keys(monthsData).length > 0) {
      setIsLoading(false);
      buildGrid();
    }
  }, [monthsData]);

  // maybe split redux events into three arrays prev, current, next

  return (
    <>
      {/* {!isLoading ? ( */}
      <div className={styles.calendarGrid}>
        {daysArr.map((day) => {
          return <CalendarGridItem dayData={day} />;
        })}
      </div>
      {/* ) : ( */}
      {/* <h2>Loading</h2> */}
      {/* )} */}
    </>
  );
};

export default CalendarGrid;
