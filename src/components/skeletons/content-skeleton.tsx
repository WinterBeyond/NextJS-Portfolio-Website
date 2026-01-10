export default function ContentSkeleton() {
  return (
    <div className="px-4 py-8">
      {/* Hero Section */}
      <div className="space-y-6 mb-12">
        {/* Page Title */}
        <div className="space-y-3">
          <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>

        {/* Hero Image */}
        <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Content Body */}
      <div className="prose prose-lg max-w-none space-y-8">
        {/* Paragraph blocks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Random paragraph lengths */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className={`h-4 bg-gray-200 rounded animate-pulse ${i % 3 === 0 ? "w-3/4" : ""}`} />
            </div>

            {/* Occasional subheading */}
            {i % 2 === 0 && <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse mt-8" />}

            {/* Occasional image */}
            {i % 3 === 0 && <div className="aspect-video bg-gray-200 rounded-lg animate-pulse my-6" />}
          </div>
        ))}

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-8 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
