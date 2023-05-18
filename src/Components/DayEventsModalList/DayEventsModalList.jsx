import React, { useState } from "react";

import ModalOverlay from "../ReusableComponents/ModalOverlay/ModalOverlay";
import EventModal from "../EventModal/EventModal";

const DayEventsModalList = ({ events, setModalOpen, startCount = 0 }) => {
  // change to idx of the clicked event
  const [eventCounter, setEventCounter] = useState(startCount);

  function increment() {
    if (eventCounter == events.length - 1) {
      return;
    } else {
      setEventCounter((count) => count + 1);
    }
  }

  function decrement() {
    if (eventCounter == 0) {
      return;
    } else {
      setEventCounter((count) => count - 1);
    }
  }

  return (
    <ModalOverlay onClick={() => setModalOpen(false)}>
      {events.map((event, idx) => {
        if (idx === eventCounter) {
          return (
            <EventModal
              key={event.id}
              idx={idx}
              event={event}
              eventsLength={events.length}
              setModalOpen={setModalOpen}
              increment={increment}
              decrement={decrement}
            />
          );
        }
      })}
    </ModalOverlay>
  );
};

export default DayEventsModalList;
