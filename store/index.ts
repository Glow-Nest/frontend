import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";
import authReducer from "./slice/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
