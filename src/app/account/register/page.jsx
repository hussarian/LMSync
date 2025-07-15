"use client"

import { UserPlus } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import EmptyState from "@/components/ui/empty-state"

export default function AccountRegisterPage() {
  return (
    <PageLayout currentPage="account-register">
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
              새 계정 등록
            </h1>
            <p className="text-lg" style={{ color: "#95A5A6" }}>
              새로운 사용자 계정을 시스템에 등록합니다.
            </p>
          </div>

          <EmptyState
            icon={UserPlus}
            title="계정 등록"
            description="계정 등록 기능은 현재 개발 중입니다."
          />
        </div>
      </main>
    </PageLayout>
  )
} 