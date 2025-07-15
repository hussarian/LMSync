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
          <div className="mb-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-pulse">
            <div className="flex gap-4">
              <div className="flex-1 h-10 bg-gray-300 rounded"></div>
              <div className="w-32 h-10 bg-gray-300 rounded"></div>
              <div className="w-32 h-10 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-8 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
