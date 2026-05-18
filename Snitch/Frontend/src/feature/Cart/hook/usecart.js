import {
  addItem,
  getCart,
  removeItem,
  incrementCartItemApi,
  decrementCartItemApi
} from "../service/cart.service";
import { useDispatch } from "react-redux";
import {
  setcart,
  incrementCartItem,
  decrementCartItem
} from "../state/cart.slice";

const normalizeCartPayload = (response) => {
  const cart =
    response?.cart ??
    response?.data?.cart ??
    response?.payload?.cart ??
    response;

  if (Array.isArray(cart)) {
    return { items: cart, totalPrice: 0, currency: "INR" };
  }

  return {
    items: Array.isArray(cart?.items) ? cart.items : [],
    totalPrice: cart?.totalPrice ?? cart?.totalprice ?? 0,
    currency: cart?.currency ?? "INR",
  };
};

export const usecart = () => {
  const dispatch = useDispatch();

  async function handelAdditem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });
    await handleGetCart();
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    dispatch(setcart(normalizeCartPayload(data)));
  }

  async function handleIncrementCartItem({ productId, variantId }) {
    await incrementCartItemApi({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
  }

  async function handledecrementCartItem({ productId, variantId }) {
    await decrementCartItemApi({ productId, variantId });
    dispatch(decrementCartItem({ productId, variantId }));
  }

  async function handleRemoveItem({ itemId }) {
    const data = await removeItem({ itemId });
    dispatch(setcart(normalizeCartPayload(data)));
  }

  return {
    handelAdditem,
    handleGetCart,
    handleIncrementCartItem,
    handledecrementCartItem,
    handleRemoveItem,
  };
};
