import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceReviewState } from "libs/types/ServiceReview";

const initialState: ServiceReviewState = {};

const serviceReviewSlice = createSlice({
  name: "ServiceReview",
  initialState,
  reducers: {
    setServiceReview(state, action: PayloadAction<ServiceReviewState>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setServiceReview } = serviceReviewSlice.actions;
export default serviceReviewSlice.reducer;
