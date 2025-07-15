export default function SyllabusLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 스켈레톤 */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* 통계 카드 스켈레톤 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="ml-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 검색 필터 스켈레톤 */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* 강의 목록 스켈레톤 */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
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
