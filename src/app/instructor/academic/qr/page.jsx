"use client"

import { useState, useEffect } from "react"
import { QrCode, RefreshCw, Users, Clock, CheckCircle, XCircle } from "lucide-react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function InstructorQRPage() {
  const [qrCode, setQrCode] = useState("QR_CODE_12345")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courses, setCourses] = useState([])

  const sidebarMenuItems = [
    { href: "/instructor/academic", label: "담당 학생 관리", key: "students" },
    { href: "/instructor/academic/attendance", label: "출석 현황", key: "attendance" },
    { href: "/instructor/academic/qr", label: "QR", key: "qr" }
  ]

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 출석 데이터 (실제 API에서 가져올 데이터)
  useEffect(() => {
    setAttendanceData([])
  }, [])

  // 담당 강의 목록 로드 (실제 API에서 가져올 데이터)
  useEffect(() => {
    const instructorCourses = []
    setCourses(instructorCourses)
    setSelectedCourse(null)
  }, [])

  const generateNewQR = async () => {
    if (!selectedCourse) {
      alert("강의를 먼저 선택해주세요.")
      return
    }

    const newCode = `QR_CODE_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setQrCode(newCode)

    // QR 코드 전송 시뮬레이션
    try {
      // 실제로는 서버 API를 호출하여 학생들에게 QR 코드를 전송
      console.log(`QR 코드 전송 중... 강의: ${selectedCourse.name}, 코드: ${newCode}`)

      // 전송 성공 알림
      alert(`${selectedCourse.name} 수강생 ${selectedCourse.students}명에게 QR 코드가 전송되었습니다.`)

      // 출석 데이터 초기화 (새로운 출석 세션 시작)
      setAttendanceData([])
    } catch (error) {
      console.error("QR 코드 전송 실패:", error)
      alert("QR 코드 전송에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const attendedCount = attendanceData.filter((student) => student.status === "출석").length
  const lateCount = attendanceData.filter((student) => student.status === "지각").length
  const absentCount = attendanceData.filter((student) => student.status === "결석").length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="academic" userRole="instructor" />

      <div className="flex">
        <Sidebar
          title="학적부"
          menuItems={sidebarMenuItems}
          currentPath="/instructor/academic/qr"
          userRole="instructor"
        />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                QR 출석 관리
              </h1>
              <div className="text-sm text-gray-600">{currentTime.toLocaleString("ko-KR")}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR 코드 생성 영역 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C3E50" }}>
                    출석용 QR 코드
                  </h2>

                  {/* 강의 선택 및 정보 */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">담당 강의 선택</label>
                      <select
                        value={selectedCourse?.id || ""}
                        onChange={(e) => {
                          const courseId = Number.parseInt(e.target.value)
                          const course = courses.find((c) => c.id === courseId)
                          setSelectedCourse(course)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name} ({course.time})
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedCourse && (
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>강의:</strong> {selectedCourse.name}
                        </div>
                        <div>
                          <strong>시간:</strong> {selectedCourse.time}
                        </div>
                        <div>
                          <strong>강의실:</strong> {selectedCourse.room}
                        </div>
                        <div>
                          <strong>수강생:</strong> {selectedCourse.students}명
                        </div>
                        <div>
                          <strong>날짜:</strong> {currentTime.toLocaleDateString("ko-KR")}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QR 코드 */}
                  <div className="bg-gray-100 rounded-lg p-8 mb-4">
                    <QrCode className="w-32 h-32 mx-auto text-gray-600" />
                    <div className="mt-4 text-sm font-mono text-gray-600">{qrCode}</div>
                  </div>

                  <button
                    onClick={generateNewQR}
                    className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors mx-auto"
                    disabled={!selectedCourse}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>QR 코드 생성 및 전송</span>
                  </button>

                  <div className="mt-4 text-xs text-gray-500">
                    {selectedCourse
                      ? `${selectedCourse.name} 수강생들에게 QR 코드가 전송됩니다`
                      : "강의를 선택하면 해당 수강생들에게 QR 코드가 전송됩니다"}
                  </div>
                </div>
              </div>

              {/* 실시간 출석 현황 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C3E50" }}>
                  실시간 출석 현황
                </h2>

                {/* 출석 통계 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{attendedCount}</div>
                    <div className="text-sm text-green-600">출석</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
                    <div className="text-sm text-yellow-600">지각</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                    <div className="text-sm text-red-600">결석</div>
                  </div>
                </div>

                {/* 출석 목록 */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700 mb-3">학생 출석 목록</h3>
                  {attendanceData.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.studentId}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{student.time}</span>
                        <div className="flex items-center space-x-1">
                          {student.status === "출석" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">출석</span>
                            </>
                          )}
                          {student.status === "지각" && (
                            <>
                              <Clock className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm text-yellow-600">지각</span>
                            </>
                          )}
                          {student.status === "결석" && (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-600">결석</span>
                            </>
                          )}
                          {student.status === "대기" && (
                            <>
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-400">대기</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 출석 관리 도구 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "#2C3E50" }}>
                출석 관리 도구
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <div className="font-medium">수동 출석 체크</div>
                  <div className="text-sm text-gray-600">직접 출석을 체크합니다</div>
                </button>

                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <div className="font-medium">출석 시간 설정</div>
                  <div className="text-sm text-gray-600">출석 인정 시간을 설정합니다</div>
                </button>

                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <div className="font-medium">출석 데이터 내보내기</div>
                  <div className="text-sm text-gray-600">출석 데이터를 엑셀로 내보냅니다</div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
