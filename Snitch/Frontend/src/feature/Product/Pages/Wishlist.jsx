import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";

const parseStoredIds = (value) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeWishlistEntries = (entries = []) => {
  return entries
    .map((entry) => {
      if (typeof entry === "string") return { productId: entry, variantId: null };
      if (entry && typeof entry === "object" && entry.productId) {
        return { productId: entry.productId, variantId: entry.variantId || null };
      }
      return null;
    })
    .filter(Boolean);
};

function Wishlist() {
  const navigate = useNavigate();
  const { handelgetallproducts } = UseProduct();
  const products = useSelector((state) => state.product.products);

  const [wishlistEntries, setWishlistEntries] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    handelgetallproducts();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("wishlistProductIds");
    const storedCart = localStorage.getItem("cartProductIds");
    setWishlistEntries(normalizeWishlistEntries(parseStoredIds(stored)));
    setCartIds(parseStoredIds(storedCart));
  }, []);

  const wishlistProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return wishlistEntries
      .map((entry) => {
        const product = products.find((p) => p?._id === entry.productId);
        if (!product) return null;
        const variant = entry.variantId
          ? product?.variants?.find((v) => v?._id === entry.variantId)
          : null;
        return { ...entry, product, variant };
      })
      .filter(Boolean);
  }, [products, wishlistEntries]);

  const removeFromWishlist = (productId, variantId) => {
    const updated = wishlistEntries.filter(
      (entry) => !(entry.productId === productId && entry.variantId === (variantId || null))
    );
    setWishlistEntries(updated);
    localStorage.setItem("wishlistProductIds", JSON.stringify(updated));
    window.dispatchEvent(new Event("snitch-storage-update"));
  };

  const toggleCart = (productId) => {
    const isAlreadyInCart = cartIds.includes(productId);
    const updated = isAlreadyInCart
      ? cartIds.filter((id) => id !== productId)
      : [...cartIds, productId];
    setCartIds(updated);
    localStorage.setItem("cartProductIds", JSON.stringify(updated));
    window.dispatchEvent(new Event("snitch-storage-update"));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <div className="mt-2 flex items-center justify-between mb-6">
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
            {wishlistProducts.map((entry) => {
              const product = entry.product;
              const variant = entry.variant;
              const image =
                variant?.images?.[0]?.url ||
                product?.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80&auto=format&fit=crop";
              const inCart = cartIds.includes(product?._id);

              return (
                <article
                  key={`${product?._id}-${variant?._id || "default"}`}
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
                      {(variant?.price?.currency || product?.price?.currency || "$")}
                      {(variant?.price?.amount ?? product?.price?.amount)?.toLocaleString()}
                    </p>
                    {variant?.attributes && (
                      <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-stone-500">
                        {Object.entries(variant.attributes)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" | ")}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCart(product?._id);
                        }}
                        className={`flex-1 cursor-pointer rounded-full py-2.5 text-xs uppercase tracking-[0.16em] transition ${
                          inCart
                            ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                            : "bg-stone-900 text-stone-100 hover:bg-stone-700"
                        }`}
                      >
                        {inCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(product?._id, variant?._id || null);
                        }}
                        className="px-4 cursor-pointer rounded-full py-2.5 text-xs uppercase tracking-[0.16em] bg-stone-200 text-stone-700 hover:bg-stone-300 transition"
                      >
                        Remove
                      </button>
                    </div>
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
