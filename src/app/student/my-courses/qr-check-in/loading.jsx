export default function QRCheckInLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-16 bg-gray-200"></div>

        <div className="flex">
          {/* Sidebar skeleton */}
          <div className="w-64 min-h-screen bg-gray-100 p-4">
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
