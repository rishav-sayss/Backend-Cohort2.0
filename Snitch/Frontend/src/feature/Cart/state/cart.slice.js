import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    currency: "INR",
    items: [],
  },
  reducers: {
    setcart: (state, action) => {
      const payload = action.payload;

      // Support both payload styles:
      // 1) direct items array
      // 2) object containing { items, totalPrice/totalprice, currency }
      if (Array.isArray(payload)) {
        state.items = payload;
        return;
      }

      const nextItems = Array.isArray(payload?.items) ? payload.items : [];
      state.items = nextItems;
      state.totalPrice = payload?.totalPrice ?? payload?.totalprice ?? 0;
      state.currency = payload?.currency ?? "INR";
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

export const { setcart, additem, incrementCartItem, decrementCartItem } =
  cartslice.actions;

export default cartslice.reducer;
