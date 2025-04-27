import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";
import userReducer from "./slices/user/UserSlice";
// import serviceReducer from "./slices/serviceCategory/ServiceSlice";

import appointmentReducer from './slices/schedules/CreateAppointmentSlice';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { serviceApi } from "./api/serviceApi";
import blockedTimeReducer from './slices/schedules/BlockedTimeSlice';
import { scheduleApi } from "./api/scheduleApi";
import scheduleReducer from "./slices/schedules/ScheduleSlice";
import serviceCategoryReducer from "./slices/serviceCategory/ServiceCategorySlice";

const persistAppointmentConfig = {
    key: "appointment",
    version: 1,
    storage: storageSession,
    blacklist: ["blockedTimes", clientApi.reducerPath, serviceApi.reducerPath, scheduleApi.reducerPath],
};


const reducer = combineReducers({
    [clientApi.reducerPath]: clientApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    appointment: appointmentReducer,
    user: userReducer,
    blockedTimes: blockedTimeReducer,
    schedules: scheduleReducer,
    serviceCategory: serviceCategoryReducer
})

const persistedReducer = persistReducer<ReturnType<typeof reducer>>(persistAppointmentConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(clientApi.middleware, serviceApi.middleware, scheduleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
