export default function PDPSkeleton() {
  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>

          {/* Product Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          </div>

          {/* Variant Selector */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-16 bg-gray-200 rounded-md animate-pulse" />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Product Description */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
