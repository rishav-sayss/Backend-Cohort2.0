import React, { useState, useRef } from 'react'
import { UseProduct } from '../Hooks/useProduct'
import { useNavigate } from 'react-router'

const CURRENCIES = ['USD', 'EUR', 'INR', 'GBP']
const MAX_IMAGES = 7

const inputBase =
  'w-full bg-transparent border-0 py-1 text-white placeholder-transparent focus:outline-none focus:ring-0 text-sm leading-normal'

/* ── sub-component: field wrapper ── */
const Field = ({ id, label, isFocused, children }) => (
  <div className="relative group">
    <label
      htmlFor={id}
      className={`block text-[10px] font-label uppercase tracking-[0.18em] mb-1.5 cursor-pointer transition-colors duration-300 ${
        isFocused ? 'text-white' : 'text-[#d2c5ab]'
      }`}
    >
      {label}
    </label>
    {children}
    {/* animated underline */}
    <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#4e4632]/40" />
    <div
      className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ${
        isFocused ? 'w-full' : 'w-0'
      }`}
    />
  </div>
)

function CreateProduct() {
  const { HandelCreatProduct } = UseProduct()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'USD',
  })
  const [images, setImages] = useState([]) // Array of File objects
  const [previews, setPreviews] = useState([]) // Array of data URLs
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const fileInputRef = useRef(null)

  /* ── helpers ── */
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Only allow digits and a single decimal point (avoids type="number" React re-render bug)
  const handlePriceChange = (e) => {
    const raw = e.target.value
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      setFormData((prev) => ({ ...prev, priceAmount: raw }))
    }
  }

  const addFiles = (files) => {
    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) return
    const newFiles = Array.from(files).slice(0, remaining)
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f))
    setImages((prev) => [...prev, ...newFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeImage = (idx) => {
    URL.revokeObjectURL(previews[idx])
    setImages((prev) => prev.filter((_, i) => i !== idx))
    setPreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('title', formData.title)
      fd.append('description', formData.description)
      fd.append('priceAmount', formData.priceAmount)
      fd.append('priceCurrency', formData.priceCurrency)
      images.forEach((img) => fd.append('images', img))
      console.log(fd)
      await HandelCreatProduct(fd)
      navigate('/seller/creatproduct')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#131313] font-[Manrope,sans-serif] antialiased text-[#e5e2e1] selection:bg-[#ffcc00]/20 selection:text-[#ffcc00]">

      {/* ── ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#ffcc00]/[0.03] blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#ffcc00]/[0.02] blur-3xl" />
      </div>

      {/* ── ghost top line ── */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-[#4e4632]/20 z-50" />

      <main className="relative z-10 px-6 pt-16 pb-32 flex flex-col items-center">
        <div className="w-full max-w-[640px] lg:max-w-5xl">

          {/* ── Header ── */}
          <header className="mb-14 animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0">
            {/* wordmark */}
            <p className="text-[11px] tracking-[0.35em] uppercase font-extrabold text-[#ffcc00] mb-5">
              Snitch
            </p>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] font-black tracking-tight leading-none text-[#e5e2e1] mb-3">
              Create Product
            </h1>
            <p className="text-[#d2c5ab] text-sm tracking-wide">
              Add a new item to your catalog
            </p>
            {/* accent line */}
            <div className="mt-8 w-10 h-[2px] bg-[#ffcc00]" />
          </header>

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            className="lg:grid lg:grid-cols-12 lg:gap-16 space-y-10 lg:space-y-0 animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-0"
          >
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-8">

            {/* Title */}
            <Field id="title" label="Product Title" isFocused={focusedField === 'title'}>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                required
                className={inputBase}
              />
            </Field>

            {/* Description */}
            <Field id="description" label="Description" isFocused={focusedField === 'description'}>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                placeholder=" "
                rows={2}
                required
                className={`${inputBase} resize-none`}
              />
            </Field>

            {/* Price row */}
            <div className="grid grid-cols-2 gap-8">
              <Field id="priceAmount" label="Price Amount" isFocused={focusedField === 'priceAmount'}>
                <input
                  id="priceAmount"
                  type="text"
                  inputMode="decimal"
                  value={formData.priceAmount}
                  onChange={handlePriceChange}
                  onFocus={() => setFocusedField('priceAmount')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="0.00"
                  required
                  className={inputBase + ' placeholder-[#4e4632]'}
                />
              </Field>

              <Field id="priceCurrency" label="Currency" isFocused={focusedField === 'priceCurrency'}>
                <select
                  id="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('priceCurrency')}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputBase} cursor-pointer appearance-none`}
                  style={{ backgroundImage: 'none' }}
                >
                  {CURRENCIES.map((c) => (
                    <option
                      key={c}
                      value={c}
                      className="bg-[#201f1f] text-[#e5e2e1]"
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">

            {/* Images Upload */}
            <div className="space-y-5">
              <span className="block text-[10px] font-label uppercase tracking-[0.18em] text-[#d2c5ab]">
                Product Images
                <span className="ml-2 text-[#9a9078]">
                  ({images.length}/{MAX_IMAGES})
                </span>
              </span>

              {/* Drop Zone */}
              {images.length < MAX_IMAGES && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && fileInputRef.current?.click()
                  }
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-lg py-10 px-6 cursor-pointer transition-all duration-300 border border-dashed ${
                    isDragging
                      ? 'border-[#ffcc00] bg-[#ffcc00]/5'
                      : 'border-[#4e4632] hover:border-[#ffcc00]/50 hover:bg-[#ffcc00]/[0.02]'
                  }`}
                >
                  {/* upload icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-colors duration-300 ${
                      isDragging ? 'text-[#ffcc00]' : 'text-[#9a9078]'
                    }`}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-[13px] text-[#d2c5ab] text-center leading-relaxed">
                    Drag &amp; drop or{' '}
                    <span className="text-[#ffcc00] font-semibold">
                      click to upload
                    </span>
                    <br />
                    <span className="text-[#9a9078] text-[11px]">
                      Up to {MAX_IMAGES} images · JPG, PNG, WEBP
                    </span>
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                </div>
              )}

              {/* Thumbnail grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: MAX_IMAGES }).map((_, idx) => {
                  const preview = previews[idx]
                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square rounded overflow-hidden transition-all duration-200 ${
                        preview
                          ? 'ring-1 ring-[#ffcc00]/40'
                          : 'bg-[#1c1b1b] border border-dashed border-[#4e4632]/60'
                      }`}
                    >
                      {preview ? (
                        <>
                          <img
                            src={preview}
                            alt={`Upload ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                            aria-label="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#4e4632]"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-xl font-bold text-[13px] uppercase tracking-[0.2em] text-[#3d2f00] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: isSubmitting
                    ? '#ffcc00'
                    : 'linear-gradient(135deg, #ffcc00 0%, #ffedc3 100%)',
                  boxShadow: isSubmitting
                    ? 'none'
                    : '0 0 40px rgba(255,204,0,0.18)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1.01)'
                    e.currentTarget.style.boxShadow =
                      '0 0 60px rgba(255,204,0,0.28)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow =
                    '0 0 40px rgba(255,204,0,0.18)'
                }}
              >
                {isSubmitting ? 'Publishing…' : 'Publish Product'}
              </button>
            </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreateProduct
