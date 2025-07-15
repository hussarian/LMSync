export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 사이드바 스켈레톤 */}
        <div className="w-64 min-h-screen bg-gray-100 animate-pulse"></div>
        
        {/* 메인 콘텐츠 스켈레톤 */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* 뒤로가기 버튼 스켈레톤 */}
            <div className="h-10 bg-gray-200 rounded mb-6 w-24 animate-pulse"></div>

            {/* 강의 정보 카드 스켈레톤 */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded mb-4 w-1/3 animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
            </div>

            {/* 평가 결과 카드 스켈레톤 */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded mb-4 w-1/4 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* 자유 의견 카드 스켈레톤 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 w-1/4 animate-pulse"></div>
              <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
            </div>

            {/* 로딩 메시지 */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-teal-50 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600 mr-3"></div>
                <span className="text-teal-600 text-sm font-medium">설문 결과를 불러오는 중...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
