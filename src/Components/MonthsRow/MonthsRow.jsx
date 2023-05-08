import React, { useState, useEffect } from "react";
import styles from "./MonthsRow.module.css";

import { addEvent, setEventsInMonths } from "../../Redux/Slices/EventReducer";

import { useSelector, useDispatch } from "react-redux";
import MonthDropdown from "../MonthDropdown/MonthDropdown";
import YearDropdown from "../YearDropdown/YearDropdown";

const MonthsRow = ({ monthDays }) => {
  const dispatch = useDispatch();

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
  const userEvents = useSelector((state) => state.userEvents.value.allEvents);

  //   get month and year and set those on load

  const [monthCounter, setMonthCounter] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(monthsArr[monthCounter]);
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

    // setCurrentMonth(monthsArr[monthCounter])
  }

  function decrement() {
    if (monthCounter <= 0) {
      setMonthCounter(11);
      setCurrentYear((year) => year - 1);
    } else {
      setMonthCounter((count) => count - 1);
    }

    // setCurrentMonth(monthsArr[monthCounter])
  }

  // get last month, current and next

  const [previousMonth, setPreviousMonth] = useState("");
  const [nextMonth, setNextMonth] = useState("");

  function getMonthData() {
    const currentMonth = monthsArr[monthCounter];

    setCurrentMonth(currentMonth);

    
    let previousMonth = monthsArr[monthCounter - 1];
    let nextMonth = monthsArr[monthCounter + 1];
    let afterNextMonth = monthsArr[monthCounter + 2];
    

    if (currentMonth == "November") {
      afterNextMonth = "January";
    } else if (currentMonth == "December") {
      nextMonth = "January";
      afterNextMonth = "February";
    } else if (currentMonth == "January") {
      previousMonth = "December";
    }

    

    setPreviousMonth(previousMonth);
    setNextMonth(nextMonth);

    const previousMonthMilliseconds = new Date(
      `${previousMonth}, 01, ${
        previousMonth == "December" ? currentYear - 1 : currentYear
      }`
    ).getTime();

    const currentMonthMilliseconds = new Date(
      `${currentMonth}, 01, ${currentYear}`
    ).getTime();

    const nextMonthMilliseconds = new Date(
      `${nextMonth}, 01, ${
        nextMonth == "January" ? currentYear + 1 : currentYear
      }`
    ).getTime();

    const afterNextMonthMilliseconds = new Date(
      `${afterNextMonth}, 01, ${
        afterNextMonth == "January" || nextMonth == "January"
          ? currentYear + 1
          : currentYear
      }`
    ).getTime();

    // extract functions into other file

    // make function so this is more efficient
    //

    // days

    // const previousMonthDays = Math.round(Math.floor(currentMonthMilliseconds - previousMonthMilliseconds) / 86400000);
    // const currentMonthDays = Math.round(Math.floor(nextMonthMilliseconds - currentMonthMilliseconds) / 86400000);
    // const nextMonthDays = Math.round(Math.floor(afterNextMonthMilliseconds - nextMonthMilliseconds) / 86400000);

    const previousMonthDays = Math.round(
      (currentMonthMilliseconds - previousMonthMilliseconds) / 86400000
    );
    const currentMonthDays = Math.round(
      (nextMonthMilliseconds - currentMonthMilliseconds) / 86400000
    );
    const nextMonthDays = Math.round(
      (afterNextMonthMilliseconds - nextMonthMilliseconds) / 86400000
    );

    const currentMonthStartDay = new Date(
      `${monthsArr[monthCounter]}, 01, ${currentYear}`
    ).getDay();

    const monthsData = {
      prevMonth: {
        month: previousMonth,
        year: previousMonth == "December" ? currentYear - 1 : currentYear,
        daysCount: previousMonthDays,
        events: filterEvents(
          previousMonth,
          previousMonth == "December" ? currentYear - 1 : currentYear
        ),
      },
      currentMonth: {
        month: currentMonth,
        year: currentYear,
        daysCount: currentMonthDays,
        events: filterEvents(currentMonth, currentYear),
        monthStartDay: currentMonthStartDay,
      },
      nextMonth: {
        month: nextMonth,
        year: nextMonth == "January" ? currentYear + 1 : currentYear,
        daysCount: nextMonthDays,
        events: filterEvents(
          nextMonth,
          nextMonth == "January" ? currentYear + 1 : currentYear
        ),
      },
    };

    // pass monthsData props into filter events but as their value ex.(previousMonth == march)

    let isTrue = false;

    for (let prop in monthsData) {
      for (let subProp in monthsData[prop]) {
        if (
          monthsData[prop][subProp] === null ||
          monthsData[prop][subProp] === undefined
        ) {
          return;
        } else {
          isTrue = true;
        }
      }
    }

    if (isTrue) dispatch(setEventsInMonths(monthsData));

    // dispatch(setEventsInMonth(filteredEvents));

    // monthDays({
    //   daysCount: currentMonthDays,
    //   month: monthsArr[monthCounter],
    //   monthStartDay: monthStartDay,
    //   // events: filteredEvents,
    // });
  }

  function filterEvents(month, year) {
    if (userEvents) {
      const eventsInMonths = userEvents.filter((event) => {
        const { date } = event;

        const hyphenIdxArr = [];

        for (let i = 0; i < date.length; i++) {
          if (date[i] == "-") {
            hyphenIdxArr.push(i);
          }
        }

        const eventMonth = monthsArr[date.slice(0, hyphenIdxArr[0]) - 1];
        const eventYear = date.slice(hyphenIdxArr[1] + 1);

        if (eventMonth == month && eventYear == year) {
          return event;
        }
      });
      return eventsInMonths;
    } else return;
  }

  useEffect(() => {
    getMonthData();
  }, [monthCounter, userEvents, currentYear]);

  return (
    <div className={styles.monthsRow}>
      {/* <button onClick={() => decrement()}>decrement</button> */}
      <h2 onClick={() => decrement()}>{previousMonth}</h2>

      <MonthDropdown
        currentMonth={currentMonth}
        setMonthCounter={setMonthCounter}
        monthsArr={monthsArr}
      />

      <h2 onClick={() => increment()}>{nextMonth}</h2>

      {/* <button onClick={() => increment()}>increment</button> */}

      <YearDropdown currentYear={currentYear} setCurrentYear={setCurrentYear} />
    </div>
  );
};

export default MonthsRow;
