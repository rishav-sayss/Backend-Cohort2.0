import React, { useEffect, useState } from "react";
import { UseProduct } from "../Hooks/useProduct";
import { useParams } from "react-router";

function SellerProductDetails() {
  const [product, setproduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [variantForm, setVariantForm] = useState({
    priceAmount: "",
    priceCurrency: "INR",
    stock: 0,
    attributeText: "size:M,color:Black",
    imageUrls: "",
  });

  const [stockEdits, setStockEdits] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const { productId } = useParams();
  const {
    handleGetProductById,
    handleCreateProductVariant,
    handleUpdateProductVariantStock,
  } = UseProduct();

  async function fetchproductdetail() {
    try {
      setLoading(true);
      setError("");
      const data = await handleGetProductById(productId);
      setproduct(data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load product details",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchproductdetail();
  }, [productId]);

  function parseAttributes(text) {
    const obj = {};
    if (!text.trim()) return obj;

    text.split(",").forEach((pair) => {
      const [rawKey, ...rawValue] = pair.split(":");
      const key = rawKey?.trim();
      const value = rawValue.join(":").trim();
      if (key && value) obj[key] = value;
    });

    return obj;
  }

  function parseImages(text) {
    if (!text.trim()) return [];
    return text
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ url }));
  }

  async function onCreateVariant(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        priceAmount: Number(variantForm.priceAmount),
        priceCurrency: variantForm.priceCurrency,
        stock: Number(variantForm.stock) || 0,
        attributes: parseAttributes(variantForm.attributeText),
        images: parseImages(variantForm.imageUrls),
      };

      const updatedProduct = await handleCreateProductVariant(
        productId,
        payload,
      );
      setproduct(updatedProduct);
      setMessage("Variant created successfully");
      setVariantForm({
        priceAmount: "",
        priceCurrency: variantForm.priceCurrency,
        stock: 0,
        attributeText: "size:M,color:Black",
        imageUrls: "",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create variant");
    } finally {
      setSaving(false);
    }
  }

  async function onUpdateStock(variantId) {
    const nextStock = Number(stockEdits[variantId]);
    if (Number.isNaN(nextStock)) return;

    setSaving(true);
    setMessage("");
    setError("");
    try {
      const updatedProduct = await handleUpdateProductVariantStock(
        productId,
        variantId,
        nextStock,
      );
      setproduct(updatedProduct);
      setMessage("Stock updated successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update stock");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] text-[#1B1C1A] flex items-center justify-center font-sans">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] text-[#1B1C1A] flex items-center justify-center font-sans">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase">
          Product not found
        </p>
      </div>
    );
  }

  const variants = product.variants || [];

  const incrementStock = (variantId) => {
    setStockEdits((prev) => {
      const current = Number(
        prev[variantId] ??
          product.variants.find((v) => v._id === variantId)?.stock ??
          0,
      );
      return { ...prev, [variantId]: current + 1 };
    });
  };

  const decrementStock = (variantId) => {
    setStockEdits((prev) => {
      const current = Number(
        prev[variantId] ??
          product.variants.find((v) => v._id === variantId)?.stock ??
          0,
      );
      return { ...prev, [variantId]: Math.max(0, current - 1) };
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    const fileArray = Array.from(files);
    const promises = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Urls) => {
      setVariantForm((prev) => {
        const existing = prev.imageUrls ? prev.imageUrls + "," : "";
        return { ...prev, imageUrls: existing + base64Urls.join(",") };
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1B1C1A] font-sans selection:bg-[#C9A96E] selection:text-white pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-24">
        {/* Top Section: Images and Product Info */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start mb-24">
          {/* Left Column: Product Images */}
          <div className="w-full lg:w-1/2">
            {product.images?.length > 0 && (
              <div>
                {/* Main image */}
                <div className="w-full aspect-[4/5] bg-[#f5f3f3] mb-4">
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </div>
                {/* Sub images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {product.images.slice(1, 3).map((img, idx) => (
                      <div
                        key={img._id || idx}
                        className="aspect-square bg-[#f5f3f3]"
                      >
                        <img
                          src={img.url}
                          alt={`${product.title} ${idx + 2}`}
                          className="w-full h-full object-cover grayscale-[20%]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-12">
            <div className="mt-6 lg:mt-0">
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-4">
                Snitch Collection
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1B1C1A] leading-tight mb-6">
                {product.title}
              </h1>
              <p className="text-[13px] text-[#757575] leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              {/* Price */}
              <div className="border-t border-b border-[#e3e2e2] py-5 flex justify-between items-baseline max-w-lg">
                <span className="text-xl font-serif tracking-tight text-[#1B1C1A]">
                  ${product.price?.amount || 0}.00
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575]">
                  {product.price?.currency || "USD"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Variants */}
        <div className="max-w-[480px] mx-auto border-t border-[#e3e2e2] pt-16">
          {(message || error) && (
            <div
              className={`mb-10 p-4 text-xs tracking-wide ${
                error
                  ? "bg-red-50 border border-red-200 text-red-700"
                  : "bg-green-50 border border-green-200 text-green-700"
              }`}
            >
              {error || message}
            </div>
          )}

          {/* Create Variant Section */}
          <div className="mb-20">
              <h2 className="text-xl font-serif tracking-widest mb-3 uppercase text-[#1B1C1A]">
                Create Variant
              </h2>
              <p className="text-[11px] text-[#757575] mb-8 leading-relaxed">
                Expand the collection by adding custom material and sizing
                configurations.
              </p>

              <form onSubmit={onCreateVariant} className="space-y-8">
                {/* Upload Image Box */}
                <label
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-32 h-32 border border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-[#1B1C1A] bg-[#f5f3f3] text-[#1B1C1A]"
                      : "border-[#c5c5c5] text-[#757575] hover:border-[#1B1C1A]"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 mb-3 transition-opacity ${
                      isDragging ? "opacity-100" : "opacity-60"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-[8px] font-semibold tracking-[0.2em] uppercase text-center px-2">
                    {isDragging
                      ? "Drop Here"
                      : variantForm.imageUrls
                        ? "Image Added ✓"
                        : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>

                <div className="space-y-6">
                  <div className="border-b border-[#e3e2e2] pb-2">
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-1">
                      Price ({variantForm.priceCurrency})
                    </label>
                    <input
                      type="number"
                      required
                      value={variantForm.priceAmount}
                      onChange={(e) =>
                        setVariantForm({
                          ...variantForm,
                          priceAmount: e.target.value,
                        })
                      }
                      placeholder="0.00"
                      className="w-full border-0 bg-transparent px-0 py-1 text-sm focus:ring-0 text-[#1B1C1A]"
                    />
                  </div>

                  <div className="border-b border-[#e3e2e2] pb-2">
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={variantForm.stock}
                      onChange={(e) =>
                        setVariantForm({
                          ...variantForm,
                          stock: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-full border-0 bg-transparent px-0 py-1 text-sm focus:ring-0 text-[#1B1C1A]"
                    />
                  </div>

                  <div className="border-b border-[#e3e2e2] pb-2">
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-1">
                      Attributes (e.g. Size:M, Color:Black)
                    </label>
                    <input
                      type="text"
                      required
                      value={variantForm.attributeText}
                      onChange={(e) =>
                        setVariantForm({
                          ...variantForm,
                          attributeText: e.target.value,
                        })
                      }
                      placeholder="size:m, color:black"
                      className="w-full border-0 bg-transparent px-0 py-1 text-sm focus:ring-0 text-[#1B1C1A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 bg-[#1B1C1A] text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4 px-8 hover:bg-[#303031] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Create Variant"}
                </button>
              </form>
            </div>

            {/* Existing Variants */}
            <div className="mb-24">
              <h2 className="text-xl font-serif tracking-widest mb-8 uppercase text-[#1B1C1A]">
                Existing Variants
              </h2>

              {variants.length === 0 ? (
                <div className="border border-[#e3e2e2] p-8 text-center text-[#757575] text-[11px] tracking-wide bg-white max-w-md">
                  No variants configured.
                </div>
              ) : (
                <div className="border border-[#e3e2e2] bg-white max-w-lg">
                  {variants.map((variant, idx) => (
                    <div
                      key={variant._id || idx}
                      className={`p-6 flex gap-6 ${
                        idx !== variants.length - 1
                          ? "border-b border-[#e3e2e2]"
                          : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="w-24 h-32 bg-[#f5f3f3] flex-shrink-0">
                        {variant.images?.[0] ? (
                          <img
                            src={variant.images[0].url}
                            className="w-full h-full object-cover grayscale-[20%]"
                            alt={`Variant ${idx + 1}`}
                          />
                        ) : null}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-2">
                            Variant #{idx + 1}
                          </p>
                          <p className="text-sm font-serif mb-3">
                            ${variant.price?.amount} {variant.price?.currency}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(variant.attributes || {}).map(
                              ([key, value]) => (
                                <span
                                  key={key}
                                  className="text-[8px] font-semibold tracking-[0.1em] bg-[#FBF9F6] border border-[#e3e2e2] text-[#757575] px-2 py-1 uppercase"
                                >
                                  {value}
                                </span>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Stock Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#757575]">
                            Stock
                          </span>
                          <div className="flex border border-[#e3e2e2] items-center h-8">
                            <button
                              type="button"
                              onClick={() => decrementStock(variant._id)}
                              className="w-8 text-[#757575] hover:text-[#1B1C1A] text-lg leading-none flex items-center justify-center"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="w-10 text-center border-0 text-[10px] p-0 focus:ring-0 bg-transparent"
                              value={
                                stockEdits[variant._id] ??
                                String(variant.stock ?? 0)
                              }
                              onChange={(e) =>
                                setStockEdits((prev) => ({
                                  ...prev,
                                  [variant._id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              type="button"
                              onClick={() => incrementStock(variant._id)}
                              className="w-8 text-[#757575] hover:text-[#1B1C1A] text-lg leading-none flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => onUpdateStock(variant._id)}
                            disabled={saving}
                            className="ml-auto text-[9px] font-semibold tracking-[0.2em] uppercase border-b border-[#1B1C1A] hover:text-[#757575] disabled:opacity-50"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#e3e2e2] pt-8 max-w-lg">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1B1C1A] mb-6">
                Snitch Atelier
              </p>
              <div className="flex flex-col gap-3 text-[8px] font-semibold tracking-[0.2em] uppercase text-[#757575] mb-12">
                <a href="#" className="hover:text-[#1B1C1A]">
                  Privacy
                </a>
                <a href="#" className="hover:text-[#1B1C1A]">
                  Terms
                </a>
                <a href="#" className="hover:text-[#1B1C1A]">
                  Returns
                </a>
                <a href="#" className="hover:text-[#1B1C1A]">
                  Contact
                </a>
              </div>
              <p className="text-[8px] tracking-[0.2em] uppercase text-[#b0b0b0]">
                © 2026 Snitch Atelier. All rights reserved.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProductDetails;
