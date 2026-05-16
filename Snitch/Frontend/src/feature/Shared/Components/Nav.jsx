import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Auth/Hooks/auth.hooks";
import { setuser } from "../../Auth/state/auth.slice";
import { usecart } from "../../Cart/hook/usecart";

/* ── Icons ── */
const IconProfile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21a8 8 0 1 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.55H18a2 2 0 0 0 1.95-1.56L21 7H7" />
  </svg>
);

/* Power-off circle — universally recognised as "sign out" */
const IconLogout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

/* Key — universally recognised as "sign in / unlock" */
const IconLogin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5l3 3" />
    <path d="M18 5l2 2" />
  </svg>
);

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ── Reusable icon button ── */
function NavIconBtn({ children, label, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex items-center justify-center w-[34px] h-[34px] rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer flex-shrink-0"
    >
      {children}
      {badge && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ── Main Nav ── */
function Nav({
  searchQuery = "",
  onSearchChange,
  wishlistCount,
  cartCount,
  onWishlistClick,
  onCartClick,
  onProfileClick,
  onLoginClick,
  showLogin = true,
  className = "",
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);  // live cart from Redux
  const liveCartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;
  const [userData, setUserData] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { handelgetme } = useAuth();
  const { handleGetCart } = usecart();

  useEffect(() => {
    handelgetme()
      .then((d) => {
        if (d) {
          setUserData(d);
          dispatch(setuser(d)); // persist in Redux so cart icon stays visible on all pages
          handleGetCart().catch(() => {}); // fetch cart so badge updates on refresh
        }
      })
      .catch(() => {});
  }, []);

  const isLoggedIn = Boolean(reduxUser || userData);
  const profileData = userData || reduxUser || null;

  const handleLogout = () => {
    setUserData(null);
    dispatch(setuser(null));
    setShowProfilePopup(false);
    navigate("/login");
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 h-14 flex items-center px-6 sm:px-8 bg-white border-b border-gray-200 ${className}`}>

        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="text-[13px] font-semibold tracking-[0.28em] uppercase text-gray-900 bg-transparent border-none cursor-pointer p-0"
        >
          Snitch
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="relative mr-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <IconSearch />
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search products..."
            className="h-9 w-48 sm:w-56 pl-8 pr-4 text-[13px] text-gray-700 bg-gray-50 border border-gray-200 rounded-full outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400"
          />
        </div>

        {/* Icon buttons */}
        <div className="flex items-center gap-1.5">

          {/* Profile */}
          <NavIconBtn
            label="Profile"
            onClick={() => { if (onProfileClick) { onProfileClick(); return; } setShowProfilePopup(true); }}
          >
            <IconProfile />
          </NavIconBtn>

          {/* Wishlist */}
          <NavIconBtn
            label="Wishlist"
            badge={wishlistCount > 0 ? wishlistCount : null}
            onClick={() => { if (onWishlistClick) { onWishlistClick(); return; } navigate("/product/wishlist"); }}
          >
            <IconHeart />
          </NavIconBtn>

          {/* Cart — logged-in only, badge from live Redux cart state */}
          {isLoggedIn && (
            <NavIconBtn
              label="Cart"
              badge={liveCartCount > 0 ? liveCartCount : null}
              onClick={() => { if (onCartClick) { onCartClick(); return; } navigate("/cart"); }}
            >
              <IconCart />
            </NavIconBtn>
          )}

          {/* Login / Logout toggle */}
          {isLoggedIn ? (
            <NavIconBtn label="Logout" onClick={handleLogout}>
              <IconLogout />
            </NavIconBtn>
          ) : (
            <NavIconBtn
              label="Login"
              onClick={() => { if (onLoginClick) { onLoginClick(); return; } navigate("/login"); }}
            >
              <IconLogin />
            </NavIconBtn>
          )}
        </div>
      </nav>

      {/* ── Profile popup ── */}
      {showProfilePopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 px-4"
          onClick={() => setShowProfilePopup(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[15px] font-semibold text-gray-900">Profile</p>
              <button
                onClick={() => setShowProfilePopup(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 cursor-pointer text-sm transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            {profileData ? (
              <div className="flex flex-col gap-3">
                {[
                  ["Name", profileData.fullName || profileData.fullname || profileData.name],
                  ["Email", profileData.email],
                  ["Phone", profileData.phone],
                  ["Role", profileData.role || "User"],
                ].map(([label, value]) => value && (
                  <div key={label} className="flex gap-3">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider min-w-[48px] pt-px">
                      {label}
                    </span>
                    <span className="text-[13px] text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-gray-500">
                Please log in to view your profile.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
