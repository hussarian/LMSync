import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function SubjectDetailLoading() {
  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },,
  ]

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/subjects" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* 헤더 스켈레톤 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div>
                  <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 좌측 카드 스켈레톤 */}
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 우측 카드들 스켈레톤 */}
              <div className="lg:col-span-2 space-y-6">
                {/* 과목 소개 카드 */}
                <div className="border rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="text-center p-4 rounded-lg bg-gray-50">
                        <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-gray-200 rounded-full mt-0.5 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 커리큘럼 카드 */}
                <div className="border rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                          <div>
                            <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                          </div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-full ml-11 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 관련 과정 카드 */}
                <div className="border rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                          <div>
                            <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
