// TODO: 강사 강의 목록 로딩 페이지
// - 스켈레톤 UI로 개선 완료
// - 실제 데이터 로딩과 연동 필요

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 min-h-screen p-4 bg-gray-100">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-300 rounded mb-4"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
