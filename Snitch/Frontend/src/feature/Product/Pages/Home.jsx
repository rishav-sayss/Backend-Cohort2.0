import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth.user);
  const { handelgetallproducts } = UseProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handelgetallproducts();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 flex flex-col"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Manrope', sans-serif",
          color: "#1b1c1a",
        }}
      >
        {/* ── Header ── */}
        <header className="w-full py-8 px-8 lg:px-16 flex justify-between items-center border-b border-[#e4e2df]">
          <div
            className="text-2xl tracking-widest uppercase font-medium cursor-pointer"
            style={{ fontFamily: "'Noto Serif', serif" }}
            onClick={() => navigate("/")}
          >
            SNITCH
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8 items-center">
              <Link to="/products" className="text-sm uppercase tracking-widest hover:text-[#C9A96E] transition-colors">Archive</Link>
              <Link to="/about" className="text-sm uppercase tracking-widest hover:text-[#C9A96E] transition-colors">About</Link>
            </nav>
            
            {/* User Profile */}
            {user && (
              <div className="flex items-center gap-3 cursor-pointer">
                {user.profilePic || user.avatar ? (
                  <img 
                    src={user.profilePic || user.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border border-[#e4e2df]" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1b1c1a] flex items-center justify-center text-xs text-[#fbf9f6] font-medium">
                    {getInitials(user.name || user.username)}
                  </div>
                )}
                <span className="text-xs uppercase tracking-widest font-medium hidden sm:block" style={{ color: "#1b1c1a" }}>
                  {user.name || user.username}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="flex-grow max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 w-full">
          {/* ── Hero Section ── */}
          <div className="pt-24 pb-20 text-center flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-[0.24em] font-medium mb-6"
              style={{ color: "#C9A96E" }}
            >
              {user && (user.name || user.username) ? "Welcome Back" : "The Curated Series"}
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              {user && (user.name || user.username) ? (user.name || user.username) : "Silence and Structure"}
            </h1>
            <p
              className="max-w-xl mx-auto text-sm md:text-base leading-relaxed"
              style={{ color: "#7A6E63" }}
            >
              Discover our latest curation of premium minimalist pieces,
              meticulously designed for effortless elegance and enduring quality.
            </p>
          </div>

          {/* ── Product Grid ── */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pb-32">
              {products.map((product) => {
                const imageUrl =
                  product.images && product.images.length > 0
                    ? product.images[0].url
                    : "/snitch_editorial_warm.png"; // Fallback

                return (
                  <div
                    onClick={() => navigate(`/product/${product._id}`)}
                    key={product._id}
                    className="group cursor-pointer flex flex-col"
                  >
                    {/* Image Container */}
                    <div
                      className="aspect-[3/4] overflow-hidden mb-6"
                      style={{ backgroundColor: "#f5f3f0" }}
                    >
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-lg leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        {product.title}
                      </h3>

                      <p
                        className="text-xs line-clamp-2 leading-relaxed"
                        style={{ color: "#7A6E63" }}
                      >
                        {product.description}
                      </p>

                      <div className="mt-2">
                        <span className="text-xs uppercase tracking-[0.15em] font-medium">
                          {product.price?.currency}{" "}
                          {product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center">
              <h2
                className="text-2xl mb-4"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                No pieces available.
              </h2>
              <p
                className="max-w-md mx-auto text-sm leading-relaxed"
                style={{ color: "#7A6E63" }}
              >
                We are currently preparing our next collection. Please check back later.
              </p>
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer
          className="border-t py-12 px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderColor: "#e4e2df" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ fontFamily: "'Noto Serif', serif", color: "#1b1c1a" }}
          >
            © {new Date().getFullYear()} SNITCH
          </span>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest" style={{ color: "#7A6E63" }}>
            <Link to="/about" className="hover:text-[#1b1c1a] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#1b1c1a] transition-colors">Contact</Link>
            <Link to="/archive" className="hover:text-[#1b1c1a] transition-colors">Archive</Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
