import { addItem, getCart, updateItemQuantity, removeItem } from "../service/cart.service";
import { useDispatch } from "react-redux";
import { additem as additemtocart, setcart } from "../state/cart.slice";

export const usecart = () => {
  const dispatch = useDispatch();

  async function handelAdditem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });
    // The backend addItem route doesn't return the updated cart object,
    // so we fetch the cart manually right after adding to update Redux.
    await handleGetCart();
    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    // data.cart may be the full cart object { _id, user, items: [] }
    // or just the items array — handle both
    const items = Array.isArray(data.cart) ? data.cart : data.cart?.items ?? [];
    dispatch(setcart(items));
  }

  async function handleUpdateQuantity({ itemId, quantity }) {
    const data = await updateItemQuantity({ itemId, quantity });
    const items = Array.isArray(data.cart) ? data.cart : data.cart?.items ?? [];
    dispatch(setcart(items));
  }

  async function handleRemoveItem({ itemId }) {
    const data = await removeItem({ itemId });
    const items = Array.isArray(data.cart) ? data.cart : data.cart?.items ?? [];
    dispatch(setcart(items));
  }

  return { handelAdditem, handleGetCart, handleUpdateQuantity, handleRemoveItem };
};
