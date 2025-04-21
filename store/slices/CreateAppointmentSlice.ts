import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateEndTime, parseDurationString, parseFormattedDuration, parsePrice } from "libs/helpers";
import { AppointmentBookingState, Service } from "libs/types/common";

const initialState: AppointmentBookingState = {
    selectedServices: [],
    totalPrice: 0,
    totalDuration: 0,
    selectedDate: null,
    selectedTime: null,
    startTime: null,
    endTime: null
};


const createAppointmentSlice = createSlice({
    name: 'createAppointment',
    initialState,
    reducers: {
        clearServices(state) {
            state.selectedServices = [];
            state.totalPrice = 0;
            state.totalDuration = 0;
            state.selectedDate = null;
            state.selectedTime = null;
        },

        toggleService(state, action: PayloadAction<Service>) {
            const index = state.selectedServices.findIndex(
                s => s.name === action.payload.name
            );

            if (index !== -1) {
                // Remove service
                const removed = state.selectedServices.splice(index, 1)[0];
                state.totalPrice -= parsePrice(removed.price);
                state.totalDuration -= parseFormattedDuration(removed.formattedDuration || "0 min");
            } else {
                // Add service
                state.selectedServices.push(action.payload);
                state.totalPrice += parsePrice(action.payload.price);
                state.totalDuration += parseFormattedDuration(action.payload.formattedDuration || "0 min");
            }

            // Recalculate endTime if a time is already selected
            if (state.selectedTime && state.totalDuration > 0) {
                state.startTime = state.selectedTime;
                state.endTime = calculateEndTime(state.selectedTime, state.totalDuration);
            } else {
                state.startTime = null;
                state.endTime = null;
            }
        },

        addSelectedDate(state, action: PayloadAction<string | null>) {
            state.selectedDate = action.payload;
        },

        addSelectedTime(state, action: PayloadAction<string | null>) {
            state.selectedTime = action.payload;

            if (action.payload && state.totalDuration > 0) {
                state.startTime = action.payload;
                state.endTime = calculateEndTime(action.payload, state.totalDuration);
            } else {
                state.startTime = null;
                state.endTime = null;
            }
        }

    }
});

export const { toggleService, clearServices, addSelectedDate, addSelectedTime } = createAppointmentSlice.actions;
export default createAppointmentSlice.reducer;