export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 min-h-screen bg-gray-100 animate-pulse"></div>
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 bg-gray-200 rounded mb-6 animate-pulse"></div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
