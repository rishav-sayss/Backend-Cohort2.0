import Link from "next/link";
 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      
      {/* Product Image */}
      <Link href={`/layout/product/${product.id}`}>
        <div className="relative h-64 w-full bg-muted p-4 cursor-pointer">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain p-4"
          />
        </div>
      </Link>

      <CardContent className="space-y-3 p-4">
        
        {/* Category */}
        <p className="text-sm text-primary capitalize">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="font-semibold text-lg line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span>⭐ {product.rating.rate}</span>

          <span className="text-muted-foreground">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-green-600 dark:text-green-500">
            ${product.price}
          </span>

          <Button size="sm">
            Add to Cart
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}

export default ProductCard;