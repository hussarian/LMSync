"use client"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { useState } from "react"

export default function StudentCheckInPage() {
  const [selectedClass, setSelectedClass] = useState(null)
  const [checkInStatus, setCheckInStatus] = useState(null)

  const sidebarMenuItems = [
    { href: "/student/my-courses/check-in", label: "출석하기", key: "check-in" },
    { href: "/student/my-courses/history", label: "출석현황", key: "history" },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const currentClass = {
    subject: "",
    instructor: "",
    time: "",
    room: "",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar menuItems={sidebarMenuItems} currentPath="/student/my-courses/check-in" />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">출석하기</h1>

            {/* QR 코드 출석 */}
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="bg-white rounded-lg shadow-lg border p-8 text-center max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">출석 QR 코드</h2>

                {/* 강의 정보 */}
                {currentClass.subject ? (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">{currentClass.subject}</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>
                        <span className="font-medium">강사:</span> {currentClass.instructor}
                      </p>
                      <p>
                        <span className="font-medium">시간:</span> {currentClass.time}
                      </p>
                      <p>
                        <span className="font-medium">강의실:</span> {currentClass.room}
                      </p>
                      <p>
                        <span className="font-medium">발급일시:</span> {new Date().toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-500">현재 진행중인 강의가 없습니다.</p>
                  </div>
                )}

                {/* QR 코드 영역 */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                  <div className="w-48 h-48 mx-auto bg-white border rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">QR 코드가</p>
                      <p className="text-sm text-gray-600">표시될 영역입니다</p>
                    </div>
                  </div>
                </div>

                {/* 주의사항 */}
                <div className="text-xs text-gray-500 mb-4 bg-yellow-50 p-3 rounded-lg">
                  <p className="font-medium text-yellow-800 mb-1">⚠️ 주의사항</p>
                  <p className="text-yellow-700">이 QR 코드는 해당 강의 시간에만 유효합니다.</p>
                </div>

                {/* 새로고침 버튼 */}
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  QR 코드 새로고침
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
