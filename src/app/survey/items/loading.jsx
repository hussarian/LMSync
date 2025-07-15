export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 min-h-screen p-4 bg-gray-100 animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-64 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
