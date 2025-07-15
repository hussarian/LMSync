"use client"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function ClassroomPage() {
  const sidebarMenuItems = [
    { href: "/classroom/rooms", label: "강의실 목록", key: "room-list" },
    { href: "/classroom/register", label: "강의실 등록", key: "room-register" },
  ]

  // 강의실 통계 데이터 (실제 API에서 가져올 데이터)
  const roomStats = {
    total: 0,
    active: 0,
    inUse: 0,
  }

  // 강의실 현황 데이터 (실제 API에서 가져올 데이터)
  const roomStatus = []

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
    <PageLayout currentPage="classroom">
      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarMenuItems} currentPath="/classroom" />

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
                      <MapPin className="w-8 h-8" style={{ color: "#3498db" }} />
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
                      <MapPin className="w-8 h-8" style={{ color: "#3498db" }} />
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
          </div>
        </main>
      </div>
    </PageLayout>
  )
} 