"use client"
import { useState } from "react"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, ChevronDown, ChevronUp, Plus, Clock, CheckCircle, FileText } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function ExamCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const sidebarItems = [
    { key: "course-list", label: "과정 리스트", href: "/exam/courses" },
    { key: "question-list", label: "과목 문제 리스트", href: "/exam/questions" },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const stats = [
    {
      title: "전체 과정",
      value: "0개",
      icon: BookOpen,
      color: "#9b59b6",
    },
    {
      title: "시험 진행 중",
      value: "0개",
      icon: Clock,
      color: "#9b59b6",
    },
    {
      title: "시험 완료",
      value: "0개",
      icon: CheckCircle,
      color: "#9b59b6",
    },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const courses = []

  // TODO: 실제 API 호출로 교체 필요
  const subjectGrades = {}

  const categories = ["all", "프론트엔드", "백엔드", "풀스택", "데이터사이언스"]
  const statuses = ["all", "진행중", "완료", "예정"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || course.examStatus === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
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

  const handleToggleSubjects = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const handleView = (courseId) => {
    console.log("과정 상세보기:", courseId)
  }

  const handleEdit = (courseId) => {
    console.log("과정 수정:", courseId)
  }

  const handleDelete = (courseId) => {
    console.log("과정 삭제:", courseId)
  }

  const handleCreateExam = (courseId) => {
    console.log("시험 생성:", courseId)
  }

  const handleSubjectClick = (subject, courseInfo) => {
    setSelectedSubject({ ...subject, courseInfo })
    setShowGradeModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="director" userName="관리자" />
      <div className="flex">
        <Sidebar title="시험 및 성적 관리" menuItems={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                  과정 리스트
                </h1>
                <p className="text-gray-600 mt-2">시험이 있는 전체 과정을 관리할 수 있습니다.</p>
              </div>
              <Button className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white">
                <Plus className="w-4 h-4 mr-2" />새 과정 추가
              </Button>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            {/* 검색 및 필터 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <Search className="w-5 h-5" />
                  검색 및 필터
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="과정명, 과정코드, 강사명으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "전체 카테고리" : category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === "all" ? "전체 상태" : status}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* 과정 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <BookOpen className="w-5 h-5" />
                  과정 목록 ({filteredCourses.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">등록된 과정이 없습니다.</p>
                    <p className="text-sm text-gray-400">새로운 과정을 추가해보세요.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">과정 정보</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">카테고리</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">강사</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">기간</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">수강생</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">시험 현황</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">평균 점수</th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-700"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCourses.map((course) => (
                          <>
                            <tr key={course.id} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div>
                                  <div className="font-semibold" style={{ color: "#2C3E50" }}>
                                    {course.name}
                                  </div>
                                  <div className="text-sm text-gray-600">{course.code}</div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <Badge variant="outline">{course.category}</Badge>
                              </td>
                              <td className="py-4 px-4">{course.instructor}</td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div>{course.duration}</div>
                                  <div className="text-gray-500">
                                    {course.startDate} ~ {course.endDate}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">{course.students}명</td>
                              <td className="py-4 px-4">
                                <div className="space-y-1">
                                  <Badge className={getStatusColor(course.examStatus)}>{course.examStatus}</Badge>
                                  <div className="text-xs text-gray-500">{course.examCount}개 시험</div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="font-semibold" style={{ color: "#9b59b6" }}>
                                  {course.avgScore > 0 ? `${course.avgScore}점` : "미실시"}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleToggleSubjects(course.id)}
                                    className="text-xs"
                                  >
                                    {expandedCourse === course.id ? (
                                      <>
                                        <ChevronUp className="w-3 h-3 mr-1" />
                                        접기
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="w-3 h-3 mr-1" />
                                        과목
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            {expandedCourse === course.id && (
                              <tr>
                                <td colSpan="8" className="px-4 py-3 bg-gray-50">
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-700 mb-3">과목별 성적</h4>
                                    {subjectGrades[course.id] && subjectGrades[course.id].length > 0 ? (
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {subjectGrades[course.id].map((subject) => (
                                          <div
                                            key={subject.id}
                                            className="bg-white p-3 rounded border cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleSubjectClick(subject, course)}
                                          >
                                            <div className="font-medium text-sm mb-1">{subject.name}</div>
                                            <div className="text-xs text-gray-600 space-y-1">
                                              <div>평균: {subject.avgScore > 0 ? `${subject.avgScore}점` : "미실시"}</div>
                                              <div>합격률: {subject.passRate > 0 ? `${subject.passRate}%` : "미실시"}</div>
                                              <div>시험 수: {subject.examCount}개</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-gray-500">등록된 과목이 없습니다.</p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
