import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { UseProduct } from "../Hooks/useProduct";

function ProductDetails() {
  let { productId } = useParams();
  let { handleGetProductById } = UseProduct();
  let [product, setproduct] = useState(null);
  let [selectedImage, setSelectedImage] = useState(0);
  let [loading, setLoading] = useState(true);
  let [selectedAttributes, setSelectedAttributes] = useState({});

  const navigate = useNavigate();

  async function fetchproductdetails() {
    setLoading(true);
    let data = await handleGetProductById(productId);
    setproduct(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchproductdetails();
  }, [productId]);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedAttributes(product.variants[0].attributes || {});
    }
  }, [product]);

  const availableAttributes = useMemo(() => {
    if (!product?.variants) return {};
    const attrs = {};
    product.variants.forEach(v => {
      if (v.attributes) {
        Object.entries(v.attributes).forEach(([key, value]) => {
          if (!attrs[key]) attrs[key] = new Set();
          attrs[key].add(value);
        });
      }
    });
    Object.keys(attrs).forEach(key => {
      attrs[key] = Array.from(attrs[key]);
    });
    return attrs;
  }, [product]);

  const handleAttributeSelect = (key, value) => {
    const newAttributes = { ...selectedAttributes, [key]: value };
    let exactMatch = product.variants.find(v => 
      Object.entries(newAttributes).every(([k, vVal]) => v.attributes?.[k] === vVal)
    );
    if (exactMatch) {
      setSelectedAttributes(exactMatch.attributes || {});
    } else {
      let partialMatch = product.variants.find(v => v.attributes?.[key] === value);
      if (partialMatch) {
        setSelectedAttributes(partialMatch.attributes || {});
      }
    }
    setSelectedImage(0);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#C9A96E", borderTopColor: "transparent" }}
          ></div>
          <p
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "#7A6E63" }}
          >
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <div className="text-center">
          <h2
            className="text-3xl font-light mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1b1c1a",
            }}
          >
            Product not found.
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-xs uppercase tracking-[0.2em] underline underline-offset-4"
            style={{ color: "#C9A96E" }}
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants?.find(v => {
    if (!v.attributes) return false;
    return Object.entries(selectedAttributes).every(([key, val]) => v.attributes[key] === val);
  });

  const displayPrice = currentVariant?.price?.amount ? currentVariant.price : product.price;
  const images = currentVariant?.images?.length > 0 ? currentVariant.images : (product.images || []);
  const mainImage = images[selectedImage]?.url || "";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6", fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Nav breadcrumb ── */}
        <div
          className="border-b px-8 lg:px-16 xl:px-24 py-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]"
          style={{ borderColor: "#e4e2df", color: "#7A6E63" }}
        >
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#C9A96E] transition-colors duration-200"
          >
            Collection
          </button>
          <span>/</span>
          <span style={{ color: "#1b1c1a" }}>{product.title}</span>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

            {/* ── Left: Image Gallery ── */}
            <div className="flex flex-row gap-4">

              {/* Vertical Thumbnail Strip (left side) */}
              {images.length > 1 && (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#C9A96E transparent" }}>
                  {images.map((img, index) => (
                    <button
                      key={img._id || index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 aspect-square overflow-hidden transition-all duration-200 flex-shrink-0 ${
                        selectedImage === index
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-80"
                      }`}
                      style={
                        selectedImage === index
                          ? { outline: "2px solid #C9A96E", outlineOffset: "2px" }
                          : {}
                      }
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={img.url}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1">
                <div
                  className="relative aspect-[4/5] overflow-hidden group"
                  style={{ backgroundColor: "#f5f3f0" }}
                >
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: "#7A6E63" }}
                      >
                        No Image
                      </span>
                    </div>
                  )}

                  {/* ── Overlay arrow buttons ── */}
                  {images.length > 1 && (
                    <>
                      {/* Left / Prev button */}
                      <button
                        onClick={() => setSelectedImage((prev) => prev - 1)}
                        disabled={selectedImage === 0}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          backgroundColor: "rgba(251,249,246,0.88)",
                          backdropFilter: "blur(4px)",
                          border: "1px solid rgba(27,28,26,0.15)",
                          color: "#1b1c1a",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>

                      {/* Right / Next button */}
                      <button
                        onClick={() => setSelectedImage((prev) => prev + 1)}
                        disabled={selectedImage === images.length - 1}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          backgroundColor: "rgba(251,249,246,0.88)",
                          backdropFilter: "blur(4px)",
                          border: "1px solid rgba(27,28,26,0.15)",
                          color: "#1b1c1a",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>

                      {/* Dot indicators — bottom centre */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                            style={{
                              backgroundColor: i === selectedImage ? "#C9A96E" : "rgba(251,249,246,0.6)",
                              transform: i === selectedImage ? "scale(1.3)" : "scale(1)",
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Product Info ── */}
            <div className="flex flex-col justify-start pt-2">
              {/* Label */}
              <span
                className="text-[10px] uppercase tracking-[0.24em] font-medium mb-5 block"
                style={{ color: "#C9A96E" }}
              >
                Premium Collection
              </span>

              {/* Title */}
              <h1
                className="text-4xl xl:text-5xl font-light leading-tight mb-5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-8">
                <span
                  className="text-2xl font-light tracking-wide"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1b1c1a",
                  }}
                >
                  {displayPrice?.currency}{" "}
                  {displayPrice?.amount?.toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className="w-12 h-px mb-8" style={{ backgroundColor: "#C9A96E" }}></div>

              {/* Description */}
              <p
                className="text-sm leading-[1.9] mb-10"
                style={{ color: "#7A6E63" }}
              >
                {product.description}
              </p>

              {/* ── Variants Selection ── */}
              {Object.keys(availableAttributes).length > 0 && (
                <div className="mb-10 flex flex-col gap-6">
                  {Object.entries(availableAttributes).map(([attrKey, attrValues]) => (
                    <div key={attrKey}>
                      <span
                        className="text-[10px] uppercase tracking-[0.18em] mb-3 block"
                        style={{ color: "#7A6E63" }}
                      >
                        {attrKey}
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {attrValues.map((val) => {
                          const isSelected = selectedAttributes[attrKey] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => handleAttributeSelect(attrKey, val)}
                              className={`py-2 px-5 text-[11px] uppercase tracking-[0.1em] border transition-all duration-300 ${
                                isSelected
                                  ? "bg-[#1b1c1a] text-[#fbf9f6] border-[#1b1c1a]"
                                  : "bg-transparent text-[#1b1c1a] border-[#e4e2df] hover:border-[#1b1c1a]"
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── CTA Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {/* Add to Cart */}
                <button
                  className="flex-1 py-4 px-8 text-[11px] uppercase tracking-[0.22em] font-medium border transition-all duration-300 hover:bg-[#1b1c1a] hover:text-[#fbf9f6] hover:border-[#1b1c1a]"
                  style={{
                    borderColor: "#1b1c1a",
                    color: "#1b1c1a",
                    backgroundColor: "transparent",
                  }}
                >
                  Add to Cart
                </button>

                {/* Buy Now */}
                <button
                  className="flex-1 py-4 px-8 text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: "#C9A96E",
                    color: "#fbf9f6",
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* ── Meta info ── */}
              <div
                className="border-t pt-8 flex flex-col gap-4"
                style={{ borderColor: "#e4e2df" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] w-20 flex-shrink-0"
                    style={{ color: "#7A6E63" }}
                  >
                    SKU
                  </span>
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: "#1b1c1a" }}
                  >
                    {(currentVariant?._id || product._id)?.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] w-20 flex-shrink-0"
                    style={{ color: "#7A6E63" }}
                  >
                    Images
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: "#1b1c1a" }}
                  >
                    {images.length} photo{images.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          className="border-t py-12 text-center"
          style={{ borderColor: "#e4e2df" }}
        >
          <span
            className="text-[20px] uppercase tracking-[0.35em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
}

export default ProductDetails;
