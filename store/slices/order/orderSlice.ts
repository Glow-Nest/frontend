import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderItem } from "libs/types/OrderTypes";

const initialState: Order = {
    clientId: "",
    totalPrice: 0,
    orderItems: []
}

const OrderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        addClientIdToOrder(state, action: PayloadAction<string>) {
            state.clientId = action.payload
        },

        addProductToOrder(state, action: PayloadAction<OrderItem>) {
            const existingItem = state.orderItems.find(
                (item) => item.productId === action.payload.productId
            );

            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.orderItems.push(action.payload);
            }
        },

        removeProductFromOrder(state, action: PayloadAction<string>) {
            state.orderItems = state.orderItems.filter(
                item => item.productId !== action.payload
            );
        },

        updateProductQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.orderItems.find(i => i.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        }

    }
});


export const { addClientIdToOrder, addProductToOrder, removeProductFromOrder, updateProductQuantity } = OrderSlice.actions;
export default OrderSlice.reducer;