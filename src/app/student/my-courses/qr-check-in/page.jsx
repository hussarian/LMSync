"use client"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { QrCode, Clock, MapPin, User, CheckCircle, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

export default function QRCheckInPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [qrCode, setQrCode] = useState("")
  const [checkInStatus, setCheckInStatus] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const sidebarMenuItems = [
    { href: "/student/my-courses/check-in", label: "출석하기", key: "check-in" },
    { href: "/student/my-courses/history", label: "출석현황", key: "history" },
    { href: "/student/my-courses/qr-check-in", label: "QR 출석", key: "qr-check-in" },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const currentClass = {
    id: null,
    subject: "",
    time: "",
    room: "",
    instructor: "",
    status: "",
  }

  // TODO: 실제 API 호출로 교체 필요
  const todayStats = {
    total: 0,
    attended: 0,
    inProgress: 0,
    absent: 0,
  }

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // QR 코드 생성
  useEffect(() => {
    if (currentClass.id) {
      generateQRCode()
    }
  }, [currentClass.id])

  const generateQRCode = () => {
    // TODO: 실제 서버에서 QR 코드를 생성하도록 교체 필요
    if (!currentClass.id) return
    
    const timestamp = Date.now()
    const classId = currentClass.id
    // TODO: 실제 로그인한 학생 ID로 교체 필요
    const studentId = "STU001"
    const qrData = `ATTENDANCE:${classId}:${studentId}:${timestamp}`

    // TODO: 실제 QR 코드 라이브러리나 서버 API로 교체 필요
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`
    setQrCode(qrCodeUrl)
  }

  const refreshQRCode = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      generateQRCode()
      setIsRefreshing(false)
    }, 1000)
  }

  const simulateCheckIn = () => {
    // TODO: 실제 출석 API 호출로 교체 필요
    setCheckInStatus({
      success: true,
      time: currentTime.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: "QR 코드를 통한 출석이 완료되었습니다.",
    })

    // 5초 후 상태 초기화
    setTimeout(() => {
      setCheckInStatus(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar title="출석 관리" menuItems={sidebarMenuItems} currentPath="/student/my-courses/qr-check-in" />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 페이지 헤더 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">QR 코드 출석</h1>
              <p className="text-gray-600">아래 QR 코드를 강의실의 스캐너에 스캔하여 출석체크를 완료하세요.</p>
            </div>

            {/* 출석 성공 메시지 */}
            {checkInStatus && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-sm font-medium text-green-900">출석 완료</h3>
                    <p className="text-sm text-green-700">
                      {currentClass.subject} - {checkInStatus.time}에 출석이 완료되었습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR 코드 섹션 */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">출석 QR 코드</h2>
                    <button
                      onClick={refreshQRCode}
                      disabled={isRefreshing || !currentClass.id}
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                      <span>새로고침</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    {currentClass.id && qrCode ? (
                      <div className="space-y-4">
                        <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                          <img src={qrCode || "/placeholder.svg"} alt="출석 QR 코드" className="w-48 h-48 mx-auto" />
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>QR 코드를 스캔하여 출석하세요</p>
                          <p className="text-xs mt-1">현재 시간: {currentTime.toLocaleTimeString("ko-KR")}</p>
                        </div>
                        {/* 테스트용 버튼 */}
                        <button
                          onClick={simulateCheckIn}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          출석 테스트
                        </button>
                      </div>
                    ) : (
                      <div className="py-12">
                        <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {currentClass.id ? "QR 코드를 생성하는 중..." : "현재 진행중인 강의가 없습니다."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 강의 정보 섹션 */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">현재 강의</h2>
                </div>
                <div className="p-6">
                  {currentClass.id ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentClass.subject}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          진행중
                        </span>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{currentClass.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{currentClass.room}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{currentClass.instructor} 강사</span>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">출석 안내</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• 강의 시작 10분 전부터 출석 가능</li>
                          <li>• 강의 시작 후 15분까지 지각 처리</li>
                          <li>• QR 코드는 30초마다 자동 갱신됩니다</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">현재 진행중인 강의가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 출석 기록 요약 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">오늘의 출석 현황</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{todayStats.total}</div>
                    <div className="text-sm text-gray-600">총 강의</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{todayStats.attended}</div>
                    <div className="text-sm text-gray-600">출석 완료</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{todayStats.inProgress}</div>
                    <div className="text-sm text-gray-600">진행중</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{todayStats.absent}</div>
                    <div className="text-sm text-gray-600">결석</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
