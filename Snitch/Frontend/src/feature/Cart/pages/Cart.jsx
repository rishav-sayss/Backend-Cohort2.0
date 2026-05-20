import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { usecart } from "../hook/usecart";
/* ─── Design tokens (Aura Editorial) ─── */
const C = {
  bg: "#fbf9f6",
  charcoal: "#1b1c1a",
  gold: "#C9A96E",
  muted: "#767872",
  divider: "#c6c7c1",
  surface: "#f5f3f0",
};

/* ─── Hairline divider ─── */
const Divider = () => (
  <div style={{ height: "1px", backgroundColor: C.divider, width: "100%" }} />
);

/* ─── Quantity stepper ─── */
function QuantityStepper({ value, onDecrement, onIncrement, loading }) {
  const btnStyle = {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${C.charcoal}`,
    backgroundColor: "transparent",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.4 : 1,
    fontFamily: "'Manrope', sans-serif",
    fontSize: 14,
    color: C.charcoal,
    transition: "background 0.2s, color 0.2s",
    flexShrink: 0,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button
        style={btnStyle}
        onClick={onDecrement}
        disabled={loading || value <= 1}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = C.charcoal;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = C.charcoal;
        }}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        style={{
          fontFamily: "'Noto Serif', serif",
          fontSize: 16,
          color: C.charcoal,
          minWidth: 20,
          textAlign: "center",
        }}
      >
        {value}
      </span>
      <button
        style={btnStyle}
        onClick={onIncrement}
        disabled={loading}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = C.charcoal;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = C.charcoal;
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

/* ─── Single cart item row ─── */
function CartItem({ item, onQuantityChange, onRemove, loadingId }) {
  const product = item.product;
  const variantId = item.variant;
  const quantity = item.quantity;
  const price = item.price?.amount ?? product?.price?.amount ?? 0;
  const currency = item.price?.currency ?? "INR";
  const itemId = item._id;
  const productId = product?._id;
  const isLoading = loadingId === itemId;

  /* resolve variant info */
  const variantValue = product?.variants;
  const variant = Array.isArray(variantValue)
    ? variantValue.find((v) => String(v?._id) === String(variantId))
    : variantValue && String(variantValue?._id) === String(variantId)
      ? variantValue
      : variantValue || null;
  const imageUrl =
    variant?.images?.[0]?.url ||
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/120x150?text=No+Image";

  const colorAttr = variant?.attributes?.color ?? "—";
  const sizeAttr = variant?.attributes?.size ?? "—";
  const lineTotal = price * quantity;

  return (
    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Thumbnail */}
        <div
          style={{
            width: 110,
            height: 138,
            flexShrink: 0,
            backgroundColor: C.surface,
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            alt={product?.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: C.charcoal,
              lineHeight: 1.4,
              marginBottom: 6,
            }}
          >
            {product?.description || product?.title}
          </p>

          {/* Variant info */}
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.muted,
              marginBottom: 12,
            }}
          >
            Color: {colorAttr} &nbsp;|&nbsp; Size: {sizeAttr}
          </p>

          {/* Price */}
          <p
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 20,
              color: C.charcoal,
              marginBottom: 14,
            }}
          >
            ₹{price.toLocaleString("en-IN")}
          </p>

          {/* Quantity + Remove row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <QuantityStepper
              value={quantity}
              loading={isLoading}
              onDecrement={() =>
                onQuantityChange({
                  itemId,
                  productId,
                  variantId,
                  nextQty: quantity - 1,
                  currentQty: quantity,
                })
              }
              onIncrement={() =>
                onQuantityChange({
                  itemId,
                  productId,
                  variantId,
                  nextQty: quantity + 1,
                  currentQty: quantity,
                })
              }
            />

            <button
              onClick={() => onRemove(itemId)}
              disabled={isLoading}
              style={{
                background: "none",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.muted,
                opacity: isLoading ? 0.4 : 1,
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ba1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              Remove
            </button>
          </div>
        </div>

        {/* Line total */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 16,
              color: C.charcoal,
            }}
          >
            ₹{lineTotal.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Cart Page ─── */
function Cart() {
  const cartData = useSelector((state) => state.cart.items);
  const {
    handleGetCart,
    handleIncrementCartItem,
    handledecrementCartItem,
    handleRemoveItem,
    handleCreateCartOrder,
  } = usecart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loadingId, setLoadingId] = useState(null); // item _id being mutated
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const user = useSelector((state) => state.user);
  useEffect(() => {
    handleGetCart();
  }, []);

  /* ─── derived values ─── */
  const items = Array.isArray(cartData) ? cartData : (cartData?.items ?? []);
  const totalItems = items.reduce((s, i) => s + (i.quantity || 0), 0);
  const subtotal = items.reduce(
    (s, i) =>
      s +
      (i.price?.amount ?? i.product?.price?.amount ?? 0) * (i.quantity || 0),
    0,
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 1499 ? 0 : 99;
  const total = subtotal - discount + shipping;

  async function handelcheckout() {
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      const order = await handleCreateCartOrder();
      if (!order?.id) throw new Error("Order creation failed");

      const { default: Razorpay } = await import("react-razorpay");
      const options = {
        key: "rzp_test_SrTul3APi5VYqD",
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "snitch",
        description: "Test Transaction",
        order_id: order.id, // Generate order_id on server
        handler: (response) => {
          console.log(response);
          alert("Payment Successful!");
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: C.gold,
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Checkout failed", err);
      setCheckoutError("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  /* ─── handlers ─── */
  async function handleQuantityChange({
    itemId,
    productId,
    variantId,
    nextQty,
    currentQty,
  }) {
    if (nextQty < 1 || nextQty === currentQty) return;

    setLoadingId(itemId);
    try {
      if (nextQty > currentQty) {
        await handleIncrementCartItem({ productId, variantId });
      } else {
        await handledecrementCartItem({ productId, variantId });
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
    } finally {
      setLoadingId(null);
    }
  }

  async function handleRemove(itemId) {
    setLoadingId(itemId);
    try {
      await handleRemoveItem({ itemId });
    } catch (err) {
      console.error("Failed to remove item", err);
    } finally {
      setLoadingId(null);
    }
  }

  function handlePromoApply() {
    if (promoCode.trim().toUpperCase() === "SNITCH10") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try SNITCH10 for 10% off.");
    }
  }

  /* ─── empty state ─── */
  if (items.length === 0) {
    return (
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;1,300&family=Manrope:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: C.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <p
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 32,
              color: C.charcoal,
              fontWeight: 400,
            }}
          >
            Your cart is empty
          </p>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.muted,
            }}
          >
            Explore our collection and add something you love
          </p>
          <Link
            to="/product/allproducts"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              backgroundColor: C.charcoal,
              color: "#fff",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            Shop Now
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;1,300&family=Manrope:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: C.bg,
          fontFamily: "'Manrope', sans-serif",
          paddingBottom: 100,
        }}
      >
        {/* ── Top Nav ── */}

        {/* ── Page content ── */}
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          {/* Page title */}
          <div style={{ padding: "40px 0 24px" }}>
            <h1
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.charcoal,
                margin: 0,
              }}
            >
              My Cart
            </h1>
          </div>

          <Divider />

          {/* ── Two-column layout on large screens ── */}
          <div
            style={{
              display: "flex",
              gap: 60,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* ── LEFT: Item list ── */}
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              {/* Column labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px 0 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.muted,
                  }}
                >
                  Product
                </span>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.muted,
                  }}
                >
                  Total
                </span>
              </div>

              {items.map((item, idx) => (
                <React.Fragment key={item._id}>
                  <CartItem
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                    loadingId={loadingId}
                  />
                  {idx < items.length - 1 && <Divider />}
                </React.Fragment>
              ))}

              <Divider />

              {/* Continue shopping */}
              <div style={{ paddingTop: 20 }}>
                <Link
                  to="/product/allproducts"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.muted,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = C.charcoal)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Summary panel ── */}
            <div style={{ flex: "0 0 300px", paddingTop: 32 }}>
              {/* Order Summary header */}
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.charcoal,
                  marginBottom: 20,
                }}
              >
                Order Summary
              </p>

              {/* Subtotal */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottom: `1px solid ${C.divider}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    color: C.muted,
                  }}
                >
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: 14,
                    color: C.charcoal,
                  }}
                >
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottom: `1px solid ${C.divider}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    color: C.muted,
                  }}
                >
                  Shipping
                </span>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: shipping === 0 ? C.gold : C.charcoal,
                  }}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: `1px solid ${C.divider}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13,
                      color: C.muted,
                    }}
                  >
                    Discount (SNITCH10)
                  </span>
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13,
                      color: "#2e7d32",
                    }}
                  >
                    − ₹{discount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {/* Total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.charcoal,
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: 22,
                    color: C.charcoal,
                  }}
                >
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Free shipping nudge */}
              {shipping > 0 && (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    color: C.gold,
                    letterSpacing: "0.05em",
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  Add ₹{(1500 - subtotal).toLocaleString("en-IN")} more for free
                  shipping
                </p>
              )}

              <Divider />

              {/* Promo code */}
              <div style={{ paddingTop: 24, marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.charcoal,
                    marginBottom: 10,
                  }}
                >
                  Promo Code
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePromoApply()}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    style={{
                      flex: 1,
                      border: "none",
                      borderBottom: `1px solid ${C.charcoal}`,
                      backgroundColor: "transparent",
                      padding: "8px 0",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 13,
                      color: C.charcoal,
                      outline: "none",
                      opacity: promoApplied ? 0.5 : 1,
                    }}
                  />
                  <button
                    onClick={handlePromoApply}
                    disabled={promoApplied || !promoCode.trim()}
                    style={{
                      padding: "8px 18px",
                      backgroundColor: promoApplied ? C.muted : C.charcoal,
                      color: "#fff",
                      border: "none",
                      cursor:
                        promoApplied || !promoCode.trim()
                          ? "not-allowed"
                          : "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!promoApplied && promoCode.trim())
                        e.currentTarget.style.backgroundColor = C.gold;
                    }}
                    onMouseLeave={(e) => {
                      if (!promoApplied)
                        e.currentTarget.style.backgroundColor = C.charcoal;
                    }}
                  >
                    {promoApplied ? "Applied ✓" : "Apply"}
                  </button>
                </div>
              </div>

              {/* Checkout button — desktop */}

              <button
                onClick={handelcheckout}
                style={{
                  width: "100%",
                  padding: "16px 0",
                  backgroundColor: C.gold,
                  color: C.charcoal,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  transition: "opacity 0.2s",
                  opacity: checkoutLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout →"}
              </button>

              {checkoutError ? (
                <p
                  style={{
                    marginTop: 10,
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    color: "#ba1a1a",
                  }}
                >
                  {checkoutError}
                </p>
              ) : null}
              {/* Trust badges */}
              <div style={{ marginTop: 24 }}>
                {[
                  { label: "Shipping", value: "Free over ₹1,499" },
                  { label: "Returns", value: "Within 14 days" },
                  { label: "Authenticity", value: "100% Guaranteed" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: 10,
                      marginBottom: 10,
                      borderBottom: `1px solid ${C.divider}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: C.muted,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: C.muted,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky bottom bar (mobile-focused) ── */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: C.charcoal,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            zIndex: 100,
            boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                marginBottom: 2,
              }}
            >
              Total
            </p>
            <p
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: 20,
                color: "#fff",
                margin: 0,
              }}
            >
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            style={{
              padding: "14px 28px",
              backgroundColor: C.gold,
              color: C.charcoal,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Checkout →
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
