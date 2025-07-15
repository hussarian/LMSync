"use client"

import { Users } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"

export default function AccountPage() {
  const sidebarMenuItems = [
    { href: "/account/individual", label: "개별 등록", key: "individual" },
    { href: "/account/bulk", label: "일괄 등록", key: "bulk" },
  ]

  return (
    <PageLayout currentPage="account">
      <div className="flex">
        <Sidebar title="계정 등록" menuItems={sidebarMenuItems} currentPath="" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-6" style={{ color: "#2C3E50" }}>
              계정 등록
            </h1>
            <p className="text-lg mb-8" style={{ color: "#95A5A6" }}>
              좌측 사이드바에서 등록 방식을 선택해주세요.
            </p>

            <EmptyState
              icon={Users}
              title="계정 관리"
              description="개별 등록 또는 일괄 등록을 통해 새로운 사용자 계정을 생성할 수 있습니다."
            />
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
