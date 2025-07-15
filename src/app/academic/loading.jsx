"use client"

import { Skeleton } from "@/components/ui/skeleton"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function AcademicLoading() {
  const sidebarMenuItems = [
    { href: "/academic/students", label: "학생 목록", key: "students" },
    { href: "/academic/register", label: "학생 출/결 처리", key: "register" }
  ]

  return (
    <PageLayout currentPage="academic">
      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarMenuItems} currentPath="" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* 제목 로딩 */}
            <Skeleton className="h-8 w-32 mb-6" />
            
            {/* 설명 텍스트 로딩 */}
            <Skeleton className="h-6 w-80 mb-8" />

            {/* EmptyState 영역 로딩 */}
            <div className="text-center py-12">
              <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-6 w-40 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
