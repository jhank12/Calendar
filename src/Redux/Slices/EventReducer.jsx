import { createSlice, nanoid } from "@reduxjs/toolkit";

// day in obj isn't int for day of the week ie Sun-Sat 0-6
// const initialState = {
//   value: [

//     {
//       title: "new event",
//       description: "desc for 4-3-2023",
//       date: "4-3-2023",
//       tag: "green",
//       day: "3",
//       id: "ere=e232-03",
//     },

//     {
//       title: "new event1",
//       description: "desc for 5-5-2023",
//       date: "5-5-2023",
//       tag: "green",
//       day: "5",
//       id: "ddie3943",
//     },
//     {
//       title: "new event2",
//       description: "2nd desc for 5-5-2023",
//       date: "5-5-2023",
//       tag: "red",
//       day: "5",
//       id: "fdier93ed",
//     },
//   ],
// };

const initialState = {
  value: {
    allEvents: [
      {
        title: "new event",
        description: "desc for 4-3-2023",
        date: "4-3-2023",
        tag: "green",
        day: "3",
        id: "ere=e232-03",
      },

      {
        title: "new event2",
        description: "2nd desc for 5-5-2023",
        date: "5-5-2023",
        tag: "red",
        day: "5",
        id: "fdier93ed",
      },

      {
        title: "new event1",
        description: "desc for 5-5-2023",
        date: "5-5-2023",
        tag: "green",
        day: "5",
        id: "ddie3943",
      },
      // {
      //   title: "new event2",
      //   description: "2nd desc for 5-5-2023",
      //   date: "5-5-2023",
      //   tag: "red",
      //   day: "5",
      //   id: "fdier93ed",
      // },
    ],

    eventsInMonth: [],

  },
};

export const userEventsSlice = createSlice({
  name: "userEvents",
  initialState,
  reducers: {
    addEvent: (state, action) => {

      action.payload.id = nanoid();

      state.value.allEvents.push(action.payload);
    },
    removeEvent: (state, action) => {

      state.value.allEvents = state.value.allEvents.filter((userEvent) => {

        return userEvent.id != action.payload;
      });
    },
    updateEvent: (state, action) => {

    },
    
    setEventsInMonth: (state, action) => {
      state.value.eventsInMonth = []
      state.value.eventsInMonth.push(...action.payload)

      console.log('rtk events', ...action.payload)

      console.log(state.value.eventsInMonth)
    }
  },
});

export const { addEvent, otherTest, removeEvent, setEventsInMonth } = userEventsSlice.actions;

export default userEventsSlice.reducer;
