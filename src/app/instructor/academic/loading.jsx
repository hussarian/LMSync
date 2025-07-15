export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-16 bg-gray-300 mb-4"></div>

        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="w-64 h-screen bg-gray-200 p-4">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Title skeleton */}
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>

              {/* Stats cards skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>

              {/* Search bar skeleton */}
              <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>

              {/* Table skeleton */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-16 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
