"use client"
import { MapPin, Users, Clock, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function AttendancePage() {
  const sidebarMenuItems = [
    { href: "/attendance/rooms", label: "강의실 목록", key: "room-list" },
    { href: "/attendance/register", label: "강의실 등록", key: "room-register" },
  ]

  // 강의실 통계 데이터
  const roomStats = {
    total: 4,
    active: 3,
    inUse: 2,
  }

  // 강의실 현황 데이터
  const roomStatus = [
    { name: "A-101", status: "사용중", capacity: 30, current: 25, course: "웹 개발 풀스택 과정" },
    { name: "A-102", status: "사용중", capacity: 25, current: 18, course: "데이터 분석 기초 과정" },
    { name: "B-201", status: "예약됨", capacity: 20, current: 0, course: "UI/UX 디자인 과정" },
    { name: "B-202", status: "사용가능", capacity: 35, current: 0, course: "-" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "사용중":
        return "#e74c3c"
      case "예약됨":
        return "#f39c12"
      case "사용가능":
        return "#1ABC9C"
      default:
        return "#95A5A6"
    }
  }

  return (
    <PageLayout currentPage="attendance">
      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarMenuItems} currentPath="/attendance" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                강의실 관리
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                좌측 사이드바에서 메뉴를 선택해주세요.
              </p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: "#3498db20" }}>
                      <MapPin className="w-8 h-8" style={{ color: "#3498db" }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: "#3498db" }}>
                    {roomStats.total}개
                  </div>
                  <div className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    전체 강의실
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: "#3498db20" }}>
                      <Settings className="w-8 h-8" style={{ color: "#3498db" }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: "#3498db" }}>
                    {roomStats.active}개
                  </div>
                  <div className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    활성 강의실
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: "#3498db20" }}>
                      <Users className="w-8 h-8" style={{ color: "#3498db" }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: "#3498db" }}>
                    {roomStats.inUse}개
                  </div>
                  <div className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    사용 중인 강의실
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 강의실 현황 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>강의실 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roomStatus.map((room) => (
                      <div key={room.name} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-full"
                            style={{ backgroundColor: "#f1f2f6" }}
                          >
                            <MapPin className="w-5 h-5" style={{ color: "#2C3E50" }} />
                          </div>
                          <div>
                            <div className="font-medium" style={{ color: "#2C3E50" }}>
                              {room.name}
                            </div>
                            <div className="text-sm" style={{ color: "#95A5A6" }}>
                              {room.course}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="inline-block px-2 py-1 rounded text-xs font-medium text-white mb-1"
                            style={{ backgroundColor: getStatusColor(room.status) }}
                          >
                            {room.status}
                          </div>
                          <div className="text-sm" style={{ color: "#95A5A6" }}>
                            {room.current}/{room.capacity}명
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>빠른 작업</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start text-white" style={{ backgroundColor: "#3498db" }}>
                      <MapPin className="w-4 h-4 mr-2" />새 강의실 등록
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#3498db", color: "#3498db" }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      강의실 예약 현황
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#3498db", color: "#3498db" }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      사용 시간 통계
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#3498db", color: "#3498db" }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      강의실 설정 관리
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
