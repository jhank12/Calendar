import React, { useState, useEffect } from "react";
import styles from "./MonthsRow.module.css";

import { addEvent, setEventsInMonth } from "../../Redux/Slices/EventReducer";

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

  // get last month, current and next

  function getMonthData() {
    setCurrentMonth(monthsArr[monthCounter]);

    let previousMonth = monthsArr[monthCounter - 1];
    const currentMonthNew = monthsArr[monthCounter];
    let nextMonth = monthsArr[monthCounter + 1];
    let afterNextMonth = monthsArr[monthCounter + 2];

    if (currentMonthNew == "November") {
      afterNextMonth = "January";
    } else if (currentMonthNew == "December") {
      nextMonth = "January";
      afterNextMonth = "February";
    } else if (currentMonthNew == "January") {
      previousMonth = "December";
    }

    const previousMonthMilliseconds = new Date(
      `${previousMonth}, 01, ${
        previousMonth == "December" ? currentYear - 1 : currentYear
      }`
    ).getTime();

    const currentMonthMilliseconds = new Date(
      `${currentMonthNew}, 01, ${currentYear}`
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
      previousMonth: {
        month: previousMonth,
        year: previousMonth == "December" ? currentYear - 1 : currentYear,
        daysCount: previousMonthDays,
        events: filterEvents(previousMonth, previousMonth == "December" ? currentYear - 1 : currentYear)

      },
      currentMonth: {
        month: currentMonthNew,
        year: currentYear,
        daysCount: currentMonthDays,
        events: filterEvents(currentMonthNew, currentYear),
        monthStartDay: currentMonthStartDay,
      },
      nextMonth: {
        month: nextMonth,
        year: nextMonth == "January" ? currentYear + 1 : currentYear,
        daysCount: nextMonthDays,
        events: filterEvents(nextMonth, nextMonth == "January" ? currentYear + 1 : currentYear)
      },
    };

    console.log(monthsData)

    // pass monthsData props into filter events but as their value ex.(previousMonth == march)

    const months = [previousMonth, currentMonthNew, nextMonth];
    filterEvents(monthsData, months);

    // dispatch(setEventsInMonth(filteredEvents));

    // monthDays({
    //   daysCount: currentMonthDays,
    //   month: monthsArr[monthCounter],
    //   monthStartDay: monthStartDay,
    //   // events: filteredEvents,
    // });
  }

  function filterEvents(month, year) {
    
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


      if(eventMonth == month && eventYear == year) {
        return event
      }


    });

    return eventsInMonths

  }

  // function filterEvents(monthsData,months){

  // const events = []

  // const eventsInMonths = userEvents.filter(event => {
  //   const {date} = event;

  //   const hyphenIdxArr = [];

  //   for (let i = 0; i< date.length; i++) {
  //     if(date[i] == '-'){
  //       hyphenIdxArr.push(i)
  //     }
  //   }

  //   const eventMonth = monthsArr[date.slice(0, hyphenIdxArr[0]) - 1];
  //   const eventYear = date.slice(hyphenIdxArr[1] + 1);

  //   for (let prop in monthsData) {

  //     if(eventMonth == monthsData[prop].month && eventYear == monthsData[prop].year) {

  //       events.push({[prop]: prop, events: [event]})

  //       // events.push({prop: event})
  //     }

  //   }

  //   console.log(events)

  //   return events

  // })

  // }

  // filter events func start
  // function filterEvents(arr) {
  //   const eventsInMonth = arr.filter((event) => {
  //     const { date } = event;

  //     const hyphenIdxArr = [];

  //     for (let i = 0; i < date.length; i++) {
  //       if (date[i] == "-") {
  //         hyphenIdxArr.push(i);
  //       }
  //     }

  //     if (
  //       date.slice(0, hyphenIdxArr[0]) == monthCounter + 1 &&
  //       date.slice(hyphenIdxArr[1] + 1) == currentYear
  //     ) {
  //       return event;
  //     }
  //   });

  //   return eventsInMonth;
  // }
  // filter events func end

  // find way to keep current state when navigating back from page

  useEffect(() => {
    getMonthData();
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
