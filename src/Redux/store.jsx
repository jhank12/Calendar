import { configureStore } from "@reduxjs/toolkit";

import userEventsSliceReducer from './Slices/EventReducer'

export const store = configureStore({
   reducer: {
      userEvents: userEventsSliceReducer
   },
})

