import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateEndTime, formatHHMMDurationToReadable, parseHHMMDurationToMinutes } from "libs/helpers";
import { AppointmentBookingState } from "libs/types/common";
import { Service } from "libs/types/ServiceCategory";

const initialState: AppointmentBookingState = {
    selectedServices: [],
    selectedCategoryIds: [],
    totalPrice: 0,
    totalDuration: 0,
    selectedDate: null,
    selectedTime: null,
    startTime: null,
    endTime: null,
    appointmentNote: null
};

const createAppointmentSlice = createSlice({
    name: 'createAppointment',
    initialState,
    reducers: {
        clearServices(state) {
            state.selectedServices = [];
            state.selectedCategoryIds = [];
            state.totalPrice = 0;
            state.totalDuration = 0;
            state.selectedDate = null;
            state.selectedTime = null;
            state.appointmentNote = "";
        },

        toggleService(state, action: PayloadAction<Service>) {
            const index = state.selectedServices.findIndex(
                s => s.name === action.payload.name
            );

            if (index !== -1) {
                // Remove service
                const removed = state.selectedServices.splice(index, 1)[0];
                state.totalPrice -= Number(removed.price);
                state.totalDuration -= Number(parseHHMMDurationToMinutes(removed.duration));
            } else {
                // Add service
                state.selectedServices.push(action.payload);
                state.totalPrice += Number(action.payload.price);


                state.totalDuration += Number(parseHHMMDurationToMinutes(action.payload.duration));
            }

            // Recalculate endTime if a time is already selected
            if (state.selectedTime && state.totalDuration > 0) {
                const extractedStartTime = state.selectedTime.split("-")[0].trim();

                state.startTime = extractedStartTime;
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
                const extractedStartTime = action.payload.split("-")[0].trim();

                state.startTime = extractedStartTime;
                state.endTime = calculateEndTime(action.payload, state.totalDuration);
            } else {
                state.startTime = null;
                state.endTime = null;
            }
        },

        setAppointmentNote(state, action: PayloadAction<string>) {
            state.appointmentNote = action.payload;
        },

        toggleCategoryId(state, action: PayloadAction<string>) {
            const categoryId = action.payload;
            const index = state.selectedCategoryIds.indexOf(categoryId);

            if (index !== -1) {
                state.selectedCategoryIds.splice(index, 1);
            } else {
                state.selectedCategoryIds.push(categoryId);
            }

        }

    }
});

export const { toggleService, clearServices, addSelectedDate, addSelectedTime, setAppointmentNote, toggleCategoryId } = createAppointmentSlice.actions;
export default createAppointmentSlice.reducer;