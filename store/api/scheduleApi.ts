import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { TimeSlotGroup } from "../slices/ScheduleSlice";

export type AddBlockedTimeRequest = {
    startTime: string;
    endTime: string;
    scheduleDate: string;
    blockReason: string;
};

export type BlockedTime = {
    startTime: string;
    endTime: string;
    scheduleDate: string;
    reason: string;
}



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

        getBlockedTimes: builder.query<BlockedTime[], string>({
            query: (scheduleDate) => ({
                url: `owner/schedule/blockTime`,
                method: "POST",
                params: { scheduleDate },
            }),
            transformResponse: (response: { blockedTimes: BlockedTime[] }) => response.blockedTimes,
        }),

        getAvailableSlots: builder.query<TimeSlotGroup, string>({
            query: (scheduleDate) => ({
                url: `schedule/availableSlots`,
                method: "POST",
                params: { scheduleDate }, 
            }),
            transformResponse: (response: { timeSlots: TimeSlotGroup }) => response.timeSlots
        })
    }),

});

export const { useAddBlockedTimeMutation, useGetBlockedTimesQuery, useLazyGetAvailableSlotsQuery } = scheduleApi;