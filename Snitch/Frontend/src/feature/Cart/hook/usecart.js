import {
  addItem,
  getCart,
  removeItem,
  incrementCartItemApi,
  decrementCartItemApi
} from "../service/cart.service";
import { useDispatch } from "react-redux";
import {
  additem as additemtocart,
  setcart,
  incrementCartItem,
  decrementCartItem
} from "../state/cart.slice";

export const usecart = () => {
  const dispatch = useDispatch();

  async function handelAdditem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });
    await handleGetCart();
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    const items = Array.isArray(data.cart)
      ? data.cart
      : (data.cart?.items ?? []);
    dispatch(setcart(items));
  }

  async function handleIncrementCartItem({ productId, variantId }) {
    // console.log( productId, variantId)
    await incrementCartItemApi({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
  }

  async function handledecrementCartItem({ productId, variantId }) {
    await  decrementCartItemApi({ productId, variantId });
    dispatch( decrementCartItem({ productId, variantId }));
  }

  async function handleRemoveItem({ itemId }) {
    const data = await removeItem({ itemId });
    const items = Array.isArray(data.cart)
      ? data.cart
      : (data.cart?.items ?? []);
    dispatch(setcart(items));
  }

  return {
    handelAdditem,
    handleGetCart,
    handleIncrementCartItem,
    handledecrementCartItem,
    handleRemoveItem,
  };
};
