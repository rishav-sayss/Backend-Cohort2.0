import { createBrowserRouter } from "react-router";
import Ragister from "../feature/Auth/pages/Register";
import Login from "../feature/Auth/pages/Login";
import CreateProduct from "../feature/Product/Pages/CreateProduct";
import SellerProductDetails from "../feature/Product/Pages/SellerProductDetails";
import ProtectedComponent from "../feature/Auth/component/ProtectedComponent";
import Home from "../feature/Product/Pages/Home";
import ProductDetails from "../feature/Product/Pages/ProductDetails";
import Deshboard from "../feature/Product/Pages/Deshboard";
import AllProducts from "../feature/Product/Pages/AllProducts";
import Wishlist from "../feature/Product/Pages/Wishlist";
import Cart from "../feature/Cart/pages/Cart";
import AppLayout from "./AppLayout";

export let routes = createBrowserRouter([
  {
    path: "/register",
    element: <Ragister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/detail/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/product/allproducts",
        element: <AllProducts />,
      },
      {
        path: "/product/wishlist",
        element: <Wishlist />,
      },

      {
        path: "/cart",
        element: (
          <ProtectedComponent>
            <Cart />
          </ProtectedComponent>
        ),
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
                <Deshboard />
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
    ],
  },
]);
