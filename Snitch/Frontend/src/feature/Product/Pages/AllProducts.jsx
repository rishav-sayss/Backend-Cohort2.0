import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";
import ProductNavbar from "../Components/ProductNavbar";
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
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    handelgetallproducts();
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlistProductIds");
    const storedCart = localStorage.getItem("cartProductIds");
    setWishlistIds(parseStoredIds(storedWishlist));
    setCartIds(parseStoredIds(storedCart));
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
    // console.log(productId)
    const updated = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];
    setWishlistIds(updated);
    localStorage.setItem("wishlistProductIds", JSON.stringify(updated));
  };

  const addToCart = (e, productId) => {
    e.stopPropagation();
    const isAlreadyInCart = cartIds.includes(productId);
    const updated = isAlreadyInCart
      ? cartIds.filter((id) => id !== productId)
      : [...cartIds, productId];
    setCartIds(updated);
    localStorage.setItem("cartProductIds", JSON.stringify(updated));
    toast.success(
      isAlreadyInCart ? "Item removed from cart" : "Item added to cart",
      {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <ToastContainer toastStyle={{ backgroundColor: "#059669", color: "#ffffff" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
        <ProductNavbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCategories={true}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          wishlistCount={wishlistIds.length}
          cartCount={cartIds.length}
          onWishlistClick={() => navigate("/product/wishlist")}
          onLoginClick={() => navigate("/login")}
        />

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
                const isLiked = wishlistIds.includes(product?._id);
                const inCart = cartIds.includes(product?._id);

                return (
                  <article
                    key={product?._id}
                    onClick={() => navigate(`/product/${product?._id}`)}
                    className="group cursor-pointer rounded-2xl bg-white border border-stone-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image}
                        alt={product?.title || "Product image"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => toggleWishlist(e, product?._id)}
                        className={`absolute right-3 top-3 h-9 w-9 rounded-full grid place-items-center border transition ${
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
                      <button
                        onClick={(e) => addToCart(e, product?._id)}
                        className={`mt-4 w-full cursor-pointer rounded-full py-2.5 text-xs uppercase tracking-[0.16em] transition ${
                          inCart
                            ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                            : "bg-stone-900 text-stone-100 hover:bg-stone-700"
                        }`}
                      >
                        {inCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
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
