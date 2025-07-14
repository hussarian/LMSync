"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, BookOpen, TrendingUp, Calendar, Download, Eye } from "lucide-react"
import { Link } from "react-router-dom"

export default function InstructorAcademicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // 강사 전용 사이드바 메뉴
  const sidebarItems = [
    { href: "/instructor/academic", label: "담당 학생 관리", key: "students" },
    { href: "/instructor/academic/attendance", label: "출석 현황", key: "attendance" }, 
  ]

  // 강사가 담당하는 과정 목록
  const instructorCourses = [
    { id: 1, name: "JavaScript 기초", code: "JS101", students: 25 },
    { id: 2, name: "React 심화", code: "REACT201", students: 18 },
    { id: 3, name: "Python 기초", code: "PY101", students: 22 },
  ]

  // 담당 학생 데이터
  const [students] = useState([
    {
      id: 1,
      name: "김철수",
      studentId: "2024001",
      email: "kim@example.com",
      phone: "010-1234-5678",
      course: "JavaScript 기초",
      courseCode: "JS101",
      enrollDate: "2024.01.15",
      status: "수강중",
      attendance: 85,
      averageScore: 88,
      lastActivity: "2024.02.14",
      assignments: { submitted: 8, total: 10 },
      progress: 75,
    },
    {
      id: 2,
      name: "이영희",
      studentId: "2024002",
      email: "lee@example.com",
      phone: "010-2345-6789",
      course: "React 심화",
      courseCode: "REACT201",
      enrollDate: "2024.02.01",
      status: "수강중",
      attendance: 92,
      averageScore: 94,
      lastActivity: "2024.02.15",
      assignments: { submitted: 5, total: 6 },
      progress: 60,
    },
    {
      id: 3,
      name: "박민수",
      studentId: "2024003",
      email: "park@example.com",
      phone: "010-3456-7890",
      course: "JavaScript 기초",
      courseCode: "JS101",
      enrollDate: "2024.01.20",
      status: "수강중",
      attendance: 78,
      averageScore: 82,
      lastActivity: "2024.02.13",
      assignments: { submitted: 7, total: 10 },
      progress: 70,
    },
    {
      id: 4,
      name: "정수진",
      studentId: "2024004",
      email: "jung@example.com",
      phone: "010-4567-8901",
      course: "Python 기초",
      courseCode: "PY101",
      enrollDate: "2023.11.01",
      status: "완료",
      attendance: 95,
      averageScore: 91,
      lastActivity: "2024.01.31",
      assignments: { submitted: 12, total: 12 },
      progress: 100,
    },
  ])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.courseCode === selectedCourse
    return matchesSearch && matchesCourse
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "수강중":
        return "bg-blue-100 text-blue-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "휴학":
        return "bg-yellow-100 text-yellow-800"
      case "중도포기":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="academic" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarItems} currentPath="/instructor/academic" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                담당 학생 관리
              </h1>
              <p className="text-gray-600">강사님이 담당하고 계신 학생들의 학습 현황을 관리하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 담당 학생</p>
                      <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                        {students.length}명
                      </p>
                    </div>
                    <Users className="w-8 h-8" style={{ color: "#3498db" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">수강중인 학생</p>
                      <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                        {students.filter((s) => s.status === "수강중").length}명
                      </p>
                    </div>
                    <BookOpen className="w-8 h-8" style={{ color: "#2ecc71" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">평균 출석률</p>
                      <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                        {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
                      </p>
                    </div>
                    <Calendar className="w-8 h-8" style={{ color: "#9b59b6" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">평균 성적</p>
                      <p className="text-2xl font-bold" style={{ color: "#e67e22" }}>
                        {Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length)}점
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8" style={{ color: "#e67e22" }} />
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
                      placeholder="학생명, 학번, 과정명으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">전체 과정</option>
                    {instructorCourses.map((course) => (
                      <option key={course.id} value={course.code}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 학생 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>담당 학생 목록 ({filteredStudents.length}명)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          학생 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          수강 과정
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          출석률
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          평균 성적
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          과제 현황
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          진도율
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.studentId}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.course}</div>
                              <div className="text-sm text-gray-500">{student.courseCode}</div>
                              <div className="text-sm text-gray-500">등록일: {student.enrollDate}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                              <span className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                                {student.attendance}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getScoreColor(student.averageScore)}`}>
                              {student.averageScore}점
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.assignments.submitted}/{student.assignments.total}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div
                                className="bg-green-600 h-1 rounded-full"
                                style={{
                                  width: `${(student.assignments.submitted / student.assignments.total) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Link to={`/instructor/academic/students/${student.id}`}>
                                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                                  <Eye className="w-3 h-3 mr-1" />
                                  상세보기
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 강사 안내사항 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">강사 학적부 안내사항</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 담당하고 계신 과정의 학생들만 표시됩니다.</li>
                <li>• 출석률이 80% 미만인 학생은 개별 관리가 필요합니다.</li>
                <li>• 과제 미제출 학생에게는 별도 안내를 해주세요.</li>
                <li>• 학생별 상세 정보는 상세보기 버튼을 통해 확인하세요.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
