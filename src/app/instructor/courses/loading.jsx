// TODO: 강사 과정 관리 로딩 페이지
// - 스켈레톤 UI로 개선 고려

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">강사 과정 관리 페이지를 불러오는 중...</p>
      </div>
    </div>
  )
}
