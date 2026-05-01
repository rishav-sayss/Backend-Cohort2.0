import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UseProduct } from "../Hooks/useProduct";
import { Link, useNavigate } from "react-router";

/* ── Helpers ── */
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

const firstName = (name) => (name ? name.split(" ")[0] : "");

const HERO_IMG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop";

/* ─────────────────────────────────────────
   HOME COMPONENT
───────────────────────────────────────── */
const Home = () => {
  const products = useSelector((state) => state.product.products);
  const reduxUser = useSelector((state) => state.auth.user);
  console.log(reduxUser)
  const { handelgetallproducts } = UseProduct();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [email, setEmail] = useState("");

  const user = reduxUser  

  useEffect(() => {
    handelgetallproducts();
  }, []);

  return (
    <>
      {/* ── Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex flex-col overflow-x-hidden"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Manrope', sans-serif",
          color: "#1b1c1a",
        }}
      >
        {/* ══════════════ HEADER ══════════════ */}
        <header
          className="sticky top-0 z-50 w-full flex items-center justify-between h-[72px] px-[max(4vw,32px)]"
          style={{
            backgroundColor: "#fbf9f6f0",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid #e4e2df",
          }}
        >
          {/* Logo */}
          <span
            className="text-[22px] tracking-[0.22em] uppercase cursor-pointer select-none no-underline"
            style={{
              fontFamily: "'Noto Serif', serif",
              fontWeight: 400,
              color: "#1b1c1a",
            }}
            onClick={() => navigate("/")}
          >
            Snitch
          </span>

          {/* Nav + User */}
          <nav className="flex items-center gap-10">
            {[
              { to: "/products", label: "Collection" },
              { to: "/archive", label: "Archive" },
              { to: "/about", label: "Atelier" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[11px] font-semibold tracking-[0.18em] uppercase no-underline pb-[2px] border-b border-transparent transition-colors duration-200 hover:text-[#C9A96E] hover:border-[#C9A96E]"
                style={{ color: "#1b1c1a" }}
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <span className="w-px h-6 bg-[#e4e2df]" />

            {/* User Pill */}
            {user && (
              <div className="flex items-center gap-[10px] cursor-pointer">
                {/* Avatar */}
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-bold tracking-[0.05em] flex-shrink-0"
                  style={{
                    backgroundColor: "#1b1c1a",
                    color: "#fbf9f6",
                    border: "1.5px solid #e4e2df",
                  }}
                >
                  {getInitials(user.fullname || user.name || user.username)}
                </div>

                {/* Name + Role */}
                <div className="flex flex-col leading-[1.2]">
                  <span
                    className="text-[12px] font-semibold tracking-[0.08em] capitalize"
                    style={{ color: "#1b1c1a" }}
                  >
                    {user.fullname || user.name || user.username}
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-[0.18em] uppercase"
                    style={{ color: "#C9A96E" }}
                  >
                    {user.role}
                  </span>
                </div>

              </div>
            )}
          </nav>
        </header>

        {/* ══════════════ HERO ══════════════ */}
        <section
          className="grid grid-cols-2 min-h-[88vh]"
          style={{ borderBottom: "1px solid #e4e2df" }}
        >
          {/* Left — Image */}
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: "#f5f3f0" }}
          >
            <img
              src={HERO_IMG}
              alt="Snitch editorial"
              className="w-full h-full object-cover block transition-transform duration-[8000ms] ease-linear hover:scale-105"
              style={{ filter: "grayscale(18%)" }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
              style={{
                background: "linear-gradient(to top, #fbf9f6cc, transparent)",
              }}
            />
          </div>

          {/* Right — Text */}
          <div className="flex flex-col justify-center gap-8 px-[max(4vw,48px)] py-16">
            <span
              className="text-[11px] font-semibold tracking-[0.25em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              The Curated Series
            </span>

            <h1
              className="text-[clamp(40px,5.5vw,80px)] font-light leading-[1.08] tracking-[-0.02em] m-0"
              style={{ fontFamily: "'Noto Serif', serif", color: "#1b1c1a" }}
            >
              Silence&nbsp;&amp;
              <br />
              Structure
            </h1>

            {user && (
              <p
                className="text-[13px] font-medium tracking-[0.04em]"
                style={{ color: "#7A6E63" }}
              >
                Welcome back,&nbsp;
                <strong style={{ color: "#1b1c1a" }}>
                  {firstName(user.fullname || user.name || user.username)}
                </strong>
                . Curated for you.
              </p>
            )}

            <p
              className="text-base leading-[1.7] max-w-[440px] m-0"
              style={{ color: "#7A6E63" }}
            >
              A collection defined by silence and structure. Tailored for
              the&nbsp;modern minimalist.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase border-none cursor-pointer px-8 py-4 self-start no-underline transition-colors duration-300 hover:bg-[#C9A96E]"
              style={{ backgroundColor: "#1b1c1a", color: "#fbf9f6" }}
            >
              Shop Collection
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* ══════════════ SELECTED PIECES ══════════════ */}
        <main className="flex-1">
          <div className="px-[max(4vw,32px)] pt-20 pb-12 max-w-[1400px] w-full mx-auto box-border">
            {/* Section Header */}
            <div
              className="flex items-baseline justify-between mb-12 pb-5"
              style={{ borderBottom: "1px solid #e4e2df" }}
            >
              <h2
                className="text-[28px] font-normal tracking-[-0.01em] m-0"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Selected Pieces
              </h2>
              <Link
                to="/products"
                className="text-[10px] font-bold tracking-[0.2em] uppercase no-underline pb-[2px] transition-colors duration-200 hover:text-[#1b1c1a]"
                style={{ color: "#7A6E63", borderBottom: "1px solid #e4e2df" }}
              >
                View All
              </Link>
            </div>

            {/* Product Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-3 gap-x-8 gap-y-12">
                {products.map((product) => {
                  const imageUrl =
                    product.images && product.images.length > 0
                      ? product.images[0].url
                      : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop";

                  const isHovered = hoveredCard === product._id;

                  return (
                    <div
                      key={product._id}
                      className="cursor-pointer flex flex-col gap-4"
                      onClick={() => navigate(`/product/${product._id}`)}
                      onMouseEnter={() => setHoveredCard(product._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Image */}
                      <div
                        className="aspect-[3/4] overflow-hidden relative"
                        style={{ backgroundColor: "#f5f3f0" }}
                      >
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover block transition-transform duration-700"
                          style={{
                            transform: isHovered ? "scale(1.06)" : "scale(1)",
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-[6px]">
                        <h3
                          className="text-[17px] font-normal m-0 leading-[1.3] transition-colors duration-[250ms]"
                          style={{
                            fontFamily: "'Noto Serif', serif",
                            color: isHovered ? "#C9A96E" : "#1b1c1a",
                          }}
                        >
                          {product.title}
                        </h3>
                        <p
                          className="text-[12px] leading-[1.6] m-0 line-clamp-2"
                          style={{ color: "#7A6E63" }}
                        >
                          {product.description}
                        </p>
                        <span
                          className="text-[11px] font-bold tracking-[0.14em] uppercase mt-1"
                          style={{ color: "#1b1c1a" }}
                        >
                          {product.price?.currency}&nbsp;
                          {product.price?.amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="py-32 flex flex-col items-center gap-4 text-center">
                <h2
                  className="text-[24px] font-normal m-0"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  No pieces available.
                </h2>
                <p
                  className="text-sm leading-[1.7] max-w-[360px] m-0"
                  style={{ color: "#7A6E63" }}
                >
                  We are currently preparing our next collection. Please check
                  back later.
                </p>
              </div>
            )}
          </div>

          {/* ══════════════ NEWSLETTER ══════════════ */}
          <div
            className="px-[max(4vw,32px)] py-20 text-center"
            style={{
              backgroundColor: "#f0eeeb",
              borderTop: "1px solid #e4e2df",
              borderBottom: "1px solid #e4e2df",
            }}
          >
            <p
              className="text-[clamp(20px,2.5vw,30px)] font-normal mx-auto mb-8 max-w-[540px] leading-[1.4]"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Join our inner circle for exclusive access to archival releases.
            </p>

            <div className="flex justify-center max-w-[480px] mx-auto">
              <input
                type="email"
                placeholder={user?.email || "your@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-[14px] px-5 text-[12px] outline-none tracking-[0.04em]"
                style={{
                  border: "1px solid #1b1c1a",
                  borderRight: "none",
                  backgroundColor: "#fbf9f6",
                  color: "#1b1c1a",
                  fontFamily: "'Manrope', sans-serif",
                }}
              />
              <button
                className="py-[14px] px-6 text-[10px] font-bold tracking-[0.18em] uppercase cursor-pointer"
                style={{
                  backgroundColor: "#1b1c1a",
                  color: "#fbf9f6",
                  border: "1px solid #1b1c1a",
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </main>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer
          className="px-[max(4vw,32px)] pt-14 pb-10"
          style={{ borderTop: "1px solid #e4e2df" }}
        >
          {/* Top Row */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-12 mb-12 items-start">
            {/* Brand */}
            <div>
              <div
                className="text-[18px] tracking-[0.22em] uppercase font-normal"
                style={{ fontFamily: "'Noto Serif', serif", color: "#1b1c1a" }}
              >
                Snitch
              </div>
              <p
                className="mt-[14px] text-[12px] leading-[1.7] max-w-[260px]"
                style={{ color: "#7A6E63" }}
              >
                A curation of premium minimalist pieces for the discerning
                modern wardrobe.
              </p>
            </div>

            {/* Shop */}
            <div className="flex flex-col gap-[14px]">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                style={{ color: "#1b1c1a" }}
              >
                Shop
              </span>
              {[
                { to: "/products", label: "Collection" },
                { to: "/archive", label: "Archive" },
                { to: "/about", label: "Atelier" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] no-underline tracking-[0.06em] transition-colors duration-200 hover:text-[#1b1c1a]"
                  style={{ color: "#7A6E63" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-[14px]">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                style={{ color: "#1b1c1a" }}
              >
                Info
              </span>
              {[
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/shipping", label: "Shipping" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] no-underline tracking-[0.06em] transition-colors duration-200 hover:text-[#1b1c1a]"
                  style={{ color: "#7A6E63" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-[14px]">
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                style={{ color: "#1b1c1a" }}
              >
                Legal
              </span>
              {[
                { to: "/privacy", label: "Privacy" },
                { to: "/terms", label: "Terms" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] no-underline tracking-[0.06em] transition-colors duration-200 hover:text-[#1b1c1a]"
                  style={{ color: "#7A6E63" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex justify-between items-center pt-6"
            style={{ borderTop: "1px solid #e4e2df" }}
          >
            <span
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{ color: "#7A6E63" }}
            >
              © {new Date().getFullYear()} Snitch. All rights reserved.
            </span>

            <div className="flex gap-6">
              {[
                { href: "https://instagram.com", label: "Instagram" },
                { href: "https://pinterest.com", label: "Pinterest" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] no-underline tracking-[0.06em] transition-colors duration-200 hover:text-[#1b1c1a]"
                  style={{ color: "#7A6E63" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
