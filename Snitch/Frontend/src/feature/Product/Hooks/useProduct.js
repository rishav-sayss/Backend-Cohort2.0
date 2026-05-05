import {
  CreatProduct,
  getsellerproduct,
  getAllproduct,
  getProductById,
 addProductVariant
} from "../services/product.api";
import { setsellerproduct, setproducts } from "../state/product.state";
import { useDispatch } from "react-redux";

export let UseProduct = () => {
  const dispatch = useDispatch();

  let HandelCreatProduct = async (formdata) => {
    let data = await CreatProduct(formdata);
    return data.product;
  };

  let handleGetSellerProduct = async () => {
    let data = await getsellerproduct();
    dispatch(setsellerproduct(data.products));
    return data.product;
  };

  let handelgetallproducts = async () => {
    let data = await getAllproduct();

    dispatch(setproducts(data.products));
  };

  async function handleGetProductById(productId) {
    const data = await getProductById(productId);
    return data.product;
  }

  async function handleAddProductVariant(productId, newProductVariant) {
    const data = await addProductVariant(productId, newProductVariant);

    return data;
  }

  return {
    HandelCreatProduct,
    handleGetSellerProduct,
    handelgetallproducts,
    handleGetProductById,
    handleAddProductVariant
  };
};
