import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export type AddBlockedTimeRequest = {
    startTime: string;
    endTime: string;
    scheduleDate: string;
    blockReason: string;
};

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        addBlockedTime: builder.mutation<void, AddBlockedTimeRequest>({
            query: (body) => ({
                url: "owner/schedule/blockTime/add",
                method: "POST",
                body,
            }),
        }),
    }),

});

export const { useAddBlockedTimeMutation } = scheduleApi;