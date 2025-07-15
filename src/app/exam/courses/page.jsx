"use client"
import { useState } from "react"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, ChevronDown, ChevronUp, Plus, Clock, CheckCircle } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { Fragment } from 'react';

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

  const stats = [
    {
      title: "전체 과정",
      value: "18개",
      icon: BookOpen,
      color: "#9b59b6",
    },
    {
      title: "시험 진행 중",
      value: "6개",
      icon: Clock,
      color: "#9b59b6",
    },
    {
      title: "시험 완료",
      value: "12개",
      icon: CheckCircle,
      color: "#9b59b6",
    },
  ]

  // 더미데이터
  const courses = [
    {
      id: 1,
      code: "WEB001",
      name: "웹 개발 기초",
      category: "프론트엔드",
      instructor: "김개발",
      duration: "8주",
      students: 45,
      examStatus: "진행중",
      examCount: 3,
      avgScore: 78.5,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
    },
    
  ]

  const subjectGrades = {
    1: [
      { id: 1, name: "HTML/CSS 기초", avgScore: 82.5, passRate: 85, examCount: 2 },
      { id: 2, name: "JavaScript 기초", avgScore: 75.3, passRate: 78, examCount: 3 },
      { id: 3, name: "반응형 웹 디자인", avgScore: 79.8, passRate: 82, examCount: 2 },
    ],
    
  }

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
                  <Filter className="w-5 h-5" />
                  검색 및 필터
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="과정명, 과정코드, 강사명으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
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
                        <Fragment key={course.id}>
                          <tr key={course.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-semibold" style={{ color: "#2C3E50" }}>
                                  {course.name}
                                </div>
                                <div className="text-sm text-gray-600">{course.code}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" style={{ borderColor: "#9b59b6", color: "#9b59b6" }}>
                                {course.category}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-700">{course.instructor}</td>
                            <td className="py-3 px-4">
                              <div className="text-sm">
                                <div>{course.duration}</div>
                                <div className="text-gray-500">
                                  {course.startDate} ~ {course.endDate}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-center">
                                <div className="font-semibold">{course.students}명</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <Badge className={getStatusColor(course.examStatus)}>{course.examStatus}</Badge>
                                <div className="text-xs text-gray-600">시험 {course.examCount}개</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-center">
                                {course.avgScore > 0 ? (
                                  <div className="font-semibold" style={{ color: "#9b59b6" }}>
                                    {course.avgScore}점
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleToggleSubjects(course.id)}
                                  className="p-2"
                                >
                                  {expandedCourse === course.id ? (
                                    <ChevronUp className="w-4 h-4" style={{ color: "#9b59b6" }} />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" style={{ color: "#9b59b6" }} />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {expandedCourse === course.id && (
                            <tr key={`${course.id}-subjects`}>
                              <td colSpan="8" className="py-4 px-4 bg-gray-50">
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-gray-700 mb-3">과목별 성적 현황</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subjectGrades[course.id]?.map((subject) => (
                                      <div
                                        key={subject.id}
                                        className="bg-white p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => handleSubjectClick(subject, course)}
                                      >
                                        <h5 className="font-medium text-gray-800 mb-2">{subject.name}</h5>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">평균 점수:</span>
                                            <span className="font-semibold" style={{ color: "#9b59b6" }}>
                                              {subject.avgScore > 0 ? `${subject.avgScore}점` : "미실시"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">합격률:</span>
                                            <span className="font-semibold text-green-600">
                                              {subject.passRate > 0 ? `${subject.passRate}%` : "미실시"}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">시험 수:</span>
                                            <span className="font-semibold text-blue-600">{subject.examCount}개</span>
                                          </div>
                                        </div>
                                      </div>
                                    )) || (
                                      <div className="col-span-full text-center text-gray-500 py-4">
                                        등록된 과목이 없습니다.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* 성적 상세정보 모달 */}
      {showGradeModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                  {selectedSubject.name} - 성적 상세정보
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedSubject.courseInfo.name} ({selectedSubject.courseInfo.code})
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowGradeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 기본 통계 */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ color: "#9b59b6" }}>
                      기본 통계
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 점수:</span>
                      <span className="font-semibold" style={{ color: "#9b59b6" }}>
                        {selectedSubject.avgScore > 0 ? `${selectedSubject.avgScore}점` : "미실시"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">합격률:</span>
                      <span className="font-semibold text-green-600">
                        {selectedSubject.passRate > 0 ? `${selectedSubject.passRate}%` : "미실시"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 시험 수:</span>
                      <span className="font-semibold text-blue-600">{selectedSubject.examCount}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수강생 수:</span>
                      <span className="font-semibold">{selectedSubject.courseInfo.students}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">최고 점수:</span>
                      <span className="font-semibold text-green-600">95점</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">최저 점수:</span>
                      <span className="font-semibold text-red-600">42점</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 시험별 상세 점수 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ color: "#9b59b6" }}>
                      시험별 상세 점수
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from({ length: selectedSubject.examCount }, (_, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            {/* 시험명이 들어갈 예정 */}
                            <h4 className="font-semibold">시험 {index + 1}</h4> 
                            {/* <Badge className="bg-blue-100 text-blue-800">
                              {index === 0 ? "중간고사" : index === selectedSubject.examCount - 1 ? "기말고사" : "퀴즈"}
                            </Badge> */}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">평균:</span>
                              <span className="ml-2 font-semibold" style={{ color: "#9b59b6" }}>
                                {(selectedSubject.avgScore + Math.random() * 10 - 5).toFixed(1)}점
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">최고:</span>
                              <span className="ml-2 font-semibold text-green-600">
                                {(selectedSubject.avgScore + Math.random() * 20).toFixed(0)}점
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">최저:</span>
                              <span className="ml-2 font-semibold text-red-600">
                                {(selectedSubject.avgScore - Math.random() * 30).toFixed(0)}점
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">합격률:</span>
                              <span className="ml-2 font-semibold text-blue-600">
                                {(selectedSubject.passRate + Math.random() * 10 - 5).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 성적 분포 */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg" style={{ color: "#9b59b6" }}>
                    성적 분포
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">7명</div>
                      <div className="text-sm text-gray-600">A (90-100점)</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">18명</div>
                      <div className="text-sm text-gray-600">B (80-89점)</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">12명</div>
                      <div className="text-sm text-gray-600">C (70-79점)</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">5명</div>
                      <div className="text-sm text-gray-600">D (60-69점)</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">3명</div>
                      <div className="text-sm text-gray-600">F (0-59점)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowGradeModal(false)}>
                닫기
              </Button>
              <Button className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white">성적 내보내기</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
