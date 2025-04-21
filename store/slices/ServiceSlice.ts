import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDuration, formatPrice } from "libs/helpers";
import { Service } from "libs/types/common";

const initialState: Service[] = [];


const servicesSlice = createSlice({
    name: "getServices",
    initialState,
    reducers: {
        addService(state, action: PayloadAction<Service[]>) {
            state.push(...action.payload);
        },

        setMultipleServices(_state, action: PayloadAction<Service[]>) {
            const formatted = action.payload.map((service) => ({
                ...service,
                price: formatPrice(Number(service.price)),
                formattedDuration: formatDuration(service.duration),
            }))

            return formatted;
        }
    }
})

export const { addService, setMultipleServices } = servicesSlice.actions;
export default servicesSlice.reducer;



