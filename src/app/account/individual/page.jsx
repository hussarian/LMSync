"use client"

import { UserPlus } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"

export default function IndividualRegisterPage() {
  const sidebarMenuItems = [
    { href: "/account/individual", label: "개별 등록", key: "individual" },
    { href: "/account/bulk", label: "일괄 등록", key: "bulk" },
  ]

  return (
    <PageLayout currentPage="account">
      <div className="flex">
        <Sidebar title="계정 등록" menuItems={sidebarMenuItems} currentPath="/account/individual" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                개별 계정 등록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                새로운 사용자 계정을 개별적으로 등록합니다.
              </p>
            </div>

            <EmptyState
              icon={UserPlus}
              title="개별 계정 등록"
              description="개별 계정 등록 기능은 현재 개발 중입니다."
            />
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
