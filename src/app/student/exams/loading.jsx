export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* 헤더 스켈레톤 */}
        <div className="h-16 bg-gray-300 mb-6"></div>

        <div className="flex">
          {/* 사이드바 스켈레톤 */}
          <div className="w-64 bg-gray-300 h-screen"></div>

          {/* 메인 콘텐츠 스켈레톤 */}
          <div className="flex-1 p-6 space-y-6">
            {/* 제목 스켈레톤 */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* 통계 카드 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="h-6 bg-gray-300 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 검색 필터 스켈레톤 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                <div className="flex gap-4">
                  <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* 시험 목록 스켈레톤 */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="h-6 bg-gray-300 rounded w-64"></div>
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-300 rounded w-16"></div>
                          <div className="h-6 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-gray-300 rounded w-24"></div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="h-4 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
