import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function ClassroomRegisterLoading() {
  const sidebarItems = [
    { key: "rooms-list", label: "강의실 목록", href: "/classroom/rooms" },
    { key: "rooms-register", label: "강의실 등록", href: "/classroom/register" },
  ]

  const headerItems = [
    { key: "account", label: "계정 등록", href: "/account" },
    { key: "academic", label: "학적부", href: "/academic" },
    { key: "courses", label: "과정 관리", href: "/courses" },
    { key: "classroom", label: "강의실 관리", href: "/classroom" },
    { key: "survey", label: "설문 평가 관리", href: "/survey" },
    { key: "exam", label: "시험 및 성적", href: "/exam" },
    { key: "permission", label: "권한 관리", href: "/permission" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="LMSync"
        navItems={headerItems}
        currentPage="classroom"
        userName="김직원"
        userRole="staff"
      />

      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarItems} currentPath="/classroom/register" />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>

            <div className="space-y-6">
              {/* 기본 정보 카드 */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* 장비 목록 카드 */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <Skeleton key={index} className="h-10 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 버튼 영역 */}
              <div className="flex justify-end space-x-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 