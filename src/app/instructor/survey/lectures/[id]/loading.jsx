export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 bg-gray-800 animate-pulse"></div>
      <div className="flex">
        <div className="w-64 min-h-screen p-4 animate-pulse" style={{ backgroundColor: "#f1f2f6" }}>
          <div className="mb-6">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="w-32 h-10 bg-gray-300 rounded"></div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4 w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-300 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-6 w-1/4"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="flex items-center gap-4">
                        <div className="w-12 h-4 bg-gray-300 rounded"></div>
                        <div className="flex-1 h-6 bg-gray-300 rounded"></div>
                        <div className="w-12 h-4 bg-gray-300 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-6 w-1/4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="h-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
