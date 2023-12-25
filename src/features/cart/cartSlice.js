import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cartID === product.cartID
      );
      if (item) item.amount += product.amount;
      else state.cartItems.push(product);

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart successfully");
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((item) => item.cartID === cartID);
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart.");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((item) => item.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated successfully.");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
