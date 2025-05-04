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
            for (const appointment of action.payload) {
                const scheduleDate = appointment.appointmentDate;
                const schedule = state.schedules[scheduleDate];

                if (schedule) {
                    // if schedule for that date exists, add it
                    if (!schedule.appointments) {
                        schedule.appointments = [];
                    }

                    schedule.appointments.push(appointment);
                } else {
                    state.schedules[scheduleDate] = {
                        scheduleDate: scheduleDate,
                        availableSlots: { Morning: [], Afternoon: [], Evening: [] },
                        appointments: [appointment]
                    }
                }
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