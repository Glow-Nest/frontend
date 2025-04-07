import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppointmentState = {
    selectedServices: [],
    totalPrice: 0,
    totalDuration: 0,
    selectedDate: null,
    selectedTime: null
};

function parsePrice(priceString: string): number {
    return parseFloat(priceString.replace(/\D/g, ''));
}

function parseDuration(durationString: string): number {
    return parseInt(durationString.replace(/\D/g, ''));
}

const appointmentSlice = createSlice({
    name: 'appointment',
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
                s => s.serviceName === action.payload.serviceName
            );

            if (index !== -1) {
                // Remove service
                const removed = state.selectedServices.splice(index, 1)[0];
                state.totalPrice -= parsePrice(removed.price);
                state.totalDuration -= parseDuration(removed.duration);
            } else {
                // Add service
                state.selectedServices.push(action.payload);
                state.totalPrice += parsePrice(action.payload.price);
                state.totalDuration += parseDuration(action.payload.duration);
            }
        },

        addSelectedDate(state, action: PayloadAction<string | null>) {
            state.selectedDate = action.payload;
            console.log(action.payload);
        }
    }
});

export const { toggleService, clearServices, addSelectedDate } = appointmentSlice.actions;
export default appointmentSlice.reducer;