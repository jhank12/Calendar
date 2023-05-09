import React from "react";
import styles from "./CalendarGridItem.module.css";

import EventItemsList from "../EventItemsList/EventItemsList";

const CalendarGridItem = ({ dayData }) => {

  // dayData.events gives events for this day

  return (
    <div
      className={`${styles.calendarDayItem} day-${
        dayData.events.length > 0 ? dayData.events[0].tag : ""
      }`}
    >
      {dayData.day}
      <EventItemsList events={dayData.events} />
      {/* {dayData.events.length > 0 && <EventItemsList events={dayData.events} />} */}
    </div>
  );
};

export default CalendarGridItem;