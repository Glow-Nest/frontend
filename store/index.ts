import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";

import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { serviceApi } from "./api/serviceApi";
import { scheduleApi } from "./api/scheduleApi";
import { productApi } from "./api/productApi";

import userReducer from "./slices/user/UserSlice";
import appointmentReducer from "./slices/schedules/CreateAppointmentSlice";
import blockedTimeReducer from "./slices/schedules/BlockedTimeSlice";
import serviceCategoryReducer from "./slices/serviceCategory/ServiceCategorySlice";
import productReducer from "./slices/product/productSlice";
import scheduleReducer from "./slices/schedules/ScheduleSlice";
import orderReducer from "./slices/order/orderSlice";
import { orderApi } from "./api/orderApi";

const persistAppointmentConfig = {
  key: "appointment",
  version: 1,
  storage: storageSession,
  blacklist: [
    "blockedTimes",
    clientApi.reducerPath,
    serviceApi.reducerPath,
    scheduleApi.reducerPath,
  ],
};

const reducer = combineReducers({
  [clientApi.reducerPath]: clientApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [scheduleApi.reducerPath]: scheduleApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  appointment: appointmentReducer,
  user: userReducer,
  blockedTimes: blockedTimeReducer,
  schedules: scheduleReducer,
  serviceCategory: serviceCategoryReducer,
  product: productReducer,
  order: orderReducer
});

const persistedReducer = persistReducer<ReturnType<typeof reducer>>(
  persistAppointmentConfig,
  reducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      clientApi.middleware,
      serviceApi.middleware,
      scheduleApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
