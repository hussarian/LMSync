export default function AttendanceLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* 사이드바 스켈레톤 */}
      <div className="w-64 min-h-screen p-4 bg-gray-100">
        <div className="mb-6">
          <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* 메인 콘텐츠 스켈레톤 */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* 제목 스켈레톤 */}
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-300 rounded mx-auto mb-4 w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded mx-auto w-64 animate-pulse"></div>
          </div>

          {/* 통계 카드 스켈레톤 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="h-1 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* 추가 정보 카드 스켈레톤 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 로딩 애니메이션 */}
      <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: "#3498db" }}></div>
    </div>
  )
}
