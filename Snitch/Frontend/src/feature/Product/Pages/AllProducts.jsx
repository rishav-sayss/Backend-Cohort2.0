import React from "react";
import { useSelector } from "react-redux";
function AllProducts() {
  let product = useSelector((state) => state.product.products);
   console.log(product)

  return (
    <div>
      <h1>All product</h1>
    </div>
  );
}

export default AllProducts;
