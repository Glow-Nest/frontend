import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderResponseDto } from "libs/types/OrderTypes";

interface OrdersState {
    orders: OrderResponseDto[];
    totalCount: number;
}

const initialState: OrdersState = {
    orders: [],
    totalCount: 0
};

const OrderResponseSlice = createSlice({
    name: "orderResponse",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderResponseDto[]>) => {
            state.orders = action.payload;
        },

        addOrder: (state, action: PayloadAction<OrderResponseDto>) => {
            state.orders.unshift(action.payload);
        },

        updateOrderStatus: (
            state,
            action: PayloadAction<{ orderId: string; newStatus: string }>
        ) => {
            const order = state.orders.find(o => o.orderId === action.payload.orderId);
            if (order) {
                order.status = action.payload.newStatus;
            }
        },

        clearOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { setOrders, addOrder, updateOrderStatus, clearOrders } = OrderResponseSlice.actions;
export default OrderResponseSlice.reducer;
