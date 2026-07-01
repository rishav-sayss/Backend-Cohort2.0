import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="border rounded-xl overflow-hidden shadow-sm p-4 space-y-4"
        >
          {/* Image */}
          <Skeleton className="h-56 w-full rounded-lg" />

          {/* Category */}
          <Skeleton className="h-4 w-24" />

          {/* Title */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />

          {/* Description */}
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />

          {/* Rating */}
          <Skeleton className="h-4 w-32" />

          {/* Price + Button */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}