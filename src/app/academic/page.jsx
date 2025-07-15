"use client"

import { Search } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"

export default function AcademicPage() {
  const sidebarMenuItems = [
    { href: "/academic/students", label: "학생 목록", key: "students" },
    { href: "/academic/register", label: "학생 등록/검색", key: "register" },
  ]

  return (
    <PageLayout currentPage="academic">
      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarMenuItems} currentPath="" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-6" style={{ color: "#2C3E50" }}>
              학적부
            </h1>
            <p className="text-lg mb-8" style={{ color: "#95A5A6" }}>
              좌측 사이드바에서 세부 메뉴를 선택해주세요.
            </p>

            <EmptyState
              icon={Search}
              title="학생 정보 관리"
              description="학생 목록 조회 및 등록/검색 기능을 이용하실 수 있습니다."
            />
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
