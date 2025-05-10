import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductSummary } from "libs/types/ProductTypes";

 type ProductSummariesState = {
  products: ProductSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
};

const initialState: ProductSummariesState = {
    products: [],
    totalCount: 0,
    page: 0,
    pageSize: 0
};

const ProductSummariesSlice = createSlice({
    name: "ProductSummaries",
    initialState,
    reducers: {
        setProductSummaries(
            state,
            action: PayloadAction<{
                products: ProductSummary[];
                totalCount: number;
                page: number;
                pageSize: number;
            }>
        ) {
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount;
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },

        clearProductSummaries(state) {
            state.products = [];
            state.totalCount = 0;
            state.page = 0;
            state.pageSize = 0;
        }
    },
});

export const { setProductSummaries, clearProductSummaries } = ProductSummariesSlice.actions;
export default ProductSummariesSlice.reducer;
