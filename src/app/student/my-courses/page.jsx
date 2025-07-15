"use client"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function StudentAttendancePage() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser")
    if (userInfo) {
      setCurrentUser(JSON.parse(userInfo))
    }
  }, [])

  // TODO: 실제 API 호출로 교체 필요
  const attendanceStats = {
    totalClasses: 0,
    attended: 0,
    late: 0,
    absent: 0,
    attendanceRate: 0,
  }

  // TODO: 실제 API 호출로 교체 필요
  const recentAttendance = []

  // TODO: 실제 API 호출로 교체 필요
  const todaySchedule = []

  const sidebarMenuItems = [
    { href: "/student/my-courses/check-in", label: "출석하기", key: "check-in" },
    { href: "/student/my-courses/history", label: "출석현황", key: "history" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "출석":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "지각":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "결석":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "출석":
        return "text-green-600 bg-green-50"
      case "지각":
        return "text-yellow-600 bg-yellow-50"
      case "결석":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <Header
        currentPage="my-courses"
        userRole={currentUser?.role || "student"}
        userName={currentUser?.name || "학생"}
      />
      <div className="flex">
        <Sidebar title="출석 관리" menuItems={sidebarMenuItems} currentPath="/student/my-courses" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 출석 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 수업일수</p>
                    <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalClasses}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">출석</p>
                    <p className="text-2xl font-bold text-green-600">{attendanceStats.attended}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">지각</p>
                    <p className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">출석률</p>
                    <p className="text-2xl font-bold text-blue-600">{attendanceStats.attendanceRate}%</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 오늘의 강의 일정 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">오늘의 강의 일정</h2>
              </div>
              <div className="p-6">
                {todaySchedule.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">오늘 예정된 강의가 없습니다.</p>
                ) : (
                  <div className="space-y-4">
                    {todaySchedule.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{schedule.subject}</h3>
                            <p className="text-sm text-gray-600">{schedule.instructor} 강사</p>
                            <p className="text-sm text-gray-500">
                              {schedule.room} | {schedule.time}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          출석하기
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 최근 출석 기록 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">최근 출석 기록</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        과목명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        날짜
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        강사
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        출석상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentAttendance.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          최근 출석 기록이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      recentAttendance.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.instructor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                            >
                              {getStatusIcon(record.status)}
                              <span>{record.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
