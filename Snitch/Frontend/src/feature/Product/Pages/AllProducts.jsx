import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const HEART_ICON = (filled) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M12 21s-7.2-4.35-9.54-8.31C.76 9.83 2.45 6.4 5.65 5.59c2.08-.52 4.16.2 5.35 1.88 1.2-1.68 3.27-2.4 5.35-1.88 3.2.8 4.89 4.24 3.19 7.1C19.2 16.65 12 21 12 21z" />
  </svg>
);

function detectGender(product) {
  const text = [
    product?.gender,
    product?.category,
    product?.targetGender,
    product?.title,
    product?.description,
    Array.isArray(product?.tags) ? product.tags.join(" ") : "",
  ]
    .join(" ")
    .toLowerCase();

  if (text.includes("women") || text.includes("woman") || text.includes("female")) {
    return "women";
  }
  if (text.includes("men") || text.includes("man") || text.includes("male")) {
    return "men";
  }
  return "all";
}

function AllProducts() {
  const navigate = useNavigate();
  const { handelgetallproducts } = UseProduct();
  const products = useSelector((state) => state.product.products);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistEntries, setWishlistEntries] = useState([]);
 
  useEffect(() => {
    handelgetallproducts();
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlistProductIds");
    setWishlistEntries(normalizeWishlistEntries(parseStoredIds(storedWishlist)));
    
  }, []);

  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      const matchesCategory =
        activeCategory === "all" || detectGender(product) === activeCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product?.title?.toLowerCase().includes(q) ||
        product?.description?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    const isLiked = wishlistEntries.some((entry) => entry.productId === productId);
    const updated = isLiked
      ? wishlistEntries.filter((entry) => entry.productId !== productId)
      : [...wishlistEntries, { productId, variantId: null }];
    setWishlistEntries(updated);
    localStorage.setItem("wishlistProductIds", JSON.stringify(updated));
    window.dispatchEvent(new Event("snitch-storage-update"));
  };
 

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <ToastContainer toastStyle={{ backgroundColor: "#059669", color: "#ffffff" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
 

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide">
              All Products
            </h1>
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
              {filteredProducts.length} items
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
              No matching products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => {
                const image =
                  product?.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80&auto=format&fit=crop";
                const isLiked = wishlistEntries.some((entry) => entry.productId === product?._id);
               
                return (
                  <article
                    key={product?._id}
                    onClick={() => navigate(`/detail/${product?._id}`)}
                    className="group cursor-pointer rounded-2xl bg-white border border-stone-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image}
                        alt={product?.title || "Product image"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/detail/${product?._id}`);
                          }}
                          className="w-full rounded-full bg-white/95 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-900 hover:bg-stone-900 hover:text-stone-100 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                      <button
                        onClick={(e) => toggleWishlist(e, product?._id)}
                        className={`absolute cursor-pointer right-3 top-3 h-9 w-9 rounded-full grid place-items-center border transition ${
                          isLiked
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white/90 text-stone-800 border-stone-200 hover:bg-white"
                        }`}
                        aria-label="Toggle wishlist"
                      >
                        {HEART_ICON(isLiked)}
                      </button>
                    </div>

                    <div className="p-4">
                      <h2 className="line-clamp-1 text-sm sm:text-base font-medium text-stone-900">
                        {product?.title}
                      </h2>
                      <p className="mt-1 text-base font-semibold">
                        {product?.price?.currency || "$"}
                        {product?.price?.amount?.toLocaleString()}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AllProducts;
