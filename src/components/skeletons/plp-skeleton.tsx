export default function PLPSkeleton() {
  return (
    <div className="px-4 py-8">
      {/* Page Title */}
      <div className="h-8 bg-gray-200 rounded-md w-64 mb-6 animate-pulse" />

      {/* Filters Bar */}
      <div className="flex gap-4 mb-8">
        <div className="h-10 bg-gray-200 rounded-md w-32 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded-md w-28 animate-pulse" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Product Image */}
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />

            {/* Product Title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />

            {/* Price */}
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />

            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
