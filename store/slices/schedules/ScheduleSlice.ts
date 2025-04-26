import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react";

export type TimeSlot = {
    start: string;
    end: string;
}

export type TimeSlotGroup = {
    Morning: TimeSlot[];
    Afternoon: TimeSlot[];
    Evening: TimeSlot[];
}

export type Schedule = {
    scheduleDate: string;
    availableSlots: TimeSlotGroup;
}

export type ScheduleState = {
    schedules: Record<string, Schedule>;
};

const initialState: ScheduleState = {
    schedules: {}
}

const scheduleSlice = createSlice({
    name: "schedule",
    initialState: initialState,
    reducers: {
        setSchedule(state, action: PayloadAction<Schedule>) {
            const schedule = action.payload;
            state.schedules[schedule.scheduleDate] = schedule;
        },

        removeSchedule(state, action: PayloadAction<string>) {
            delete state.schedules[action.payload];
        },
    }
});

export const { setSchedule, removeSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;