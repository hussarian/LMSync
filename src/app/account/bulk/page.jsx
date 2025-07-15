"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"

export default function BulkRegisterPage() {
  const sidebarMenuItems = [
    { href: "/account/individual", label: "개별 등록", key: "individual" },
    { href: "/account/bulk", label: "일괄 등록", key: "bulk" },
  ]

  const downloadTemplate = () => {
    const template = `사용자유형,이름,아이디,비밀번호,이메일,연락처,부서/과목,직책/학년
staff,홍길동,user001,password123,user@example.com,010-0000-0000,부서명,직책명`

    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "계정등록_템플릿.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PageLayout currentPage="account">
      <div className="flex">
        <Sidebar title="계정 등록" menuItems={sidebarMenuItems} currentPath="/account/bulk" />

        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                일괄 계정 등록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                CSV 파일 또는 텍스트를 통해 여러 계정을 한 번에 등록합니다.
              </p>
            </div>

            {/* 템플릿 다운로드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>템플릿 다운로드</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-2" style={{ color: "#95A5A6" }}>
                      일괄 등록을 위한 CSV 템플릿을 다운로드하세요.
                    </p>
                    <p className="text-xs" style={{ color: "#95A5A6" }}>
                      템플릿에 맞춰 데이터를 입력한 후 업로드하거나 직접 붙여넣기 하세요.
                    </p>
                  </div>
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Download className="w-4 h-4" />
                    <span>템플릿 다운로드</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <EmptyState
              icon={Upload}
              title="일괄 계정 등록"
              description="일괄 계정 등록 기능은 현재 개발 중입니다. 위의 템플릿을 다운로드하여 준비해주세요."
            />

            {/* 등록 안내 */}
            <Card className="mt-6" style={{ borderColor: "#1ABC9C", borderWidth: "1px" }}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                  일괄 등록 안내사항
                </h3>
                <ul className="space-y-1 text-sm" style={{ color: "#95A5A6" }}>
                  <li>• 사용자유형: director, staff, instructor, student 중 하나</li>
                  <li>• CSV 형식을 정확히 맞춰주세요 (쉼표로 구분)</li>
                  <li>• 중복된 아이디가 있으면 등록이 실패할 수 있습니다.</li>
                  <li>• 대량 등록 시 처리 시간이 소요될 수 있습니다.</li>
                  <li>• 등록 실패한 계정이 있으면 별도로 알림을 받습니다.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
