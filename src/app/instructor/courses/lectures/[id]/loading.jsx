export default function LectureDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-16 bg-gray-200 mb-6"></div>

        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="w-64 bg-gray-200 h-screen"></div>

          {/* Main content skeleton */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Back button skeleton */}
              <div className="h-10 w-48 bg-gray-200 rounded mb-6"></div>

              {/* Title skeleton */}
              <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded mb-6"></div>

              {/* Basic info card skeleton */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-2 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content cards skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Materials card skeleton */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes card skeleton */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Students table skeleton */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      </div>
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
