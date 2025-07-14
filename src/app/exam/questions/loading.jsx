export default function ExamQuestionsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* 헤더 스켈레톤 */}
        <div className="h-16 bg-gray-300 mb-4"></div>

        <div className="flex">
          {/* 사이드바 스켈레톤 */}
          <div className="w-64 h-screen bg-gray-200"></div>

          {/* 메인 콘텐츠 스켈레톤 */}
          <div className="flex-1 p-6">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>

            {/* 통계 카드 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))}
            </div>

            {/* 검색 영역 스켈레톤 */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* 테이블 스켈레톤 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="h-12 bg-gray-100 rounded-t-lg"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-white border-b border-gray-200 flex items-center px-4">
                  <div className="h-4 bg-gray-200 rounded flex-1 mr-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mr-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
