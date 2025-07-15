export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 min-h-screen p-4 bg-gray-100">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
