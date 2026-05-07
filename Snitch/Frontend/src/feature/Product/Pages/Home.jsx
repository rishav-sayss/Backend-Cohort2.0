import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";
import { Link, useNavigate } from "react-router";

/* ── SVGs ── */
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const TruckIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const LockIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

/* ── Helpers ── */
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const reduxUser = useSelector((state) => state.auth.user);
  const { handelgetallproducts } = UseProduct();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = reduxUser;

  useEffect(() => {
    handelgetallproducts();
  }, [handelgetallproducts]);

  const trendingProducts = products?.slice(0, 8) || [];
  const newArrivals = products?.slice(8, 16) || products?.slice(0, 4) || []; // Fallback if fewer products

  const searchResults = searchQuery
    ? products?.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.3s ease-out forwards;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAFAFA]"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#111111",
        }}
      >
        {/* ══════════════ NAVBAR ══════════════ */}
        <header className="sticky top-0 z-50 w-full flex items-center justify-between h-[72px] px-[max(4vw,32px)] bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
          {/* Left - New Collection */}
          <div className="flex-1">
            <Link
              to="/products"
              className="text-[13px] font-medium tracking-wide hover:text-gray-500 transition-colors duration-200"
            >
              New Collection
            </Link>
          </div>

          {/* Center - Brand */}
          <div
            className="flex-1 text-center cursor-pointer select-none no-underline"
            onClick={() => navigate("/")}
          >
            <span
              className="text-2xl tracking-[0.15em] uppercase font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Snitch
            </span>
          </div>

          {/* Right - Icons */}
          <div className="flex-1 flex justify-end items-center gap-6 relative">
            {/* Search Container */}
            <div className="flex items-center">
              {isSearchOpen && (
                <div className="mr-3 animate-fade-in-right">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm w-[150px] md:w-[200px] transition-all duration-300 pb-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
              <button 
                className={`text-gray-800 hover:text-gray-500 transition-colors ${isSearchOpen ? 'text-black' : ''}`}
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery("");
                }}
              >
                <SearchIcon />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute top-[45px] right-0 w-[300px] md:w-[400px] max-h-[400px] bg-white border border-gray-100 shadow-2xl overflow-y-auto z-50 rounded-sm">
                {searchResults?.length > 0 ? (
                  searchResults.map((product) => (
                    <div 
                      key={product._id} 
                      className="flex gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <img 
                        src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop"} 
                        alt={product.title} 
                        className="w-16 h-20 object-cover bg-gray-100" 
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</span>
                        <span className="text-xs text-gray-500 mt-1">
                          {product.price?.currency || "$"}{product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            <button className="text-gray-800 hover:text-gray-500 transition-colors">
              <HeartIcon />
            </button>
            <button className="text-gray-800 hover:text-gray-500 transition-colors">
              <CartIcon />
            </button>

            {user ? (
              <div
                className="flex items-center gap-[10px] cursor-pointer"
                title={user.fullname || user.name || user.username}
              >
                <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold tracking-[0.05em] bg-gray-900 text-white">
                  {getInitials(user.fullname || user.name || user.username)}
                </div>
              </div>
            ) : (
              <button className="text-gray-800 hover:text-gray-500 transition-colors">
                <UserIcon />
              </button>
            )}
          </div>
        </header>

        {/* ══════════════ HERO SECTION ══════════════ */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={HERO_IMG}
              alt="Fashion Models"
              className="w-full h-full object-cover object-top"
            />
            {/* Dark Overlay for text visibility */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">
            <h1
              className="text-5xl md:text-7xl text-white font-medium mb-6 leading-tight tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Discover Your Style
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-light mb-10 max-w-xl mx-auto">
              Explore the latest trends in fashion with our new collection
            </p>
            <Link
              to="/product/allproducts"
              className="group inline-flex items-center justify-center px-10 py-4 bg-white text-black text-[13px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </section>

        {/* ══════════════ FEATURED PRODUCTS (Trending Now) ══════════════ */}
        <section className="px-[max(4vw,32px)] py-24 max-w-[1440px] w-full mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2
              className="text-3xl md:text-4xl text-center mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trending Now
            </h2>
            <div className="w-16 h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {trendingProducts.map((product) => {
              const imageUrl =
                product.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop";
              const isHovered = hoveredCard === product._id;

              return (
                <div
                  key={product._id}
                  className="group flex flex-col cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                  onMouseEnter={() => setHoveredCard(product._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-5">
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Add to Cart Overlay Button */}
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        className="w-full py-3 bg-white/95 backdrop-blur-sm text-black text-xs font-semibold tracking-wider uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                         
                          navigate(`/product/${product._id}`)
                          // console.log("Add to cart", product._id);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col text-center px-2">
                    <h3 className="text-[14px] font-medium text-gray-900 mb-2 truncate group-hover:text-gray-500 transition-colors">
                      {product.title}
                    </h3>
                    <h4 className="text-[14px] font-medium text-gray-900 mb-2 truncate group-hover:text-gray-500 transition-colors">
                      {product.description}
                    </h4>
                    <span className="text-[13px] text-gray-600">
                      {product.price?.currency || "$"}&nbsp;
                      {product.price?.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════ NEW ARRIVALS ══════════════ */}
        {/* <section className="bg-[#F5F5F5] py-24">
          <div className="px-[max(4vw,32px)] max-w-[1440px] w-full mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2
                  className="text-3xl md:text-4xl mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  New Arrivals
                </h2>
                <div className="w-16 h-px bg-gray-400"></div>
              </div>
              <Link
                to="/products"
                className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
              >
                View All
              </Link>
            </div>

            <div
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {newArrivals.map((product) => {
                const imageUrl =
                  product.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop";

                return (
                  <div
                    key={`new-${product._id}`}
                    className="group min-w-[280px] md:min-w-[320px] snap-start cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-white mb-5">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[14px] font-medium text-gray-900 mb-1 truncate group-hover:text-gray-500 transition-colors">
                        {product.title}
                      </h3>
                      <h3 className="text-[14px] font-medium text-gray-900 mb-1 truncate group-hover:text-gray-500 transition-colors">
                        {product.description}
                      </h3>
                      <span className="text-[13px] text-gray-600">
                        {product.price?.currency || "$"}&nbsp;
                        {product.price?.amount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* ══════════════ WHY CHOOSE US ══════════════ */}
        <section className="py-24 border-t border-gray-200 bg-white">
          <div className="px-[max(4vw,32px)] max-w-[1200px] w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-5 text-gray-800">
                  <TruckIcon />
                </div>
                <h4 className="text-sm font-semibold tracking-wide uppercase mb-3">
                  Free Delivery
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  Complimentary shipping on all orders over $150.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-5 text-gray-800">
                  <RefreshIcon />
                </div>
                <h4 className="text-sm font-semibold tracking-wide uppercase mb-3">
                  Easy Returns
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  30-day return policy for a full refund or exchange.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-5 text-gray-800">
                  <LockIcon />
                </div>
                <h4 className="text-sm font-semibold tracking-wide uppercase mb-3">
                  Secure Payment
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  Safe and encrypted checkout process.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-5 text-gray-800">
                  <ShieldIcon />
                </div>
                <h4 className="text-sm font-semibold tracking-wide uppercase mb-3">
                  Quality Guarantee
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                  Premium materials and expert craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer className="bg-[#FAFAFA] border-t border-gray-200 pt-16 pb-8">
          <div className="px-[max(4vw,32px)] max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <span
                  className="text-xl tracking-[0.15em] uppercase font-semibold block mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Snitch
                </span>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Discover the latest fashion trends and elevate your wardrobe
                  with our curated collections.
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold tracking-widest uppercase mb-6">
                  Shop
                </h5>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      to="/products"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Trending Now
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Collections
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-semibold tracking-widest uppercase mb-6">
                  Support
                </h5>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      to="/contact"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shipping"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Shipping &amp; Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-semibold tracking-widest uppercase mb-6">
                  Newsletter
                </h5>
                <p className="text-sm text-gray-500 mb-4">
                  Subscribe to receive updates, access to exclusive deals, and
                  more.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-white"
                  />
                  <button className="bg-black text-white px-6 text-xs font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400 tracking-wide mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Snitch. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-black tracking-wider uppercase transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-black tracking-wider uppercase transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-black tracking-wider uppercase transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
