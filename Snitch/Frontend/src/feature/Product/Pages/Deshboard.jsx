 import React, { useEffect, useState } from 'react'
import { UseProduct } from '../Hooks/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/* ─── Image carousel ─── */
function ProductImageCarousel({ images, title }) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-[#1c1b1b] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          className="text-[#4e4632]">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group/img">
      <img
        src={images[activeIdx]?.url}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setActiveIdx((p) => (p - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-black/70 cursor-pointer"
            aria-label="Previous image"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIdx((p) => (p + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-black/70 cursor-pointer"
            aria-label="Next image"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIdx ? 'bg-[#ffcc00] w-4' : 'bg-white/40 w-1.5 hover:bg-white/70'
                }`}
                aria-label={`Image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Count badge */}
          <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white/80">
            {activeIdx + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  )
}

/* ─── Product card ─── */
function ProductCard({ product }) {
  const { title, description, price, images } = product

  return (
    <div className="group bg-[#181716] border border-[#2a2820] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#ffcc00]/30 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
      {/* Image */}
      <ProductImageCarousel images={images} title={title} />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-[#e5e2e1] font-bold text-[1.05rem] tracking-tight leading-snug truncate group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#9a9078] text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#2a2820]" />

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#c5ac6c]">
            Price
          </span>
          <span className="text-[#ffcc00] font-extrabold text-base tracking-tight">
            {price?.currency}{' '}
            {price?.amount?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Empty state ─── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-[#1c1b1b] border border-dashed border-[#4e4632] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          className="text-[#4e4632]">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <div className="space-y-2">
        <p className="text-[#e5e2e1] font-bold text-lg tracking-tight">No products yet</p>
        <p className="text-[#9a9078] text-sm max-w-xs leading-relaxed">
          You haven't listed any products. Start by creating your first item.
        </p>
      </div>
      <div className="w-8 h-[2px] bg-[#ffcc00]/40 rounded" />
    </div>
  )
}

/* ─── Main page ─── */
function Deshboard() {
  const { handleGetSellerProduct } = UseProduct();
  const sellerProducts = useSelector(state => state.product.sellerproducts);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const products = sellerProducts || [];

  return (
    <div className="min-h-screen bg-[#131313] font-[Manrope,sans-serif] antialiased text-[#e5e2e1] selection:bg-[#ffcc00]/20 selection:text-[#ffcc00]">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#ffcc00]/[0.03] blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#ffcc00]/[0.02] blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-[#4e4632]/20 z-50" />

      <main className="relative z-10 px-6 pt-16 pb-32 max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-14 animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
          <p className="text-[11px] tracking-[0.35em] uppercase font-extrabold text-[#ffcc00] mb-5">
            Snitch
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-[2.6rem] sm:text-[3.2rem] font-black tracking-tight leading-none text-[#e5e2e1] mb-3">
                My Products
              </h1>
              <p className="text-[#d2c5ab] text-sm tracking-wide">
                {products.length > 0
                  ? `${products.length} item${products.length !== 1 ? 's' : ''} in your catalog`
                  : 'Manage and track your listings'}
              </p>
            </div>

            {products.length > 0 && (
              <span className="text-[11px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full border border-[#ffcc00]/30 text-[#ffcc00]/80 bg-[#ffcc00]/5">
                {products.length} Listed
              </span>
            )}
          </div>
          <div className="mt-8 w-10 h-[2px] bg-[#ffcc00]" />
        </header>

        {/* Grid / Empty state */}
        <section className="animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-0">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

export default  Deshboard
