"use client"

import { useState } from "react"
import { Search, Eye, ToggleLeft, ToggleRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/layout/sidebar"

export default function SurveyLecturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 사이드바 메뉴 항목
  const menuItems = [
    { key: "survey-items", label: "평가 항목", href: "/survey/items" },
    { key: "survey-lectures", label: "강의 리스트", href: "/survey/lectures" },
    { key: "survey-templates", label: "템플릿 목록", href: "/survey/templates" },
  ]

  // 샘플 강의 데이터
  const [lectures, setLectures] = useState([
    {
      id: 1,
      code: "CS101",
      name: "JavaScript 기초",
      instructor: "김강사",
      category: "프로그래밍",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      students: 25,
      maxStudents: 30,
      template: "기본 강의 평가",
      templateId: "TPL001",
      surveyActive: true,
      surveyResponses: 18,
      status: "진행중",
    },
    {
      id: 2,
      code: "CS102",
      name: "React 심화",
      instructor: "이강사",
      category: "프로그래밍",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      students: 20,
      maxStudents: 25,
      template: "실습 중심 평가",
      templateId: "TPL002",
      surveyActive: false,
      surveyResponses: 0,
      status: "진행중",
    },
    {
      id: 3,
      code: "DS201",
      name: "데이터 분석 기초",
      instructor: "박강사",
      category: "데이터사이언스",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      students: 15,
      maxStudents: 20,
      template: "이론 및 실습 평가",
      templateId: "TPL003",
      surveyActive: true,
      surveyResponses: 12,
      status: "진행중",
    },
    {
      id: 4,
      code: "UI301",
      name: "UI/UX 디자인",
      instructor: "���강사",
      category: "디자인",
      startDate: "2023-11-01",
      endDate: "2024-01-01",
      students: 18,
      maxStudents: 20,
      template: "창작 활동 평가",
      templateId: "TPL004",
      surveyActive: false,
      surveyResponses: 18,
      status: "완료",
    },
    {
      id: 5,
      code: "ML401",
      name: "머신러닝 실무",
      instructor: "정강사",
      category: "인공지능",
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      students: 12,
      maxStudents: 15,
      template: "프로젝트 기반 평가",
      templateId: "TPL005",
      surveyActive: true,
      surveyResponses: 8,
      status: "진행중",
    },
  ])

  // 설문 활성/비활성 토글
  const toggleSurvey = (lectureId) => {
    setLectures(
      lectures.map((lecture) =>
        lecture.id === lectureId ? { ...lecture, surveyActive: !lecture.surveyActive } : lecture,
      ),
    )
  }

  // 강의 상세보기
  const handleView = (lectureId) => {
    console.log("강의 상세보기:", lectureId)
  }

  // 템플릿 설정
  const handleTemplateSettings = (lectureId) => {
    console.log("템플릿 설정:", lectureId)
  }

  // 필터링된 강의 목록
  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || lecture.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || lecture.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  // 통계 계산
  const totalLectures = lectures.length
  const activeSurveys = lectures.filter((l) => l.surveyActive).length
  const completedSurveys = lectures.filter((l) => l.status === "완료" && l.surveyResponses > 0).length

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar title="설문 평가 관리" menuItems={menuItems} currentPath="/survey/lectures" />

      <div className="flex-1 p-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
            강의 리스트
          </h1>
          <p className="text-gray-600">전체 강의 목록과 설문 평가 현황을 관리하세요.</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#e74c3c" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">전체 강의</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {totalLectures}개
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#e74c3c" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 설문</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {activeSurveys}개
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#e74c3c" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">완료된 평가</p>
                <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                  {completedSurveys}개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="강의명, 강사명, 강의코드로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">전체 상태</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
              <option value="예정">예정</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">전체 카테고리</option>
              <option value="프로그래밍">프로그래밍</option>
              <option value="데이터사이언스">데이터사이언스</option>
              <option value="디자인">디자인</option>
              <option value="인공지능">인공지능</option>
            </select>
          </div>
        </div>

        {/* 강의 목록 테이블 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">강의 정보</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">강사</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">기간</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">수강생</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">사용 템플릿</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">설문 현황</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">설문 활성화</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLectures.map((lecture) => (
                  <tr key={lecture.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{lecture.name}</div>
                        <div className="text-sm text-gray-500">
                          {lecture.code} • {lecture.category}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">{lecture.instructor}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">
                        {lecture.startDate} ~ {lecture.endDate}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">
                        {lecture.students}/{lecture.maxStudents}명
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(lecture.students / lecture.maxStudents) * 100}%`,
                            backgroundColor: "#e74c3c",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lecture.template}</div>
                        <div className="text-xs text-gray-500">{lecture.templateId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">
                        응답: {lecture.surveyResponses}/{lecture.students}명
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${lecture.students > 0 ? (lecture.surveyResponses / lecture.students) * 100 : 0}%`,
                            backgroundColor: "#27ae60",
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="ghost" onClick={() => toggleSurvey(lecture.id)} className="p-1">
                        {lecture.surveyActive ? (
                          <ToggleRight className="w-6 h-6" style={{ color: "#27ae60" }} />
                        ) : (
                          <ToggleLeft className="w-6 h-6" style={{ color: "#95a5a6" }} />
                        )}
                      </Button>
                      <div className="text-xs text-center mt-1">
                        <Badge
                          variant={lecture.surveyActive ? "default" : "secondary"}
                          className={lecture.surveyActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {lecture.surveyActive ? "활성" : "비활성"}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleView(lecture.id)} className="p-1">
                          <Eye className="w-4 h-4" style={{ color: "#e74c3c" }} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTemplateSettings(lecture.id)}
                          className="p-1"
                        >
                          <Settings className="w-4 h-4" style={{ color: "#e74c3c" }} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 결과가 없을 때 */}
        {filteredLectures.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">검색 조건에 맞는 강의가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
