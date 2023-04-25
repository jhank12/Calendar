import { createSlice, nanoid } from "@reduxjs/toolkit";

// day in obj isn't int for day of the week ie Sun-Sat 0-6
const initialState = {
  value: [
    //  { event: "new event4", date: "4-1-2023", tag: "green", day: "1" },
    //  { event: "new event4", date: "4-8-2023", tag: "green", day: "8" },
    //  { event: "new event", date: "4-12-2023", tag: "red", day: "12" },
    //  { event: "new event", date: "4-12-2023", tag: "red", day: "12" },
    //  { event: "new event", date: "4-13-2023", tag: "red", day: "13" },
    //  { event: "new event", date: "4-14-2023", tag: "red", day: "14" },
    //  { event: "new event", date: "4-15-2023", tag: "red", day: "15" },
    //  { event: "new event", date: "4-16-2023", tag: "red", day: "16" },
    //  { event: "new event", date: "4-16-2023", tag: "green", day: "16" },
    //  { event: "new event3", date: "5-5-2023", tag: "green", day: "5" },
    //  { event: "new event3", date: "10-5-2023", tag: "green", day: "5" },
    //  { event: "new event3", date: "11-3-2024", tag: "green", day: "3" },

    {
      title: "new event",
      description: "desc for 4-3-2023",
      date: "4-3-2023",
      tag: "green",
      day: "3",
      id: "ere=e232-03",
    },

    {
      title: "new event1",
      description: "desc for 5-5-2023",
      date: "5-5-2023",
      tag: "green",
      day: "5",
      id: "ddie3943",
    },
    {
      title: "new event2",
      description: "2nd desc for 5-5-2023",
      date: "5-5-2023",
      tag: "red",
      day: "5",
      id: "fdier93ed",
    },
  ],
};

export const userEventsSlice = createSlice({
  name: "userEvents",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      console.log("add event");

      action.payload.id = nanoid();

      state.value.push(action.payload);
    },
    removeEvent: (state, action) => {
      console.log(action.payload);

      state.value = state.value.filter((userEvent) => {
        return userEvent.id != action.payload;
      });
    },
    updateEvent: (state, action) => {},
  },
});

export const { addEvent, otherTest, removeEvent } = userEventsSlice.actions;

export default userEventsSlice.reducer;