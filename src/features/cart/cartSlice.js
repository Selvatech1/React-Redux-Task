// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.quantity * item.price, 0);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalAmount += item.price;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 0) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalAmount -= item.price;
            }
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.totalQuantity -= state.items[index].quantity;
                state.totalAmount -= state.items[index].quantity * state.items[index].price;
                state.items.splice(index, 1);
            }
        },
        addItem: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (!item) {
                state.items.push({ ...action.payload, quantity: 1 });
                state.totalQuantity += 1;
                state.totalAmount += action.payload.price;
            }
        }
    },
});

export const { setCart, increaseQuantity, decreaseQuantity, removeItem, addItem } = cartSlice.actions;
export default cartSlice.reducer;
