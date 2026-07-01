import Link from "next/link";

function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">
      {/* Product Image */}

      <div className="h-64 w-full bg-gray-100 flex items-center justify-center p-4">
        <Link href={`/layout/product/${product.id}`} >
          <img
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-blue-600 capitalize">{product.category}</p>

        {/* Title */}
        <h2 className="font-semibold text-lg mt-2 line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-3 gap-2">
          <span className="text-yellow-500">⭐ {product.rating.rate}</span>

          <span className="text-gray-400 text-sm">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>

          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
