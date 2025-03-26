import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "./api/clientApi";

export const store = configureStore({
    reducer: {
        [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clientApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;