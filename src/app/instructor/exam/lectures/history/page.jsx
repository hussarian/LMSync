"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookOpen, Users, TrendingUp, Calendar, Eye, BarChart3, Award } from "lucide-react"
import Link from "next/link"

export default function InstructorLectureHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 강사 전용 사이드바 메뉴
  const sidebarItems = [
    { key: "my-exams", label: "내 시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/question-bank" },
    { key: "history", label: "내 강의 성적", href: "/instructor/exam/lectures/history" },
  ]

  // 담당 강의 이력 데이터
  const [lectures] = useState([
    {
      id: 1,
      title: "JavaScript 기초",
      code: "JS101",
      period: "2024.01.15 - 2024.04.15",
      year: "2024",
      semester: "1학기",
      status: "완료",
      totalStudents: 25,
      completedStudents: 23,
      dropoutStudents: 2,
      averageScore: 88.5,
      passRate: 92,
      attendanceRate: 85.2,
      satisfactionScore: 4.6,
      totalClasses: 48,
      completedClasses: 48,
      category: "프로그래밍",
      level: "초급",
      scoreDistribution: {
        excellent: 8, // 90점 이상
        good: 10, // 80-89점
        average: 5, // 70-79점
        poor: 0, // 70점 미만
      },
    },
    {
      id: 2,
      title: "React 심화",
      code: "REACT201",
      period: "2024.03.01 - 2024.06.30",
      year: "2024",
      semester: "1학기",
      status: "진행중",
      totalStudents: 18,
      completedStudents: 0,
      dropoutStudents: 1,
      averageScore: 91.2,
      passRate: 94,
      attendanceRate: 92.1,
      satisfactionScore: 4.8,
      totalClasses: 40,
      completedClasses: 28,
      category: "프로그래밍",
      level: "고급",
      scoreDistribution: {
        excellent: 12,
        good: 5,
        average: 1,
        poor: 0,
      },
    },
    {
      id: 3,
      title: "Python 기초",
      code: "PY101",
      period: "2023.09.01 - 2023.12.15",
      year: "2023",
      semester: "2학기",
      status: "완료",
      totalStudents: 22,
      completedStudents: 20,
      dropoutStudents: 2,
      averageScore: 82.3,
      passRate: 90,
      attendanceRate: 78.5,
      satisfactionScore: 4.3,
      totalClasses: 45,
      completedClasses: 45,
      category: "프로그래밍",
      level: "초급",
      scoreDistribution: {
        excellent: 5,
        good: 12,
        average: 3,
        poor: 2,
      },
    },
    {
      id: 4,
      title: "데이터베이스 설계",
      code: "DB301",
      period: "2023.03.01 - 2023.06.30",
      year: "2023",
      semester: "1학기",
      status: "완료",
      totalStudents: 30,
      completedStudents: 28,
      dropoutStudents: 2,
      averageScore: 85.7,
      passRate: 93,
      attendanceRate: 88.3,
      satisfactionScore: 4.5,
      totalClasses: 42,
      completedClasses: 42,
      category: "데이터베이스",
      level: "중급",
      scoreDistribution: {
        excellent: 9,
        good: 15,
        average: 4,
        poor: 2,
      },
    },
    {
      id: 5,
      title: "웹 개발 프로젝트",
      code: "WEB401",
      period: "2022.09.01 - 2022.12.15",
      year: "2022",
      semester: "2학기",
      status: "완료",
      totalStudents: 15,
      completedStudents: 14,
      dropoutStudents: 1,
      averageScore: 93.8,
      passRate: 100,
      attendanceRate: 95.2,
      satisfactionScore: 4.9,
      totalClasses: 36,
      completedClasses: 36,
      category: "웹개발",
      level: "고급",
      scoreDistribution: {
        excellent: 11,
        good: 3,
        average: 1,
        poor: 0,
      },
    },
  ])

  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === "all" || lecture.year === selectedYear
    const matchesStatus = selectedStatus === "all" || lecture.status === selectedStatus
    return matchesSearch && matchesYear && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "초급":
        return "bg-green-100 text-green-800"
      case "중급":
        return "bg-yellow-100 text-yellow-800"
      case "고급":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 전체 통계 계산
  const totalLectures = lectures.length
  const completedLectures = lectures.filter((l) => l.status === "완료").length
  const totalStudents = lectures.reduce((sum, l) => sum + l.totalStudents, 0)
  const overallAverageScore = lectures.reduce((sum, l) => sum + l.averageScore, 0) / lectures.length
  const overallPassRate = lectures.reduce((sum, l) => sum + l.passRate, 0) / lectures.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="lectures" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="강의 현황" menuItems={sidebarItems} currentPath="/instructor/lectures/history" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                담당 강의 이력
              </h1>
              <p className="text-gray-600">과거부터 현재까지 담당하신 모든 강의의 성과를 확인하세요.</p>
            </div>

            {/* 전체 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 강의 수</p>
                      <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                        {totalLectures}개
                      </p>
                    </div>
                    <BookOpen className="w-8 h-8" style={{ color: "#3498db" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">완료 강의</p>
                      <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                        {completedLectures}개
                      </p>
                    </div>
                    <Award className="w-8 h-8" style={{ color: "#2ecc71" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 수강생</p>
                      <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                        {totalStudents}명
                      </p>
                    </div>
                    <Users className="w-8 h-8" style={{ color: "#9b59b6" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">전체 평균 성적</p>
                      <p className={`text-2xl font-bold ${getScoreColor(overallAverageScore)}`}>
                        {overallAverageScore.toFixed(1)}점
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8" style={{ color: "#e67e22" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">전체 합격률</p>
                      <p className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                        {overallPassRate.toFixed(1)}%
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8" style={{ color: "#f39c12" }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="강의명, 강의코드, 분야로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 연도</option>
                    <option value="2024">2024년</option>
                    <option value="2023">2023년</option>
                    <option value="2022">2022년</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 상태</option>
                    <option value="완료">완료</option>
                    <option value="진행중">진행중</option>
                    <option value="예정">예정</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* 강의 목록 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLectures.map((lecture) => (
                <Card key={lecture.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg" style={{ color: "#2C3E50" }}>
                          {lecture.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {lecture.code} | {lecture.year} {lecture.semester}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lecture.status)}`}
                        >
                          {lecture.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(lecture.level)}`}
                        >
                          {lecture.level}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 기간 및 진행률 */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{lecture.period}</span>
                        {lecture.status === "진행중" && (
                          <span className="ml-auto text-blue-600">
                            ({lecture.completedClasses}/{lecture.totalClasses} 강의)
                          </span>
                        )}
                      </div>

                      {/* 핵심 성과 지표 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">평균 성적</span>
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className={`text-xl font-bold ${getScoreColor(lecture.averageScore)}`}>
                            {lecture.averageScore}점
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">합격률</span>
                            <Award className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-xl font-bold text-green-600">{lecture.passRate}%</div>
                        </div>
                      </div>

                      {/* 성적 분포 */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">성적 분포</span>
                          <span className="text-xs text-gray-500">총 {lecture.totalStudents}명</span>
                        </div>
                        <div className="flex gap-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-green-500"
                            style={{ width: `${(lecture.scoreDistribution.excellent / lecture.totalStudents) * 100}%` }}
                            title={`우수(90점 이상): ${lecture.scoreDistribution.excellent}명`}
                          />
                          <div
                            className="bg-blue-500"
                            style={{ width: `${(lecture.scoreDistribution.good / lecture.totalStudents) * 100}%` }}
                            title={`양호(80-89점): ${lecture.scoreDistribution.good}명`}
                          />
                          <div
                            className="bg-yellow-500"
                            style={{ width: `${(lecture.scoreDistribution.average / lecture.totalStudents) * 100}%` }}
                            title={`보통(70-79점): ${lecture.scoreDistribution.average}명`}
                          />
                          <div
                            className="bg-red-500"
                            style={{ width: `${(lecture.scoreDistribution.poor / lecture.totalStudents) * 100}%` }}
                            title={`미흡(70점 미만): ${lecture.scoreDistribution.poor}명`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>우수 {lecture.scoreDistribution.excellent}</span>
                          <span>양호 {lecture.scoreDistribution.good}</span>
                          <span>보통 {lecture.scoreDistribution.average}</span>
                          <span>미흡 {lecture.scoreDistribution.poor}</span>
                        </div>
                      </div>

                      {/* 추가 정보 */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-gray-600">출석률</div>
                          <div className="font-semibold">{lecture.attendanceRate}%</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-gray-600">만족도</div>
                          <div className="font-semibold">{lecture.satisfactionScore}/5.0</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-gray-600">완료율</div>
                          <div className="font-semibold">
                            {Math.round((lecture.completedStudents / lecture.totalStudents) * 100)}%
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex gap-2 pt-2">
                        <Link href={`/instructor/exam/lectures/history/${lecture.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            상세보기
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          성적 분석
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 검색 결과가 없을 때 */}
            {filteredLectures.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                  <p className="text-gray-600">다른 검색 조건을 시도해보세요.</p>
                </CardContent>
              </Card>
            )}

            {/* 강사 안내사항 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">강의 이력 안내사항</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 평균 성적은 해당 강의의 모든 학생들의 최종 성적을 기준으로 계산됩니다.</li>
                <li>• 성적 분포는 우수(90점 이상), 양호(80-89점), 보통(70-79점), 미흡(70점 미만)으로 구분됩니다.</li>
                <li>• 합격률은 70점 이상을 받은 학생의 비율입니다.</li>
                <li>• 상세보기를 통해 개별 학생의 성적과 출석 현황을 확인할 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
