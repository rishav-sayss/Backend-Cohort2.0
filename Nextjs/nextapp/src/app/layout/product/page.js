import Navbar from "@/component/Navbar";
import ProductCard from "@/component/ProductCard";
import axios from "axios";

export default async function Page() {
  const res = await axios.get(
    "https://fakestoreapi.com/products"
  );

  const products = res.data;

  return (

    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

