"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Upload, FileSpreadsheet, Download, AlertCircle } from "lucide-react"

export default function CreateSyllabusPage() {
  const params = useParams()
  const router = useRouter()
  const lectureId = params.id

  const [syllabusData, setSyllabusData] = useState({
    title: "",
    overview: "",
    objectives: "",
    methodology: "",
    evaluation: "",
    materials: "",
    totalWeeks: 15,
    weeklyPlan: [],
  })

  const [uploadedFile, setUploadedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // 사이드바 메뉴 구성
  const sidebarItems = [
    { href: "/instructor/courses/lectures", label: "담당 강의", key: "lectures" },
    { href: "/instructor/courses/assignments", label: "과제 리스트", key: "assignments" },
    { href: "/instructor/courses/grading", label: "채점", key: "grading" },
  ]

  // 강의 정보 (실제로는 API에서 가져올 데이터)
  const [lecture, setLecture] = useState({
    courseName: "JavaScript 기초",
    courseCode: "JS101",
    lectureTitle: "변수와 데이터 타입",
    instructor: "김강사",
  })

  useEffect(() => {
    // 주차별 계획 초기화
    const initialWeeklyPlan = Array.from({ length: syllabusData.totalWeeks }, (_, index) => ({
      week: index + 1,
      topic: "",
      content: "",
      assignment: "",
    }))
    setSyllabusData((prev) => ({ ...prev, weeklyPlan: initialWeeklyPlan }))
  }, [syllabusData.totalWeeks])

  const handleInputChange = (field, value) => {
    setSyllabusData((prev) => ({ ...prev, [field]: value }))
    // 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleWeeklyPlanChange = (weekIndex, field, value) => {
    const updatedWeeklyPlan = [...syllabusData.weeklyPlan]
    updatedWeeklyPlan[weekIndex] = { ...updatedWeeklyPlan[weekIndex], [field]: value }
    setSyllabusData((prev) => ({ ...prev, weeklyPlan: updatedWeeklyPlan }))
  }

  const handleTotalWeeksChange = (weeks) => {
    const newWeeks = Math.max(1, Math.min(20, weeks))
    setSyllabusData((prev) => ({ ...prev, totalWeeks: newWeeks }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx")
      ) {
        setUploadedFile(file)
        // 실제로는 여기서 엑셀 파일을 파싱하여 데이터를 추출
        alert("엑셀 파일이 업로드되었습니다. 파일 내용을 분석하여 자동으로 입력됩니다.")
      } else {
        alert("엑셀 파일(.xlsx)만 업로드 가능합니다.")
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!syllabusData.title.trim()) newErrors.title = "강의계획서 제목을 입력해주세요."
    if (!syllabusData.overview.trim()) newErrors.overview = "개요/소개를 입력해주세요."
    if (!syllabusData.objectives.trim()) newErrors.objectives = "과정 목표를 입력해주세요."
    if (!syllabusData.methodology.trim()) newErrors.methodology = "수업 진행 방식을 입력해주세요."
    if (!syllabusData.evaluation.trim()) newErrors.evaluation = "평가 방법을 입력해주세요."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    setIsLoading(true)
    try {
      // 실제로는 API 호출로 데이터 저장
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("강의계획서가 성공적으로 저장되었습니다.")
      router.push(`/instructor/courses/lectures/${lectureId}`)
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTemplate = () => {
    // 실제로는 엑셀 템플릿 파일 다운로드
    alert("강의계획서 엑셀 템플릿을 다운로드합니다.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="courses" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarItems} currentPath="/instructor/courses/lectures" />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* 헤더 */}
            <div className="mb-6">
              <Link href={`/instructor/courses/lectures/${lectureId}`}>
                <Button variant="outline" className="mb-4 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  강의 상세로 돌아가기
                </Button>
              </Link>

              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                강의계획서 작성
              </h1>
              <p className="text-gray-600">
                {lecture.courseName} ({lecture.courseCode}) - {lecture.lectureTitle}
              </p>
            </div>

            {/* 엑셀 업로드 섹션 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                엑셀 파일로 일괄 입력
              </h3>
              <div className="flex items-center space-x-4">
                <Button onClick={downloadTemplate} variant="outline" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  템플릿 다운로드
                </Button>
                <div className="flex-1">
                  <input type="file" accept=".xlsx" onChange={handleFileUpload} className="hidden" id="excel-upload" />
                  <label htmlFor="excel-upload">
                    <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        엑셀 파일 업로드
                      </span>
                    </Button>
                  </label>
                </div>
                {uploadedFile && (
                  <div className="flex items-center text-sm text-green-600">
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    {uploadedFile.name}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                엑셀 템플릿을 다운로드하여 작성 후 업로드하면 자동으로 입력됩니다.
              </p>
            </div>

            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#2C3E50" }}>
                기본 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    강의계획서 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={syllabusData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="강의계획서 제목을 입력하세요"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    개요/소개 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={syllabusData.overview}
                    onChange={(e) => handleInputChange("overview", e.target.value)}
                    className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.overview ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="강의의 전반적인 개요와 소개를 작성하세요"
                  />
                  {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    과정 목표 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={syllabusData.objectives}
                    onChange={(e) => handleInputChange("objectives", e.target.value)}
                    className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.objectives ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="학습 목표와 성취하고자 하는 역량을 작성하세요"
                  />
                  {errors.objectives && <p className="text-red-500 text-sm mt-1">{errors.objectives}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수업 진행 방식 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={syllabusData.methodology}
                    onChange={(e) => handleInputChange("methodology", e.target.value)}
                    className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.methodology ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="강의 방식, 실습 방법, 토론 등 수업 진행 방식을 작성하세요"
                  />
                  {errors.methodology && <p className="text-red-500 text-sm mt-1">{errors.methodology}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    평가 방법 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={syllabusData.evaluation}
                    onChange={(e) => handleInputChange("evaluation", e.target.value)}
                    className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.evaluation ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="평가 기준, 비율, 방법 등을 상세히 작성하세요"
                  />
                  {errors.evaluation && <p className="text-red-500 text-sm mt-1">{errors.evaluation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">교재 정보(강의자료)</label>
                  <textarea
                    value={syllabusData.materials}
                    onChange={(e) => handleInputChange("materials", e.target.value)}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="주교재, 참고서적, 온라인 자료 등을 작성하세요"
                  />
                </div>
              </div>
            </div>

            {/* 주차별 계획 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  ��차별 계획
                </h3>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">전체 주차 수:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={syllabusData.totalWeeks}
                    onChange={(e) => handleTotalWeeksChange(Number.parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-500">주</span>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {syllabusData.weeklyPlan.map((week, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <h4 className="font-medium text-gray-900">{week.week}주차</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">주제</label>
                        <input
                          type="text"
                          value={week.topic}
                          onChange={(e) => handleWeeklyPlanChange(index, "topic", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="주차별 주제"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">강의 내용</label>
                        <input
                          type="text"
                          value={week.content}
                          onChange={(e) => handleWeeklyPlanChange(index, "content", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="강의 내용"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">과제</label>
                        <input
                          type="text"
                          value={week.assignment}
                          onChange={(e) => handleWeeklyPlanChange(index, "assignment", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="과제 (선택사항)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end space-x-4">
              <Link href={`/instructor/courses/lectures/${lectureId}`}>
                <Button variant="outline" className="bg-transparent">
                  취소
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </>
                )}
              </Button>
            </div>

            {/* 안내사항 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <h4 className="font-medium mb-1">작성 안내</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• 필수 항목(*)은 반드시 입력해주세요.</li>
                    <li>• 엑셀 템플릿을 사용하면 더 편리하게 작성할 수 있습니다.</li>
                    <li>• 주차별 계획은 전체 주차 수에 따라 자동으로 생성됩니다.</li>
                    <li>• 저장 후에도 언제든지 수정할 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
