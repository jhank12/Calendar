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
        title: "one",
        description: "desc for 4-3-2023",
        date: "4-5-2023",
        tag: "green",
        day: "5",
        id: "ere=e232-03",
      },

      {
        title: "two",
        description: "2nd desc for 5-5-2023",
        date: "4-5-2023",
        tag: "red",
        day: "5",
        id: "fdier93ed",
      },

      {
        title: "three",
        description: "desc for 5-5-2023",
        date: "4-5-2023",
        tag: "green",
        day: "5",
        id: "ddie3943",
      },

      {
        title: "four",
        description: "desc for 5-5-2023",
        date: "4-5-2023",
        tag: "green",
        day: "5",
        id: "di457due",
      },

      {
        title: "five",
        description: "desc for 5-5-2023",
        date: "4-5-2023",
        tag: "green",
        day: "5",
        id: "39fj349fj",
      },

      {
        title: "six",
        description: "desc for 5-1-2023",
        date: "5-1-2023",
        tag: "green",
        day: "1",
        id: "788erfdj",
      },

      {
        title: "six",
        description: "desc for 5-1-2023",
        date: "5-1-2023",
        tag: "green",
        day: "1",
        id: "788erf52248dj",
      },

      {
        title: "seven",
        description: "desc for 3-30-2023",
        date: "3-30-2023",
        tag: "green",
        day: "30",
        id: "788ety59gerfdj",
      },

      {
        title: "eight",
        description: "desc for 6-11-2023",
        date: "6-11-2023",
        tag: "green",
        day: "11",
        id: "7u6578gerfdj",
      },

      {
        title: "9",
        description: "desc for 6-11-2023",
        date: "1-11-2024",
        tag: "green",
        day: "11",
        id: "7u6578gerfasdfasdfasffdj",
      },
      {
        title: "9",
        description: "desc for 6-11-2023",
        date: "12-31-2023",
        tag: "green",
        day: "31",
        id: "7u6578gerfasdfasdfasffdj",
      },

      {
        title: "9",
        description: "desc for 6-11-2023",
        date: "1-1-2024",
        tag: "green",
        day: "1",
        id: "7u6578gerfasdfasdfasffdj",
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

      console.log(action.payload)

      // might need all month data (dayStart, daysCount, events)
      // for (let prop in action.payload) {
      //   state.value.eventsInMonths[prop] = {
      //     events: action.payload[prop].events,
      //   };
      // }


      // state.value.eventsInMonths = [];
      // state.value.eventsInMonths.push(...action.payload);
    },
  },
});

export const {
  addEvent,
  otherTest,
  removeEvent,
  setEventsInMonths,
  updateEvent,
} = userEventsSlice.actions;

export default userEventsSlice.reducer;