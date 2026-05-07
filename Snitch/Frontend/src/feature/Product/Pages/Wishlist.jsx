import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";

function Wishlist() {
  const navigate = useNavigate();
  const { handelgetallproducts } = UseProduct();
  const products = useSelector((state) => state.product.products);

  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    handelgetallproducts();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("wishlistProductIds");
    if (stored) {
      setWishlistIds(JSON.parse(stored));
    }
  }, []);

  const wishlistProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return products.filter((product) => wishlistIds.includes(product?._id));
  }, [products, wishlistIds]);

  const removeFromWishlist = (productId) => {
    const updated = wishlistIds.filter((id) => id !== productId);
    setWishlistIds(updated);
    localStorage.setItem("wishlistProductIds", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-light tracking-wide">Wishlist</h1>
          <button
            onClick={() => navigate("/product/allproducts")}
            className="rounded-full cursor-pointer border border-stone-300 px-4 py-2 text-xs uppercase tracking-[0.16em] hover:bg-stone-100 transition"
          >
            Continue Shopping
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="text-stone-600">No liked products in wishlist yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {wishlistProducts.map((product) => {
              const image =
                product?.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80&auto=format&fit=crop";

              return (
                <article
                  key={product?._id}
                  onClick={() => navigate(`/product/${product?._id}`)}
                  className="group cursor-pointer rounded-2xl bg-white border border-stone-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={image}
                      alt={product?.title || "Product image"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="line-clamp-1 text-sm sm:text-base font-medium text-stone-900">
                      {product?.title}
                    </h2>
                    <p className="mt-1 text-base font-semibold">
                      {product?.price?.currency || "$"}
                      {product?.price?.amount?.toLocaleString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product?._id);
                      }}
                      className="mt-4 w-full cursor-pointer rounded-full py-2.5 text-xs uppercase tracking-[0.16em] bg-stone-200 text-stone-700 hover:bg-stone-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
