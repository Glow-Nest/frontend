import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, ProductWithId } from "libs/types/ProductTypes";

const initialState: ProductState = {};

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<ProductWithId>) {
            state[action.payload.productId] = action.payload;
        },
    },
});

export const { setProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
