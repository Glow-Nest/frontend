import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";

import appointmentReducer from './slices/AppointmentSlice';;

export const store = configureStore({
    reducer: {
        [clientApi.reducerPath]: clientApi.reducer,
        appointment: appointmentReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clientApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;