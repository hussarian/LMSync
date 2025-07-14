import PageLayout from "@/components/ui/page-layout"

export default function Loading() {
  return (
    <PageLayout title="성적 조회">
      <div className="space-y-6">
        {/* 학생 정보 스켈레톤 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 성적 분포 스켈레톤 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 테이블 스켈레톤 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid grid-cols-9 gap-4">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
