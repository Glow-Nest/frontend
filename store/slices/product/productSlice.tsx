import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "libs/types/ProductTypes";

const initialState: ProductState = {};

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        

    },
});

export const {  } = ProductSlice.actions;
export default ProductSlice.reducer;