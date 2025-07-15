export default function PermissionLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* 헤더 스켈레톤 */}
        <div className="h-16 bg-gray-300 mb-4"></div>

        <div className="flex">
          {/* 사이드바 스켈레톤 */}
          <div className="w-64 bg-gray-200 h-screen"></div>

          {/* 메인 콘텐츠 스켈레톤 */}
          <div className="flex-1 p-8">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>

            {/* 통계 카드 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="h-12 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>

            {/* 카드 목록 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
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
