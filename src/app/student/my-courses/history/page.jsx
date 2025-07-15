"use client"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Calendar, CheckCircle, XCircle, AlertCircle, Filter, Download } from "lucide-react"
import { useState } from "react"

export default function StudentAttendanceHistoryPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // TODO: 실제 API 호출로 교체 필요
  const attendanceRecords = []

  // TODO: 실제 API 호출로 교체 필요
  const subjects = []

  const sidebarMenuItems = [
    { href: "/student/my-courses/check-in", label: "출석하기", key: "check-in" },
    { href: "/student/my-courses/history", label: "출석현황", key: "history" },
  ]

  // 필터링된 기록
  const filteredRecords = attendanceRecords.filter((record) => {
    const periodMatch =
      selectedPeriod === "all" ||
      (selectedPeriod === "thisWeek" && record.week === 3) ||
      (selectedPeriod === "lastWeek" && record.week === 2)

    const subjectMatch = selectedSubject === "all" || record.subject === selectedSubject

    return periodMatch && subjectMatch
  })

  // 통계 계산
  const stats = {
    total: filteredRecords.length,
    attended: filteredRecords.filter((r) => r.status === "출석").length,
    late: filteredRecords.filter((r) => r.status === "지각").length,
    absent: filteredRecords.filter((r) => r.status === "결석").length,
  }

  const attendanceRate = stats.total > 0 ? (((stats.attended + stats.late) / stats.total) * 100).toFixed(1) : 0

  const getStatusIcon = (status) => {
    switch (status) {
      case "출석":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "지각":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "결석":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
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

  const handleExport = () => {
    // TODO: 실제 CSV 내보내기 API 호출로 교체 필요
    console.log("출석 기록 내보내기")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar menuItems={sidebarMenuItems} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">출석현황</h1>
            <div className="space-y-6">
              {/* 필터 및 내보내기 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">필터:</span>
                    </div>

                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 기간</option>
                      <option value="thisWeek">이번 주</option>
                      <option value="lastWeek">지난 주</option>
                    </select>

                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 과목</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleExport}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>내보내기</span>
                  </button>
                </div>
              </div>

              {/* 출석 통계 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">총 수업</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.attended}</div>
                    <div className="text-sm text-gray-600">출석</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                    <div className="text-sm text-gray-600">지각</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                    <div className="text-sm text-gray-600">결석</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{attendanceRate}%</div>
                    <div className="text-sm text-gray-600">출석률</div>
                  </div>
                </div>
              </div>

              {/* 출석 기록 테이블 */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">출석 기록</h2>
                  <p className="text-sm text-gray-600 mt-1">총 {filteredRecords.length}개의 기록</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          날짜
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          과목명
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          강의시간
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          강사
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          출석시간
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            선택한 조건에 해당하는 출석 기록이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{record.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{record.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{record.instructor}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{record.checkInTime || "-"}</div>
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
          </div>
        </main>
      </div>
    </div>
  )
}
