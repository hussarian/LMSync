"use client"

import { useState, useEffect } from "react"
import { Search, Eye, BarChart3, Users, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { fetchInstructorLectures, transformLectureData, handleApiError } from "../../courses/api"

export default function InstructorSurveyLecturesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [lectures, setLectures] = useState([])
  const [loading, setLoading] = useState(true)

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { key: "survey-lectures", label: "담당 강의 설문", href: "/instructor/survey/lectures" },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const parsed = JSON.parse(userData)
      const memberId = Number(parsed.memberId)
      if (isNaN(memberId)) {
        setLoading(false)
        return
      }
      fetchInstructorLectures(memberId)
        .then((data) => {
          const lecturesData = transformLectureData(data)
          setLectures(lecturesData)
        })
        .catch((err) => {
          handleApiError(err)
          setLectures([])
        })
        .finally(() => setLoading(false))
    }
  }, [])

  // 강의 상세보기
  const handleViewDetails = (lectureId) => {
    window.location.href = `/instructor/survey/lectures/${lectureId}`
  }

  // 설문 결과 보기
  const handleViewResults = (lectureId) => {
    window.location.href = `/instructor/survey/results/${lectureId}`
  }

  // 필터링된 강의 목록
  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || lecture.status === selectedStatus
    const matchesPeriod = selectedPeriod === "all" || lecture.period === selectedPeriod

    return matchesSearch && matchesStatus && matchesPeriod
  })

  // 통계 계산
  const totalLectures = lectures.length
  const activeSurveys = lectures.filter((l) => l.surveyActive).length
  const completedSurveys = lectures.filter((l) => l.status === "완료").length
  const averageResponseRate = Math.round(
    lectures.filter((l) => l.responses > 0).reduce((sum, l) => sum + l.responseRate, 0) /
      lectures.filter((l) => l.responses > 0).length || 0,
  )
  const averageSatisfaction = (
    lectures.filter((l) => l.satisfaction > 0).reduce((sum, l) => sum + l.satisfaction, 0) /
      lectures.filter((l) => l.satisfaction > 0).length || 0
  ).toFixed(1)

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "설문 예정":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-blue-600"
    if (score >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  if (loading) return <div>로딩 중...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="설문 평가 관리" menuItems={sidebarItems} currentPath="/instructor/survey/lectures" />

        <main className="flex-1 p-6">
          {/* 페이지 헤더 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">담당 강의 설문 평가</h1>
            <p className="text-gray-600">담당하고 있는 강의들의 설문 평가 현황을 확인하고 관리하세요.</p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 담당 강의</p>
                  <p className="text-2xl font-bold text-blue-600">{totalLectures}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">진행중 설문</p>
                  <p className="text-2xl font-bold text-green-600">{activeSurveys}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">완료된 설문</p>
                  <p className="text-2xl font-bold text-purple-600">{completedSurveys}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">평균 응답률</p>
                  <p className="text-2xl font-bold text-orange-600">{averageResponseRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">평균 만족도</p>
                  <p className="text-2xl font-bold text-red-600">{averageSatisfaction}/5.0</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-500" />
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
                  placeholder="강의명, 강의코드, 카테고리로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 상태</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
                <option value="설문 예정">설문 예정</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 학기</option>
                <option value="2024-01학기">2024-01학기</option>
                <option value="2023-02학기">2023-02학기</option>
              </select>
            </div>
          </div>

          {/* 강의 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLectures.map((lecture) => (
              <div key={lecture.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* 강의 기본 정보 */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{lecture.name}</h3>
                      <p className="text-sm text-gray-600">
                        {lecture.code} • {lecture.category}
                      </p>
                      <p className="text-sm text-gray-500">{lecture.period}</p>
                    </div>
                    <Badge className={getStatusColor(lecture.status)}>{lecture.status}</Badge>
                  </div>

                  {/* 강의 세부 정보 */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">
                        강의실: <span className="font-medium">{lecture.room}</span>
                      </p>
                      <p className="text-gray-600">
                        수강생: <span className="font-medium">{lecture.students}명</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        완료율: <span className="font-medium">{lecture.completionRate}%</span>
                      </p>
                      <p className="text-gray-600">
                        일정: <span className="font-medium">{lecture.schedule}</span>
                      </p>
                    </div>
                  </div>

                  {/* 설문 정보 */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">설문 평가 현황</h4>
                      {lecture.surveyActive && <Badge className="bg-green-100 text-green-800">진행중</Badge>}
                    </div>

                    {lecture.responses > 0 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">응답률</span>
                          <span className="font-medium">
                            {lecture.responses}/{lecture.students}명 ({lecture.responseRate}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${lecture.responseRate}%` }}
                          ></div>
                        </div>
                        {lecture.averageScore > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">평균 만족도</span>
                            <span className={`font-bold ${getScoreColor(lecture.satisfaction)}`}>
                              {lecture.satisfaction}/5.0
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {lecture.status === "설문 예정" ? (
                          <p>
                            설문 기간: {lecture.surveyStartDate} ~ {lecture.surveyEndDate}
                          </p>
                        ) : (
                          <p>아직 응답이 없습니다.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(lecture.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      상세보기
                    </Button>
                    {lecture.responses > 0 && (
                      <Button
                        size="sm"
                        onClick={() => handleViewResults(lecture.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        결과 분석
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 결과가 없을 때 */}
          {filteredLectures.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">검색 조건을 변경해보세요.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
