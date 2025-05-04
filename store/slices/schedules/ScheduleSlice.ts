import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, Schedule, ScheduleState } from "libs/types/ScheduleTypes";
import { JSX } from "react";

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

        setAppointmentForDate(state, action: PayloadAction<Appointment[]>) {
            if (action.payload.length === 0) return;

            const scheduleDate = action.payload[0].appointmentDate;

            // Overwrite the appointments directly
            if (state.schedules[scheduleDate]) {
                state.schedules[scheduleDate].appointments = action.payload;
            } else {
                state.schedules[scheduleDate] = {
                    scheduleDate,
                    availableSlots: { Morning: [], Afternoon: [], Evening: [] },
                    appointments: action.payload,
                };
            }
        },

        clearAppointments(state, action: PayloadAction<string>) {
            const schedule = state.schedules[action.payload];
            if (schedule) {
                schedule.appointments = [];
            }
        }
    }
});

export const { setSchedule, removeSchedule, setAppointmentForDate } = scheduleSlice.actions;
export default scheduleSlice.reducer;