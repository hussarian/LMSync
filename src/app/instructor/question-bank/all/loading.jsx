export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-200"></div>
        <div className="flex">
          <div className="w-64 h-screen bg-gray-200"></div>
          <div className="flex-1 p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
