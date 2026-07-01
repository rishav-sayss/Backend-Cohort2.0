function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="h-64 flex items-center justify-center p-5 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain h-full w-full"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">

        {/* Category */}
        <span className="text-sm text-blue-600 font-medium capitalize">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="font-semibold text-lg mt-2 line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-500">
            ⭐ {product.rating.rate}
          </span>

          <span className="text-gray-400 text-sm">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-4">

          <h3 className="text-2xl font-bold text-green-600">
            ${product.price}
          </h3>

          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;