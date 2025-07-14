export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 스켈레톤 */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 검색 필터 스켈레톤 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 과제 목록 스켈레톤 */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
