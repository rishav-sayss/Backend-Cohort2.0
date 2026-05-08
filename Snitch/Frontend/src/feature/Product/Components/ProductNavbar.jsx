import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/Hooks/auth.hooks";
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

const CART_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.55H18a2 2 0 0 0 1.95-1.56L21 7H7" />
  </svg>
);

function ProductNavbar({
  searchQuery = "",
  onSearchChange,
  showCategories = false,
  activeCategory = "all",
  onCategoryChange,
  wishlistCount = 0,
  cartCount = 0,
  onWishlistClick,
  onCartClick,
  onProfileClick,
  showLogin = true,
  onLoginClick,
}) {
  const navigate = useNavigate();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [userData, setUserData] = useState(null);
  let { handelgetme } = useAuth();
  async function userdetails() {
    let userdetail = await handelgetme();
    setUserData(userdetail || null);
  }

  useEffect(() => {
    userdetails()
  }, []);

  const profileData = useMemo(() => {
    if (userData) return userData;
    const possibleKeys = [
      "user",
      "userData",
      "authUser",
      "profile",
      "currentUser",
    ];
    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      } catch (error) {
        // ignore invalid JSON and continue checking other keys
      }
    }
    return null;
  }, [showProfilePopup, userData]);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
      return;
    }
    setShowProfilePopup(true);
  };

  return (
    <>
      <nav className="rounded-2xl border border-stone-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-2xl tracking-[0.24em] font-light uppercase cursor-pointer"
          >
            Snitch
          </button>

          {showCategories && (
            <div className="flex items-center gap-2 rounded-full bg-stone-100 p-1 self-start lg:self-auto">
              {["all", "men", "women"].map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange?.(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] rounded-full cursor-pointer transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-stone-900 text-stone-100"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search products..."
              className="h-10 w-full sm:w-52 md:w-60 rounded-full border border-stone-300 bg-white px-4 text-sm outline-none transition focus:border-stone-700"
            />

            <button
              onClick={handleProfileClick}
              className="h-10 w-10 rounded-full border border-stone-300 cursor-pointer grid place-items-center hover:bg-stone-100 transition"
              aria-label="Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21a8 8 0 1 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              onClick={onWishlistClick}
              className="relative h-10 w-10 rounded-full border border-stone-300 cursor-pointer grid place-items-center hover:bg-stone-100 transition"
              aria-label="Wishlist"
            >
              {HEART_ICON(false)}
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] px-1 rounded-full bg-stone-900 text-white text-[10px] leading-[18px] text-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative h-10 w-10 rounded-full cursor-pointer border border-stone-300 grid place-items-center hover:bg-stone-100 transition"
              aria-label="Cart"
            >
              {CART_ICON}
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] px-1 rounded-full bg-stone-900 text-white text-[10px] leading-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {showLogin && (
              <button
                onClick={onLoginClick}
                className="h-10 px-5 rounded-full cursor-pointer bg-stone-900 text-stone-100 text-xs uppercase tracking-[0.16em] hover:bg-stone-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {showProfilePopup && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowProfilePopup(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">
                User Profile
              </h3>
              <button
                onClick={() => setShowProfilePopup(false)}
                className="h-8 w-8 rounded-full border border-stone-300 grid place-items-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                aria-label="Close profile popup"
              >
                ×
              </button>
            </div>

            {profileData ? (
              <div className="space-y-2 text-sm text-stone-700">
                <p>
                  <span className="font-medium text-stone-900">Name:</span>{" "}
                  {profileData.fullName || profileData.fullname || profileData.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-stone-900">Email:</span>{" "}
                  {profileData.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-stone-900">Phone:</span>{" "}
                  {profileData.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-stone-900">Role:</span>{" "}
                  {profileData.role || "User"}
                </p>
              </div>
            ) : (
              <p className="text-sm text-stone-600">
                User data not found. Please login to view profile details.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductNavbar;
