import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "libs/types/ProductTypes";

const initialState: ProductState = {};

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        setProductCategory(state, action: PayloadAction<ProductState>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setProductCategory } = ProductSlice.actions;
export default ProductSlice.reducer;