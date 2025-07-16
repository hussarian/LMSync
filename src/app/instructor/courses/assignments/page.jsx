"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Users, BookOpen, CheckCircle, AlertCircle } from "lucide-react"

export default function InstructorCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // 사이드바 메뉴 구성
  const sidebarItems = [
    { href: "/instructor/courses/lectures", label: "담당 강의", key: "lectures" },
    { href: "/instructor/courses/assignments", label: "과제 리스트", key: "assignments" }, 
  ]

  // 강사가 담당하는 과정 데이터
  const [courses] = useState([
    {
      id: 1,
      name: "JavaScript 기초",
      code: "JS101",
      category: "프로그래밍",
      period: "2024.01.15 - 2024.03.15",
      students: 25,
      maxStudents: 30,
      status: "진행중",
      progress: 65,
      nextClass: "2024.02.15 09:00",
      assignments: 3,
      pendingGrades: 8,
      classroom: "A101",
    },
    {
      id: 2,
      name: "React 심화",
      code: "REACT201",
      category: "프로그래밍",
      period: "2024.02.01 - 2024.04.30",
      students: 18,
      maxStudents: 20,
      status: "진행중",
      progress: 40,
      nextClass: "2024.02.16 14:00",
      assignments: 2,
      pendingGrades: 5,
      classroom: "B203",
    },
    {
      id: 3,
      name: "Python 기초",
      code: "PY101",
      category: "프로그래밍",
      period: "2023.11.01 - 2024.01.31",
      students: 22,
      maxStudents: 25,
      status: "완료",
      progress: 100,
      nextClass: null,
      assignments: 5,
      pendingGrades: 0,
      classroom: "C105",
    },
  ])

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    return matchesSearch && matchesStatus
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="courses" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarItems} currentPath="/instructor/courses/assignments" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                담당 과정 관리
              </h1>
              <p className="text-gray-600">강사님이 담당하고 계신 과정들을 관리하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 담당 과정</p>
                    <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                      {courses.length}개
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8" style={{ color: "#3498db" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">진행 중인 과정</p>
                    <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                      {courses.filter((c) => c.status === "진행중").length}개
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8" style={{ color: "#2ecc71" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 수강생</p>
                    <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                      {courses.reduce((sum, course) => sum + course.students, 0)}명
                    </p>
                  </div>
                  <Users className="w-8 h-8" style={{ color: "#9b59b6" }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">미채점 과제</p>
                    <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                      {courses.reduce((sum, course) => sum + course.pendingGrades, 0)}개
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8" style={{ color: "#e74c3c" }} />
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="과정명 또는 과정코드로 검색..."
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
                  <option value="예정">예정</option>
                </select>
              </div>
            </div>

            {/* 과정 목록 */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        과정 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수강생
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        진행률
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        다음 강의
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        과제/채점
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
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{course.name}</div>
                            <div className="text-sm text-gray-500">
                              {course.code} | {course.category}
                            </div>
                            <div className="text-sm text-gray-500">{course.period}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {course.students}/{course.maxStudents}명
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">{course.classroom}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{course.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.nextClass ? (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <div>
                                <div className="text-sm text-gray-900">{course.nextClass.split(" ")[0]}</div>
                                <div className="text-sm text-gray-500">{course.nextClass.split(" ")[1]}</div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">완료</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">과제 {course.assignments}개</div>
                          {course.pendingGrades > 0 && (
                            <div className="text-sm text-red-600">미채점 {course.pendingGrades}개</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              상세보기
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              강의관리
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 안내사항 */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">강사 안내사항</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 좌측 사이드바에서 담당 강의, 과제 리스트, 채점 메뉴를 이용하세요.</li>
                <li>• 미채점 과제가 있는 경우, 학습 시일 내에 채점을 완료해주세요.</li>
                <li>• 과정 진행율은 실시간으로 업데이트됩니다.</li>
                <li>• 문의사항이 있으시면 관리자에게 연락해주세요.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
