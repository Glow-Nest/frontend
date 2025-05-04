import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";
import { Appointment, TimeSlotGroup } from "libs/types/ScheduleTypes";

export type BlockedTime = {
    startTime: string;
    endTime: string;
    scheduleDate: string;
    blockReason: string;
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
        getAvailableSlots: builder.query<TimeSlotGroup, string>({
            query: (scheduleDate) => ({
                url: `schedule/availableSlots`,
                method: "POST",
                params: { scheduleDate },
            }),
            transformResponse: (response: { timeSlots: TimeSlotGroup }) => response.timeSlots
        }),

        // blocked time endpoints
        addBlockedTime: builder.mutation<void, BlockedTime>({
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
                body: { scheduleDate },
            }),
            transformResponse: (response: { blockedTimes: BlockedTime[] }) => response.blockedTimes,
        }),

        // appointment endpoints
        addAppointment: builder.mutation<unknown, CreateAppointmentRequest>({
            query: (body) => ({
                url: "schedule/appointment/create",
                method: "POST",
                body,
            }),
        }),

        getAppointmentForOwner: builder.query<{ appointments: Appointment[] }, { scheduleDate: string, mode: string }>({
            query: ({ scheduleDate, mode }) => ({
                url: `owner/schedule/appointments`,
                method: "POST",
                body: { scheduleDate, mode }
            })
        })
    }),
});

export const { useAddBlockedTimeMutation, useGetBlockedTimesQuery, useLazyGetAvailableSlotsQuery, useAddAppointmentMutation, useGetAppointmentForOwnerQuery } = scheduleApi;