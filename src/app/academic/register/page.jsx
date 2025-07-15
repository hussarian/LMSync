"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function AttendanceRegisterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedStatus, setSelectedStatus] = useState("all")

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [attachedFiles, setAttachedFiles] = useState([])

  const sidebarMenuItems = [
    { href: "/academic/students", label: "학생 목록", key: "students" },
    { href: "/academic/register", label: "학생 출/결 처리", key: "register" },
  ]

  // 더미 출석 데이터 (날짜별)
  const attendanceData = [
    // 오늘 데이터
    {
      id: "20240001",
      name: "김학생",
      department: "컴퓨터공학과",
      grade: "1학년",
      phone: "010-1234-5678",
      status: "출석",
      checkInTime: "09:15",
      checkOutTime: "17:30",
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240002",
      name: "이학생",
      department: "경영학과",
      grade: "2학년",
      phone: "010-2345-6789",
      status: "지각",
      checkInTime: "09:35",
      checkOutTime: "17:25",
      note: "교통체증으로 인한 지각",
      date: new Date().toISOString().split("T")[0],
    },
    // 어제 데이터
    {
      id: "20240001",
      name: "김학생",
      department: "컴퓨터공학과",
      grade: "1학년",
      phone: "010-1234-5678",
      status: "결석",
      checkInTime: "-",
      checkOutTime: "-",
      note: "병가",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    },
    {
      id: "20240003",
      name: "박민수",
      department: "전자공학과",
      grade: "1학년",
      phone: "010-3456-7890",
      status: "출석",
      checkInTime: "09:05",
      checkOutTime: "17:40",
      note: "",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    },
    // 기존 데이터들도 오늘 날짜로 설정
    {
      id: "20240003",
      name: "박민수",
      department: "전자공학과",
      grade: "1학년",
      phone: "010-3456-7890",
      status: "결석",
      checkInTime: "-",
      checkOutTime: "-",
      note: "병가",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240004",
      name: "최지영",
      department: "디자인학과",
      grade: "3학년",
      phone: "010-4567-8901",
      status: "출석",
      checkInTime: "09:05",
      checkOutTime: "17:45",
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240005",
      name: "정수현",
      department: "영어영문학과",
      grade: "2학년",
      phone: "010-5678-9012",
      status: "조퇴",
      checkInTime: "09:10",
      checkOutTime: "15:30",
      note: "개인사정으로 조퇴",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240006",
      name: "한소영",
      department: "수학과",
      grade: "1학년",
      phone: "010-6789-0123",
      status: "출석",
      checkInTime: "09:00",
      checkOutTime: "17:40",
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240007",
      name: "윤태호",
      department: "물리학과",
      grade: "3학년",
      phone: "010-7890-1234",
      status: "지각",
      checkInTime: "09:25",
      checkOutTime: "17:35",
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "20240008",
      name: "강미래",
      department: "화학과",
      grade: "2학년",
      phone: "010-8901-2345",
      status: "출석",
      checkInTime: "08:55",
      checkOutTime: "17:50",
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
  ]

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  // 강사별 담당 강의 정보 (더미 데이터)
  const instructorCourses = {
    instructor: [
      { courseId: "CS101", courseName: "JavaScript 기초", students: ["20240001", "20240002", "20240004"] },
      { courseId: "CS201", courseName: "React 심화", students: ["20240003", "20240005", "20240007"] },
    ],
  }

  // 필터링된 출석 데이터
  const filteredAttendance = attendanceData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus

    // 날짜 범위 필터링
    const studentDate = student.date
    const matchesDateRange = studentDate >= startDate && studentDate <= endDate

    // 강사 계정인 경우 담당 강의 학생만 필터링
    let matchesInstructor = true
    if (currentUser && currentUser.role === "instructor") {
      const instructorStudents = instructorCourses[currentUser.userType] || []
      const allStudentIds = instructorStudents.flatMap((course) => course.students)
      matchesInstructor = allStudentIds.includes(student.id)
    }

    return matchesSearch && matchesStatus && matchesDateRange && matchesInstructor
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "출석":
        return <CheckCircle className="w-4 h-4" style={{ color: "#1ABC9C" }} />
      case "지각":
        return <AlertCircle className="w-4 h-4" style={{ color: "#f39c12" }} />
      case "결석":
        return <XCircle className="w-4 h-4" style={{ color: "#e74c3c" }} />
      case "조퇴":
        return <Clock className="w-4 h-4" style={{ color: "#9b59b6" }} />
      default:
        return <AlertCircle className="w-4 h-4" style={{ color: "#95A5A6" }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "출석":
        return "#1ABC9C"
      case "지각":
        return "#f39c12"
      case "결석":
        return "#e74c3c"
      case "조퇴":
        return "#9b59b6"
      default:
        return "#95A5A6"
    }
  }

  const handleStatusChange = (studentId, newStatus) => {
    console.log(`${studentId} 학생의 출석 상태를 ${newStatus}로 변경`)
    alert(`${studentId} 학생의 출석 상태가 ${newStatus}로 변경되었습니다.`)
  }

  const handleExportData = () => {
    console.log("출석 데이터 내보내기")
    alert("출석 데이터를 Excel 파일로 내보냅니다.")
  }

  const handleRowClick = (student) => {
    setSelectedStudent(student)
    setEditFormData({
      status: student.status,
      checkInTime: student.checkInTime,
      checkOutTime: student.checkOutTime,
      note: student.note,
    })
    setAttachedFiles([])
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedStudent(null)
    setEditFormData({})
    setAttachedFiles([])
  }

  const handleFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files)
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const handleFileRemove = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveChanges = () => {
    console.log("저장된 데이터:", {
      student: selectedStudent,
      formData: editFormData,
      files: attachedFiles,
    })
    alert(`${selectedStudent.name} 학생의 출석 정보가 수정되었습니다.`)
    handleModalClose()
  }

  // 출석 통계 계산
  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter((s) => s.status === "출석").length,
    late: filteredAttendance.filter((s) => s.status === "지각").length,
    absent: filteredAttendance.filter((s) => s.status === "결석").length,
    earlyLeave: filteredAttendance.filter((s) => s.status === "조퇴").length,
  }

  return (
    <PageLayout currentPage="academic">
      <div className="flex">
        <Sidebar title="학적부" menuItems={sidebarMenuItems} currentPath="/academic/register" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                학생 출/결 처리
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                학생들의 출석, 지각, 결석, 조퇴 상태를 확인하고 관리할 수 있습니다.
              </p>
            </div>

            {/* 강사 담당 강의 정보 */}
            {currentUser && currentUser.role === "instructor" && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>담당 강의 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {instructorCourses[currentUser.userType]?.map((course, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2" style={{ color: "#2C3E50" }}>
                          {course.courseName} ({course.courseId})
                        </h4>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          수강생: {course.students.length}명
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle style={{ color: "#2C3E50" }}>
                    {currentUser && currentUser.role === "instructor"
                      ? `담당 강의 학생 출석 현황 (${startDate} ~ ${endDate}) - ${filteredAttendance.length}명`
                      : `출석 현황 (${startDate} ~ ${endDate}) - ${filteredAttendance.length}명`}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <span className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                        기간:
                      </span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-2 py-1 border rounded text-sm"
                        style={{ borderColor: "#95A5A6" }}
                      />
                      <span className="text-sm" style={{ color: "#95A5A6" }}>
                        ~
                      </span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-2 py-1 border rounded text-sm"
                        style={{ borderColor: "#95A5A6" }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                      onClick={() => {
                        console.log(`${startDate}부터 ${endDate}까지 출석 현황 조회`)
                        alert(`${startDate}부터 ${endDate}까지의 출석 현황을 조회합니다.`)
                      }}
                    >
                      조회
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "#95A5A6" }}
                    />
                    <Input
                      placeholder="이름, 학번, 학과로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                    style={{ borderColor: "#95A5A6" }}
                  >
                    <option value="all">전체 상태</option>
                    <option value="출석">출석</option>
                    <option value="지각">지각</option>
                    <option value="결석">결석</option>
                    <option value="조퇴">조퇴</option>
                  </select>

                  <Button
                    onClick={handleExportData}
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent"
                    style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                  >
                    <Download className="w-4 h-4" />
                    <span>내보내기</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 출석 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {stats.total}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 학생
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {stats.present}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    출석
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                    {stats.late}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    지각
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                    {stats.absent}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    결석
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {stats.earlyLeave}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    조퇴
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 출석 현황 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>
                  출석 현황 ({startDate} ~ {endDate}) - {filteredAttendance.length}명
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          학번
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          이름
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          학과/학년
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          출석상태
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          등교시간
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          하교시간
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          날짜
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          비고
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          상태변경
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          style={{ borderColor: "#f1f2f6" }}
                          onClick={() => handleRowClick(student)}
                        >
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {student.id}
                          </td>
                          <td className="py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            {student.name}
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {student.department} {student.grade}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {getStatusIcon(student.status)}
                              <Badge className="text-white" style={{ backgroundColor: getStatusColor(student.status) }}>
                                {student.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-mono text-sm" style={{ color: "#95A5A6" }}>
                            {student.checkInTime}
                          </td>
                          <td className="py-3 px-4 text-center font-mono text-sm" style={{ color: "#95A5A6" }}>
                            {student.checkOutTime}
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {student.date}
                          </td>
                          <td className="py-3 px-4 text-sm" style={{ color: "#95A5A6" }}>
                            {student.note || "-"}
                          </td>
                          <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={student.status}
                              onChange={(e) => handleStatusChange(student.id, e.target.value)}
                              className="px-2 py-1 border rounded text-xs"
                              style={{ borderColor: "#95A5A6" }}
                            >
                              <option value="출석">출석</option>
                              <option value="지각">지각</option>
                              <option value="결석">결석</option>
                              <option value="조퇴">조퇴</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredAttendance.length === 0 && (
                    <div className="text-center py-8">
                      <p style={{ color: "#95A5A6" }}>검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>

                {/* 출석 정보 수정 모달 */}
                {isModalOpen && selectedStudent && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle style={{ color: "#2C3E50" }}>출석 정보 수정 - {selectedStudent.name}</CardTitle>
                          <Button variant="ghost" size="sm" onClick={handleModalClose} style={{ color: "#95A5A6" }}>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* 학생 기본 정보 */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold mb-3" style={{ color: "#2C3E50" }}>
                            학생 정보
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                학번:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.id}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                이름:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.name}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                학과:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.department}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                학년:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.grade}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                날짜:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.date}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                연락처:
                              </span>
                              <span className="ml-2" style={{ color: "#95A5A6" }}>
                                {selectedStudent.phone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 출석 정보 수정 */}
                        <div className="space-y-4">
                          <h3 className="font-semibold" style={{ color: "#2C3E50" }}>
                            출석 정보 수정
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                출석 상태
                              </label>
                              <select
                                value={editFormData.status}
                                onChange={(e) => handleFormChange("status", e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                style={{ borderColor: "#95A5A6" }}
                              >
                                <option value="출석">출석</option>
                                <option value="지각">지각</option>
                                <option value="결석">결석</option>
                                <option value="조퇴">조퇴</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                등교 시간
                              </label>
                              <input
                                type="time"
                                value={editFormData.checkInTime === "-" ? "" : editFormData.checkInTime}
                                onChange={(e) => handleFormChange("checkInTime", e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                style={{ borderColor: "#95A5A6" }}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                하교 시간
                              </label>
                              <input
                                type="time"
                                value={editFormData.checkOutTime === "-" ? "" : editFormData.checkOutTime}
                                onChange={(e) => handleFormChange("checkOutTime", e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                style={{ borderColor: "#95A5A6" }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              비고 사항
                            </label>
                            <textarea
                              value={editFormData.note}
                              onChange={(e) => handleFormChange("note", e.target.value)}
                              placeholder="출석 관련 특이사항을 입력하세요..."
                              className="w-full px-3 py-2 border rounded-md resize-none"
                              style={{ borderColor: "#95A5A6" }}
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* 파일 첨부 */}
                        <div className="space-y-4">
                          <h3 className="font-semibold" style={{ color: "#2C3E50" }}>
                            파일 첨부
                          </h3>

                          <div className="space-y-2">
                            <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              관련 서류 첨부 (진단서, 사유서 등)
                            </label>
                            <input
                              type="file"
                              multiple
                              onChange={handleFileAttach}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                            />
                          </div>

                          {/* 첨부된 파일 목록 */}
                          {attachedFiles.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                첨부된 파일 ({attachedFiles.length}개)
                              </p>
                              <div className="space-y-2">
                                {attachedFiles.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center">
                                        <span className="text-xs font-medium" style={{ color: "#1ABC9C" }}>
                                          📄
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                          {file.name}
                                        </p>
                                        <p className="text-xs" style={{ color: "#95A5A6" }}>
                                          {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleFileRemove(index)}
                                      style={{ color: "#e74c3c" }}
                                    >
                                      삭제
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 버튼 그룹 */}
                        <div className="flex justify-end space-x-4 pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={handleModalClose}
                            className="bg-transparent"
                            style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                          >
                            취소
                          </Button>
                          <Button
                            onClick={handleSaveChanges}
                            className="text-white font-medium"
                            style={{ backgroundColor: "#1ABC9C" }}
                          >
                            저장
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
