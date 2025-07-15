"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download, FileText } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function BulkRegisterPage() {
  const [csvData, setCsvData] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)

  const sidebarMenuItems = [
    { href: "/account/individual", label: "개별 등록", key: "individual" },
    { href: "/account/bulk", label: "일괄 등록", key: "bulk" },
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      // 실제 프로젝트에서는 파일을 읽어서 처리
      console.log("업로드된 파일:", file.name)
    }
  }

  const handleCsvSubmit = (e) => {
    e.preventDefault()
    if (!csvData.trim()) {
      alert("CSV 데이터를 입력해주세요.")
      return
    }

    // CSV 데이터 처리 로직
    const lines = csvData.trim().split("\n")
    const accounts = lines.slice(1).map((line) => {
      const [userType, name, userId, password, email, phone, department, position] = line.split(",")
      return { userType, name, userId, password, email, phone, department, position }
    })

    console.log("일괄 등록 데이터:", accounts)
    alert(`${accounts.length}개의 계정이 성공적으로 등록되었습니다!`)
  }

  const handleFileSubmit = (e) => {
    e.preventDefault()
    if (!uploadedFile) {
      alert("파일을 선택해주세요.")
      return
    }

    // 파일 처리 로직
    console.log("파일 처리:", uploadedFile.name)
    alert(`${uploadedFile.name} 파일이 성공적으로 처리되었습니다!`)
  }

  const downloadTemplate = () => {
    const template = `사용자유형,이름,아이디,비밀번호,이메일,연락처,부서/과목,직책/학년
staff,김직원,staff001,password123,staff001@example.com,010-1234-5678,행정부,주임
instructor,박강사,teacher001,password123,teacher001@example.com,010-2345-6789,수학과,강사
student,이학생,student001,password123,student001@example.com,010-3456-7890,컴퓨터공학과,1학년`

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

            {/* 파일 업로드 방식 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>파일 업로드</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFileSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvFile">CSV 파일 선택</Label>
                    <div className="flex items-center space-x-4">
                      <input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                      />
                      <Button
                        type="submit"
                        className="text-white font-medium flex items-center space-x-2"
                        style={{ backgroundColor: "#1ABC9C" }}
                      >
                        <Upload className="w-4 h-4" />
                        <span>업로드</span>
                      </Button>
                    </div>
                    {uploadedFile && (
                      <p className="text-sm" style={{ color: "#1ABC9C" }}>
                        선택된 파일: {uploadedFile.name}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* 직접 입력 방식 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>직접 입력</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCsvSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvData">CSV 데이터</Label>
                    <p className="text-xs" style={{ color: "#95A5A6" }}>
                      첫 번째 줄은 헤더이며, 각 줄은 쉼표(,)로 구분된 데이터여야 합니다.
                    </p>
                    <Textarea
                      id="csvData"
                      placeholder="사용자유형,이름,아이디,비밀번호,이메일,연락처,부서/과목,직책/학년
staff,김직원,staff001,password123,staff001@example.com,010-1234-5678,행정부,주임
instructor,박강사,teacher001,password123,teacher001@example.com,010-2345-6789,수학과,강사"
                      value={csvData}
                      onChange={(e) => setCsvData(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setCsvData("")}>
                      초기화
                    </Button>
                    <Button
                      type="submit"
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#1ABC9C" }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>일괄 등록</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

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
