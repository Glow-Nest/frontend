import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";

import appointmentReducer from './slices/AppointmentSlice';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

const persistAppointmentConfig = {
    key: "appointment",
    version: 1,
    storage: storageSession}

const reducer = combineReducers({
    [clientApi.reducerPath]: clientApi.reducer,
    appointment: appointmentReducer,
})

const persistedReducer = persistReducer(persistAppointmentConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, }).concat(clientApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;