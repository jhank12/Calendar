import React, { useState, useEffect } from "react";
import styles from "./MonthsRow.module.css";

import { addEvent, otherTest } from "../../Redux/Slices/EventReducer";

import { useSelector, useDispatch } from "react-redux";
import MonthDropdown from "../MonthDropdown/MonthDropdown";
import YearDropdown from "../YearDropdown/YearDropdown";

const MonthsRow = ({ monthDays }) => {
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.userEvents.value);

  //   get month and year and set those on load

  const [monthCounter, setMonthCounter] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentMonth(monthsArr[new Date().getMonth()]);
    setMonthCounter(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  }, []);

  function increment() {
    if (monthCounter >= 11) {
      setMonthCounter(0);
      setCurrentYear((year) => year + 1);
    } else {
      setMonthCounter((count) => count + 1);
    }
  }

  function decrement() {
    if (monthCounter <= 0) {
      setMonthCounter(11);
      setCurrentYear((year) => year - 1);
    } else {
      setMonthCounter((count) => count - 1);
    }
  }

  function getMonthData() {
    setCurrentMonth(monthsArr[monthCounter]);

    const currentMonthMilliseconds = new Date(
      `${monthsArr[monthCounter]}, 01, ${currentYear}`
    ).getTime();

    let nextMonthMilliseconds;

    if (monthsArr[monthCounter] == "December") {
      nextMonthMilliseconds = new Date(
        `January, 01, ${currentYear + 1}`
      ).getTime();
    } else {
      nextMonthMilliseconds = new Date(
        `${monthsArr[monthCounter + 1]}, 01, ${currentYear}`
      ).getTime();
    }

    const currentMonthDays = Math.round(
      (nextMonthMilliseconds - currentMonthMilliseconds) / 86400000
    );

    const monthStartDay = new Date(
      `${monthsArr[monthCounter]}, 01, ${currentYear}`
    ).getDay();

    const filteredEvents = filterEvents(userEvents);

    console.log("redux", filteredEvents);

    monthDays({
      daysCount: currentMonthDays,
      month: monthsArr[monthCounter],
      monthStartDay: monthStartDay,
      events: filteredEvents,
    });
  }

  function filterEvents(arr) {
    const eventsInMonth = arr.filter((event) => {
      const { date } = event;

      const hyphenIdxArr = [];

      for (let i = 0; i < date.length; i++) {
        if (date[i] == "-") {
          hyphenIdxArr.push(i);
        }
      }

      if (
        date.slice(0, hyphenIdxArr[0]) == monthCounter + 1 &&
        date.slice(hyphenIdxArr[1] + 1) == currentYear
      ) {
        return event;
      }
    });

    return eventsInMonth;
  }

  // find way to keep current state when navigating back from page

  useEffect(() => {
    getMonthData();
    console.log("changed");
  }, [monthCounter, userEvents, currentYear]);


  return (
    <div className={styles.monthsRow}>
      <button onClick={() => decrement()}>decrement</button>

      <MonthDropdown
        currentMonth={currentMonth}
        setMonthCounter={setMonthCounter}
        monthsArr={monthsArr}
      />

      <button onClick={() => increment()}>increment</button>

      <YearDropdown currentYear={currentYear} setCurrentYear={setCurrentYear} />

    </div>
  );
};

export default MonthsRow;
