import { createBrowserRouter } from "react-router";
import Ragister from "../feature/Auth/pages/Register";
import Login from "../feature/Auth/pages/Login";
import CreateProduct from "../feature/Product/Pages/CreateProduct";
import SellerProductDetails from "../feature/Product/Pages/SellerProductDetails";
import ProtectedComponent from "../feature/Auth/component/ProtectedComponent";
import Home from "../feature/Product/Pages/Home";
import ProductDetails from "../feature/Product/Pages/ProductDetails";

export let routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/register",
    element: <Ragister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "seller",
    children: [
      {
        path: "/seller/creatproduct",
        element: (
          <ProtectedComponent role="seller">
            <CreateProduct />
          </ProtectedComponent>
        ),
      },
      {
        path: "/seller/deshboard",
        element: (
          <ProtectedComponent role="seller">
            <SellerProductDetails />
          </ProtectedComponent>
        ),
      },
      {
        path: "/seller/product/:productId",
        element: (
          <ProtectedComponent role="seller">
            <SellerProductDetails />
          </ProtectedComponent>
        ),
      },
    ],
  },
]);
