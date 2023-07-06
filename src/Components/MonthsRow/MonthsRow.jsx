import React, { useState, useEffect } from "react";
import styles from "./MonthsRow.module.css";

import { setEventsInMonths } from "../../Redux/Slices/EventReducer";

import { useSelector, useDispatch } from "react-redux";
import MonthDropdown from "../MonthDropdown/MonthDropdown";
import YearDropdown from "../YearDropdown/YearDropdown";
import MonthArrowButtons from "../MonthArrowButtons/MonthArrowButtons";

const MonthsRow = () => {
  
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

  const userEvents = useSelector((state) => state.userEvents.value.allEvents);


  const [monthCounter, setMonthCounter] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(monthsArr[monthCounter])

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
      <div className={styles.dropdownsContainer}>
        <MonthDropdown
          currentMonth={currentMonth}
          setMonthCounter={setMonthCounter}
          monthsArr={monthsArr}
        />


        <YearDropdown
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
      </div>

      <MonthArrowButtons increment={increment} decrement={decrement} />
    </div>
  );
};

export default MonthsRow;