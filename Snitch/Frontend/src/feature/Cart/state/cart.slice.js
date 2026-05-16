import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setcart: (state, action) => {
      state.items = action.payload;
    },
    additem: (state, action) => {
      state.items.push(action.payload);
    },
    incrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        const itemProductId = item.product?._id ?? item.product;
        const itemVariantId = item.variant?._id ?? item.variant;

        if (
          String(itemProductId) === String(productId) &&
          String(itemVariantId) === String(variantId)
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decrementCartItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.map((item) => {
        const itemProductId = item.product?._id ?? item.product;
        const itemVariantId = item.variant?._id ?? item.variant;

        if (
          String(itemProductId) === String(productId) &&
          String(itemVariantId) === String(variantId)
        ) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

export const { setcart, additem, incrementCartItem  , decrementCartItem} = cartslice.actions;

export default cartslice.reducer;
