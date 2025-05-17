import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { Order, OrderItem } from "libs/types/OrderTypes";

const formattedDate = format(new Date(), "yyyy-MM-dd");

const initialState: Order = {
    clientId: "",
    totalPrice: 0,
    orderItems: [],
    pickupDate: formattedDate
}

const calculateTotalPrice = (items: OrderItem[]) =>
    items.reduce((total, item) => total + item.priceWhenOrdering * item.quantity, 0);

const OrderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        addClientIdToOrder(state, action: PayloadAction<string>) {
            console.log("Called add client id: " + action.payload);
            state.clientId = action.payload;
        },

        addProductToOrder(state, action: PayloadAction<OrderItem>) {
            const existingItem = state.orderItems.find(
                item => item.productId === action.payload.productId
            );

            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
                existingItem.priceWhenOrdering = action.payload.priceWhenOrdering;
            } else {
                state.orderItems.push(action.payload);
            }

            state.totalPrice = calculateTotalPrice(state.orderItems);
        },

        removeProductFromOrder(state, action: PayloadAction<string>) {
            state.orderItems = state.orderItems.filter(
                item => item.productId !== action.payload
            );
            state.totalPrice = calculateTotalPrice(state.orderItems);
        },

        updateProductQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const item = state.orderItems.find(i => i.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
                state.totalPrice = calculateTotalPrice(state.orderItems);
            }
        },

        addPickupDate(state, action: PayloadAction<string>) {
            state.pickupDate = action.payload;
        },

        clearOrder: (state) => {
            state.orderItems = [];
            state.totalPrice = 0;
            state.pickupDate = formattedDate;
        },
    }
});

export const { addClientIdToOrder, addProductToOrder, removeProductFromOrder, updateProductQuantity, addPickupDate, clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;