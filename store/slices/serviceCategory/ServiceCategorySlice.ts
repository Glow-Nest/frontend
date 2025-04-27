import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryList, ServiceCategoryState } from "libs/types/ServiceCategory";

const initialState: ServiceCategoryState = {};

const serviceCategorySlice = createSlice({
    name: "ServiceCategory",
    initialState,
    reducers: {
        setServiceCategory(state, action: PayloadAction<ServiceCategoryState>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setServiceCategory } = serviceCategorySlice.actions;
export default serviceCategorySlice.reducer;