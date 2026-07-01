 
import ProductCard from "@/component/ProductCard";
import axios from "axios";
import React from "react";

async function page() {
  let res = await axios.get("https://fakestoreapi.com/products");
  let products = res.data;
  console.log(products)
  return <div className=" grid grid-cols-4 gap-6 ">
    {
        products.map((elem) => {
            return  <ProductCard key={elem.id} product={elem}  />
        })
    }
    </div>;
}

export default page;
