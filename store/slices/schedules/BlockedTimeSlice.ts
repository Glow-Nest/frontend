import { BlockedTime } from "@/store/api/scheduleApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BlockedTimeState = {
    blockedTimesByDate: {
        [date: string]: BlockedTime[];
    };
};

const initialState: BlockedTimeState = {
    blockedTimesByDate: {},
};

export const blockedTimeSlice = createSlice({
    name: "blockedTimes",
    initialState,
    reducers: {
        setBlockedTimesForDate: (
            state,
            action: PayloadAction<{ date: string; blockedTimes: BlockedTime[] }>
        ) => {
            state.blockedTimesByDate[action.payload.date] = action.payload.blockedTimes;
        },
        addBlockedTime: (
            state,
            action: PayloadAction<{ date: string; blockedTimes: BlockedTime[] }>
        ) => {
            const date = action.payload.date;
            if (!state.blockedTimesByDate[date]) {
                state.blockedTimesByDate[date] = [];
            }
            state.blockedTimesByDate[date].push(...action.payload.blockedTimes);
        },
        clearBlockedTimes: (state) => {
            state.blockedTimesByDate = {};
        },
    },
    
});

export const {
    setBlockedTimesForDate,
    addBlockedTime,
    clearBlockedTimes,
} = blockedTimeSlice.actions;

export default blockedTimeSlice.reducer;