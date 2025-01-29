export default function ServicesSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 mt-12">
        {/* Title Skeleton */}
        <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-12 animate-pulse"></div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-64 space-y-6">
            {/* Categories Skeleton */}
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Industries Skeleton */}
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Price Range Skeleton */}
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Services Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
