"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, Calendar, CheckCircle, XCircle, Clock, Download, Edit } from "lucide-react"

export default function InstructorAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedDate, setSelectedDate] = useState("2024-02-15")

  // 강사 전용 사이드바 메뉴
  const sidebarItems = [
    { href: "/instructor/academic", label: "담당 학생 관리", key: "students" },
    { href: "/instructor/academic/attendance", label: "출석 현황", key: "attendance" },
  ]

  // 강사가 담당하는 강의 목록
  const instructorLectures = [
    {
      id: 1,
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "변수와 데이터 타입",
      date: "2024-02-15",
      time: "09:00-12:00",
      room: "A101",
      totalStudents: 25,
      attendedStudents: 22,
    },
    {
      id: 2,
      courseName: "React 심화",
      courseCode: "REACT201",
      lectureTitle: "상태 관리와 Context API",
      date: "2024-02-15",
      time: "14:00-17:00",
      room: "B203",
      totalStudents: 18,
      attendedStudents: 16,
    },
    {
      id: 3,
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "함수와 스코프",
      date: "2024-02-14",
      time: "09:00-12:00",
      room: "A101",
      totalStudents: 25,
      attendedStudents: 24,
    },
  ]

  // 학생별 출석 데이터
  const [attendanceData] = useState([
    {
      id: 1,
      studentName: "김철수",
      studentId: "2024001",
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "변수와 데이터 타입",
      date: "2024-02-15",
      time: "09:00-12:00",
      status: "출석",
      checkInTime: "08:55",
      notes: "",
    },
    {
      id: 2,
      studentName: "이영희",
      studentId: "2024002",
      courseName: "React 심화",
      courseCode: "REACT201",
      lectureTitle: "상태 관리와 Context API",
      date: "2024-02-15",
      time: "14:00-17:00",
      status: "출석",
      checkInTime: "13:58",
      notes: "",
    },
    {
      id: 3,
      studentName: "박민수",
      studentId: "2024003",
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "변수와 데이터 타입",
      date: "2024-02-15",
      time: "09:00-12:00",
      status: "지각",
      checkInTime: "09:15",
      notes: "교통 체증으로 인한 지각",
    },
    {
      id: 4,
      studentName: "정수진",
      studentId: "2024004",
      courseName: "JavaScript 기초",
      courseCode: "JS101",
      lectureTitle: "변수와 데이터 타입",
      date: "2024-02-15",
      time: "09:00-12:00",
      status: "결석",
      checkInTime: "-",
      notes: "개인 사정으로 인한 결석",
    },
    {
      id: 5,
      studentName: "최민지",
      studentId: "2024005",
      courseName: "React 심화",
      courseCode: "REACT201",
      lectureTitle: "상태 관리와 Context API",
      date: "2024-02-15",
      time: "14:00-17:00",
      status: "결석",
      checkInTime: "-",
      notes: "병가",
    },
  ])

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || record.courseCode === selectedCourse
    const matchesDate = selectedDate === "all" || record.date === selectedDate
    return matchesSearch && matchesCourse && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "출석":
        return "bg-green-100 text-green-800"
      case "지각":
        return "bg-yellow-100 text-yellow-800"
      case "결석":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "출석":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "지각":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "결석":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  // 통계 계산
  const totalRecords = filteredAttendance.length
  const attendedCount = filteredAttendance.filter((r) => r.status === "출석").length
  const lateCount = filteredAttendance.filter((r) => r.status === "지각").length
  const absentCount = filteredAttendance.filter((r) => r.status === "결석").length
  const attendanceRate = totalRecords > 0 ? Math.round(((attendedCount + lateCount * 0.5) / totalRecords) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="academic" userRole="instructor" userName="김강사" />

      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarItems} currentPath="/instructor/academic/attendance" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                담당 강의 출석 관리
              </h1>
              <p className="text-gray-600">강사님이 담당하고 계신 강의별 학생들의 출석 현황을 관리하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">총 출석 기록</p>
                      <p className="text-2xl font-bold" style={{ color: "#3498db" }}>
                        {totalRecords}건
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
                      <p className="text-sm font-medium text-gray-600">출석</p>
                      <p className="text-2xl font-bold" style={{ color: "#2ecc71" }}>
                        {attendedCount}명
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8" style={{ color: "#2ecc71" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">지각</p>
                      <p className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                        {lateCount}명
                      </p>
                    </div>
                    <Clock className="w-8 h-8" style={{ color: "#f39c12" }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">결석</p>
                      <p className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                        {absentCount}명
                      </p>
                    </div>
                    <XCircle className="w-8 h-8" style={{ color: "#e74c3c" }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 담당 강의 목록 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>담당 강의 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {instructorLectures.map((lecture) => (
                    <div key={lecture.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{lecture.lectureTitle}</h4>
                          <p className="text-sm text-gray-600">
                            {lecture.courseName} ({lecture.courseCode})
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {lecture.date} {lecture.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>
                            출석: {lecture.attendedStudents}/{lecture.totalStudents}명
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(lecture.attendedStudents / lecture.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          출석률: {Math.round((lecture.attendedStudents / lecture.totalStudents) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                    <option value="JS101">JavaScript 기초</option>
                    <option value="REACT201">React 심화</option>
                  </select>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 출석 현황 테이블 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ color: "#2C3E50" }}>
                    출석 현황 ({filteredAttendance.length}건) - 출석률: {attendanceRate}%
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
                    </div>
                  </div>
                </div>
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
                          강의 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          출석 상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          체크인 시간
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAttendance.map((record) => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                              <div className="text-sm text-gray-500">{record.studentId}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{record.lectureTitle}</div>
                              <div className="text-sm text-gray-500">
                                {record.courseName} ({record.courseCode})
                              </div>
                              <div className="text-sm text-gray-500">
                                {record.date} {record.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}
                              >
                                {record.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{record.checkInTime}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{record.notes || "-"}</span>
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
              <h3 className="text-sm font-medium text-blue-800 mb-2">출석 관리 안내사항</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 담당하고 계신 강의의 출석 현황만 표시됩니다.</li>
                <li>• 출석 상태는 실시간으로 업데이트됩니다.</li>
                <li>• 지각/결석 학생의 비고란을 통해 사유를 확인하세요.</li>
                <li>• 출석 수정이 필요한 경우 수정 버튼을 이용하세요.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
