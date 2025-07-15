export default function SurveyLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-16 bg-gray-300 mb-4"></div>

        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="w-64 min-h-screen bg-gray-200 p-4">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
              </div>

              {/* Stats cards skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <div className="h-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Content cards skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="h-64 bg-gray-300 rounded"></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="h-64 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
