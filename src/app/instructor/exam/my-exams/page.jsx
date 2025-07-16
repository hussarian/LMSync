"use client"
import { useState } from "react"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Clock, Users, TrendingUp, Plus, Eye, Edit, Search, Download, Calendar } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import Link from "next/link"

export default function MyExamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [examStatus, setExamStatus] = useState({})

  const sidebarItems = [
    { key: "my-exams", label: "시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/question-bank" },
    { key: "history", label: "강의 성적", href: "/instructor/exam/lectures/history" },
  ]

  const stats = [
    {
      title: "총 출제 시험",
      value: "24개",
      icon: FileText,
      color: "#9b59b6",
    },
    {
      title: "진행 중인 시험",
      value: "5개",
      icon: Clock,
      color: "#9b59b6",
    },
    {
      title: "채점 대기",
      value: "42건",
      icon: Edit,
      color: "#9b59b6",
    },
    {
      title: "평균 응시율",
      value: "87.3%",
      icon: TrendingUp,
      color: "#9b59b6",
    },
  ]

  const myExams = [
    {
      id: 1,
      title: "JavaScript 기초 중간고사",
      course: "웹 개발 기초",
      courseCode: "WEB101",
      status: "진행중",
      type: "���간고사",
      participants: 25,
      submitted: 18,
      graded: 12,
      totalQuestions: 20,
      duration: 90,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      createdDate: "2024-01-10",
      avgScore: 78.5,
      maxScore: 100,
    },
    {
      id: 2,
      title: "React 컴포넌트 퀴즈",
      course: "프론트엔드 개발",
      courseCode: "FE201",
      status: "채점중",
      type: "퀴즈",
      participants: 22,
      submitted: 22,
      graded: 15,
      totalQuestions: 10,
      duration: 45,
      startDate: "2024-01-10",
      endDate: "2024-01-18",
      createdDate: "2024-01-05",
      avgScore: 85.2,
      maxScore: 100,
    },
    {
      id: 3,
      title: "HTML/CSS 기말고사",
      course: "웹 개발 기초",
      courseCode: "WEB101",
      status: "완료",
      type: "기말고사",
      participants: 28,
      submitted: 28,
      graded: 28,
      totalQuestions: 25,
      duration: 120,
      startDate: "2024-01-05",
      endDate: "2024-01-12",
      createdDate: "2023-12-28",
      avgScore: 79.8,
      maxScore: 100,
    },
    {
      id: 4,
      title: "Node.js 실습 평가",
      course: "백엔드 개발",
      courseCode: "BE301",
      status: "예정",
      type: "실습평가",
      participants: 20,
      submitted: 0,
      graded: 0,
      totalQuestions: 15,
      duration: 180,
      startDate: "2024-01-25",
      endDate: "2024-01-30",
      createdDate: "2024-01-15",
      avgScore: 0,
      maxScore: 100,
    },
    {
      id: 5,
      title: "데이터베이스 설계 시험",
      course: "데이터베이스",
      courseCode: "DB201",
      status: "완료",
      type: "중간고사",
      participants: 30,
      submitted: 29,
      graded: 29,
      totalQuestions: 18,
      duration: 100,
      startDate: "2023-12-20",
      endDate: "2023-12-27",
      createdDate: "2023-12-15",
      avgScore: 82.1,
      maxScore: 100,
    },
    {
      id: 6,
      title: "Python 기초 퀴즈",
      course: "프로그래밍 기초",
      courseCode: "PY101",
      status: "진행중",
      type: "퀴즈",
      participants: 35,
      submitted: 28,
      graded: 20,
      totalQuestions: 12,
      duration: 60,
      startDate: "2024-01-18",
      endDate: "2024-01-22",
      createdDate: "2024-01-12",
      avgScore: 76.8,
      maxScore: 100,
    },
  ]

  const courses = ["all", "웹 개발 기초", "프론트엔드 개발", "백엔드 개발", "데이터베이스", "프��그래밍 기초"]
  const statuses = ["all", "예정", "진행중", "채점중", "���료"]

  const filteredExams = myExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter
    const matchesCourse = courseFilter === "all" || exam.course === courseFilter
    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "채점중":
        return "bg-yellow-100 text-yellow-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "중간고사":
        return "bg-purple-100 text-purple-800"
      case "기말고사":
        return "bg-red-100 text-red-800"
      case "퀴즈":
        return "bg-blue-100 text-blue-800"
      case "실습평가":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressPercentage = (submitted, total) => {
    return total > 0 ? Math.round((submitted / total) * 100) : 0
  }

  const getGradingPercentage = (graded, submitted) => {
    return submitted > 0 ? Math.round((graded / submitted) * 100) : 0
  }

  const toggleExamStatus = (examId, currentStatus) => {
    setExamStatus((prev) => ({
      ...prev,
      [examId]: prev[examId] === "open" ? "closed" : "open",
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="시험 관리" menuItems={sidebarItems} currentPath="/instructor/exam/my-exams" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                내 시험 관리
              </h1>
              <p className="text-gray-600">출제한 시험을 관리하고 채점 현황을 확인할 수 있습니다.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            {/* 검색 및 필터 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="시험명, 과정명, 과정코드로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status === "all" ? "전체 상태" : status}
                        </option>
                      ))}
                    </select>
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course === "all" ? "전체 과정" : course}
                        </option>
                      ))}
                    </select>
                    <Link href="/instructor/exam/my-exams/create">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />새 시험 만들기
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 시험 목록 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <FileText className="w-5 h-5" />
                    출제 시험 목록 ({filteredExams.length}개)
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      결과 내보내기
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExams.map((exam) => (
                    <div key={exam.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                              {exam.title}
                            </h3>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => toggleExamStatus(exam.id, exam.status)}
                                className={`text-xs ${
                                  examStatus[exam.id] === "open" || (!examStatus[exam.id] && exam.status === "진행중")
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                {examStatus[exam.id] === "open" || (!examStatus[exam.id] && exam.status === "진행중")
                                  ? "열기"
                                  : "닫기"}
                              </Button>
                            </div>
                            <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                            <Badge className={getTypeColor(exam.type)}>{exam.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {exam.course} ({exam.courseCode})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {exam.duration}분
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {exam.totalQuestions}문항
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">참여자</p>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {exam.participants}명
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">제출률</p>
                              <div className="flex items-center gap-2">
                                <p className="font-medium" style={{ color: "#2C3E50" }}>
                                  {exam.submitted}/{exam.participants}
                                </p>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${getProgressPercentage(exam.submitted, exam.participants)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {getProgressPercentage(exam.submitted, exam.participants)}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-500">채점률</p>
                              <div className="flex items-center gap-2">
                                <p className="font-medium" style={{ color: "#2C3E50" }}>
                                  {exam.graded}/{exam.submitted}
                                </p>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${getGradingPercentage(exam.graded, exam.submitted)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {getGradingPercentage(exam.graded, exam.submitted)}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-500">평균 점수</p>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {exam.avgScore > 0 ? `${exam.avgScore}점` : "-"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-6">
                          <div className="text-right text-sm">
                            <p className="text-gray-500">시험 기간</p>
                            <p className="font-medium" style={{ color: "#9b59b6" }}>
                              {exam.startDate} ~ {exam.endDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/instructor/exam/my-exams/${exam.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                상세보기
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              채점하기
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3 mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            출제일: {exam.createdDate}
                          </span>
                          <div className="flex items-center gap-4">
                            <span
                              className={`font-medium ${
                                examStatus[exam.id] === "open" || (!examStatus[exam.id] && exam.status === "진행중")
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {examStatus[exam.id] === "open" || (!examStatus[exam.id] && exam.status === "진행중")
                                ? "학생 응시 가능"
                                : "학생 응시 불가"}
                            </span>
                            {exam.status === "채점중" && (
                              <span className="text-orange-600 font-medium">
                                채점 대기: {exam.submitted - exam.graded}건
                              </span>
                            )}
                            {exam.status === "진행중" && (
                              <span className="text-blue-600 font-medium">
                                미제출: {exam.participants - exam.submitted}명
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredExams.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-500">다른 검색어나 필터를 사용해보세요.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 빠른 작업 안내 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>시험 관리 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">시험 생성</h4>
                    <p className="text-blue-600">새로운 시험을 만들고 문제를 출제할 수 있습니다.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">채점 관리</h4>
                    <p className="text-green-600">제출된 답안을 채점하고 피드백을 제공할 수 있습니다.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">결과 분석</h4>
                    <p className="text-purple-600">시험 결과를 분석하고 통계를 확인할 수 있습니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
