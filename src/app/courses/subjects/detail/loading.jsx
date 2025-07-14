export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#1ABC9C" }}></div>
        <p className="text-lg" style={{ color: "#95A5A6" }}>
          세부 과목 등록 페이지를 불러오는 중...
        </p>
      </div>
    </div>
  )
}
