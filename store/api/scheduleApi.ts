import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TimeSlotGroup } from "../slices/schedules/ScheduleSlice";
import { GetFromCookies } from "libs/cookies";

export type BlockedTime = {
    startTime: string;
    endTime: string;
    scheduleDate: string;
    reason: string;
}

export type CreateAppointmentRequest = {
    appointmentNote: string,
    startTime: string,
    endTime: string,
    appointmentDate: string,
    bookedByClient: string,
    serviceIds: string[],
    categoryIds: string[]
};

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = GetFromCookies("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        addBlockedTime: builder.mutation<void, BlockedTime>({
            query: (body) => ({
                url: "owner/schedule/blockTime/add",
                method: "POST",
                body,
            }),
        }),

        addAppointment: builder.mutation<unknown, CreateAppointmentRequest>({
            query: (body) => ({
                url: "schedule/appointment/create",
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

export const { useAddBlockedTimeMutation, useGetBlockedTimesQuery, useLazyGetAvailableSlotsQuery, useAddAppointmentMutation } = scheduleApi;