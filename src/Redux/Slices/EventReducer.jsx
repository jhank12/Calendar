import { createSlice, nanoid } from "@reduxjs/toolkit";

// day in obj isn't int for day of the week ie Sun-Sat 0-6


const initialState = {
  value: {
    allEvents: [
     

     
      
     
      // {
      //   title: "new event2",
      //   description: "2nd desc for 5-5-2023",
      //   date: "5-5-2023",
      //   tag: "red",
      //   day: "5",
      //   id: "fdier93ed",
      // },
    ],

    monthsData: {},

    // eventsInMonths: [],
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
      const { key, updatedValue, id } = action.payload;

      state.value.allEvents.forEach((event) => {
        if (event.id === id) {
          event[key] = updatedValue;
        }
      });
    },

    setEventsInMonths: (state, action) => {

      state.value.monthsData = {};
      state.value.monthsData = action.payload

    },
    setAllEvents: (state, action) => {
      state.value.allEvents = action.payload
    },
    eventsReset: (state) => {
      console.log('eventsReset')
      state.value.allEvents = []
    }
  },
});

export const {
  addEvent,
  otherTest,
  removeEvent,
  setEventsInMonths,
  updateEvent,
  setAllEvents,
  eventsReset
} = userEventsSlice.actions;

export default userEventsSlice.reducer;