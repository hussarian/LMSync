"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"

export default function RoomsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedBuilding, setSelectedBuilding] = useState("all")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const sidebarMenuItems = [
    { href: "/attendance/rooms", label: "강의실 목록", key: "room-list" },
    { href: "/attendance/register", label: "강의실 등록", key: "room-register" },
  ]

  // 더미 강의실 데이터
  const roomsData = [
    {
      id: "R001",
      name: "A-101",
      building: "A동",
      floor: "1층",
      capacity: 30,
      type: "일반강의실",
      status: "사용중",
      equipment: ["프로젝터", "화이트보드", "음향시설"],
      currentCourse: "웹 개발 풀스택 과정",
      currentStudents: 25,
      schedule: "09:00-18:00",
      manager: "김관리자",
      registeredDate: "2024-01-15",
    },
    {
      id: "R002",
      name: "A-102",
      building: "A동",
      floor: "1층",
      capacity: 25,
      type: "컴퓨터실",
      status: "사용중",
      equipment: ["컴퓨터 25대", "프로젝터", "화이트보드"],
      currentCourse: "데이터 분석 기초 과정",
      currentStudents: 18,
      schedule: "14:00-17:00",
      manager: "이관리자",
      registeredDate: "2024-01-20",
    },
    {
      id: "R003",
      name: "B-201",
      building: "B동",
      floor: "2층",
      capacity: 20,
      type: "세미나실",
      status: "예약됨",
      equipment: ["프로젝터", "화이트보드", "원형테이블"],
      currentCourse: "UI/UX 디자인 과정",
      currentStudents: 0,
      schedule: "19:00-22:00",
      manager: "박관리자",
      registeredDate: "2024-02-01",
    },
    {
      id: "R004",
      name: "B-202",
      building: "B동",
      floor: "2층",
      capacity: 35,
      type: "대강의실",
      status: "사용가능",
      equipment: ["프로젝터", "화이트보드", "음향시설", "마이크"],
      currentCourse: "-",
      currentStudents: 0,
      schedule: "-",
      manager: "최관리자",
      registeredDate: "2024-02-10",
    },
    {
      id: "R005",
      name: "C-301",
      building: "C동",
      floor: "3층",
      capacity: 15,
      type: "실습실",
      status: "점검중",
      equipment: ["실습장비", "프로젝터", "화이트보드"],
      currentCourse: "-",
      currentStudents: 0,
      schedule: "-",
      manager: "정관리자",
      registeredDate: "2024-02-15",
    },
  ]

  // 필터링된 강의실 데이터
  const filteredRooms = roomsData.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.includes(searchTerm) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.manager.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || room.status === selectedStatus
    const matchesBuilding = selectedBuilding === "all" || room.building === selectedBuilding

    return matchesSearch && matchesStatus && matchesBuilding
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "사용중":
        return "#e74c3c"
      case "예약됨":
        return "#f39c12"
      case "사용가능":
        return "#1ABC9C"
      case "점검중":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "일반강의실":
        return "#3498db"
      case "컴퓨터실":
        return "#9b59b6"
      case "세미나실":
        return "#1ABC9C"
      case "대강의실":
        return "#e67e22"
      case "실습실":
        return "#34495e"
      default:
        return "#95A5A6"
    }
  }

  // 강의실 통계 계산
  const stats = {
    total: roomsData.length,
    inUse: roomsData.filter((r) => r.status === "사용중").length,
    available: roomsData.filter((r) => r.status === "사용가능").length,
    reserved: roomsData.filter((r) => r.status === "예약됨").length,
    totalCapacity: roomsData.reduce((sum, room) => sum + room.capacity, 0),
    currentOccupancy: roomsData.reduce((sum, room) => sum + room.currentStudents, 0),
  }

  const handleView = (roomId) => {
    const room = roomsData.find((r) => r.id === roomId)
    setSelectedRoom(room)
    setIsDetailModalOpen(true)
    setIsEditMode(false)
  }

  const handleCloseModal = () => {
    setIsDetailModalOpen(false)
    setSelectedRoom(null)
    setIsEditMode(false)
  }

  const handleEditRoom = () => {
    setIsEditMode(true)
  }

  const handleSaveRoom = () => {
    console.log("강의실 정보 저장:", selectedRoom)
    alert("강의실 정보가 수정되었습니다.")
    setIsEditMode(false)
  }

  const handleDeleteRoom = () => {
    if (confirm("정말로 이 강의실을 삭제하시겠습니까?")) {
      console.log("강의실 삭제:", selectedRoom.id)
      alert(`${selectedRoom.name} 강의실이 삭제되었습니다.`)
      handleCloseModal()
    }
  }

  const handleRoomFieldChange = (field, value) => {
    setSelectedRoom((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEdit = (roomId) => {
    console.log("강의실 수정:", roomId)
    // 수정 페이지로 이동
  }

  const handleDelete = (roomId) => {
    console.log("강의실 삭제:", roomId)
    if (confirm("정말로 이 강의실을 삭제하시겠습니까?")) {
      alert(`${roomId} 강의실이 삭제되었습니다.`)
    }
  }

  return (
    <PageLayout currentPage="attendance">
      <div className="flex">
        <Sidebar title="강의실 관리" menuItems={sidebarMenuItems} currentPath="/attendance/rooms" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                강의실 목록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                등록된 모든 강의실의 정보를 조회하고 관리할 수 있습니다.
              </p>
            </div>

            {/* 검색 및 필터 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>검색 및 필터</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "#95A5A6" }}
                      />
                      <Input
                        placeholder="강의실명, 건물, 유형, 관리자로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      style={{ borderColor: "#95A5A6" }}
                    >
                      <option value="all">전체 상태</option>
                      <option value="사용중">사용중</option>
                      <option value="예약됨">예약됨</option>
                      <option value="사용가능">사용가능</option>
                      <option value="점검중">점검중</option>
                    </select>
                    <select
                      value={selectedBuilding}
                      onChange={(e) => setSelectedBuilding(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      style={{ borderColor: "#95A5A6" }}
                    >
                      <option value="all">전체 건물</option>
                      <option value="A동">A동</option>
                      <option value="B동">B동</option>
                      <option value="C동">C동</option>
                    </select>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 bg-transparent"
                      style={{ borderColor: "#3498db", color: "#3498db" }}
                    >
                      <Filter className="w-4 h-4" />
                      <span>필터</span>
                    </Button>
                    <Button
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#3498db" }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>강의실 추가</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 강의실 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {stats.total}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 강의실
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#e74c3c" }}>
                    {stats.inUse}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    사용중
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {stats.available}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    사용가능
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                    {stats.reserved}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    예약됨
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#3498db" }}>
                    {stats.totalCapacity}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    총 수용인원
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {stats.currentOccupancy}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    현재 사용인원
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 강의실 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>강의실 목록 ({filteredRooms.length}개)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          강의실코드
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          강의실명
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          건물/층
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          유형
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          상태
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          수용인원
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          현재 과정
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리자
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map((room) => (
                        <tr key={room.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {room.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" style={{ color: "#3498db" }} />
                              <span className="font-medium" style={{ color: "#2C3E50" }}>
                                {room.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {room.building} {room.floor}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="text-white" style={{ backgroundColor: getTypeColor(room.type) }}>
                              {room.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="text-white" style={{ backgroundColor: getStatusColor(room.status) }}>
                              {room.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                {room.currentStudents}/{room.capacity}명
                              </span>
                              {room.capacity > 0 && (
                                <>
                                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                                    <div
                                      className="h-1 rounded-full"
                                      style={{
                                        backgroundColor: "#3498db",
                                        width: `${(room.currentStudents / room.capacity) * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                    {Math.round((room.currentStudents / room.capacity) * 100)}%
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                {room.currentCourse}
                              </p>
                              {room.schedule !== "-" && (
                                <p className="text-xs" style={{ color: "#95A5A6" }}>
                                  {room.schedule}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {room.manager}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(room.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#3498db" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(room.id)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#95A5A6" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete(room.id)} className="p-1">
                                <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredRooms.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: "#95A5A6" }} />
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
                        검색 결과가 없습니다
                      </h3>
                      <p style={{ color: "#95A5A6" }}>다른 검색어나 필터를 사용해보세요.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* 강의실 상세정보 모달 */}
      {isDetailModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" style={{ color: "#3498db" }} />
                  <h2 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {isEditMode ? "강의실 정보 수정" : "강의실 상세정보"}
                  </h2>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 기본 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#2C3E50" }}>기본 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          강의실 코드
                        </label>
                        {isEditMode ? (
                          <Input
                            value={selectedRoom.id}
                            onChange={(e) => handleRoomFieldChange("id", e.target.value)}
                          />
                        ) : (
                          <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedRoom.id}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          강의실명
                        </label>
                        {isEditMode ? (
                          <Input
                            value={selectedRoom.name}
                            onChange={(e) => handleRoomFieldChange("name", e.target.value)}
                          />
                        ) : (
                          <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          건물
                        </label>
                        {isEditMode ? (
                          <select
                            value={selectedRoom.building}
                            onChange={(e) => handleRoomFieldChange("building", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="A동">A동</option>
                            <option value="B동">B동</option>
                            <option value="C동">C동</option>
                          </select>
                        ) : (
                          <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.building}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          층
                        </label>
                        {isEditMode ? (
                          <Input
                            value={selectedRoom.floor}
                            onChange={(e) => handleRoomFieldChange("floor", e.target.value)}
                          />
                        ) : (
                          <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.floor}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          강의실 유형
                        </label>
                        {isEditMode ? (
                          <select
                            value={selectedRoom.type}
                            onChange={(e) => handleRoomFieldChange("type", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="일반강의실">일반강의실</option>
                            <option value="컴퓨터실">컴퓨터실</option>
                            <option value="세미나실">세미나실</option>
                            <option value="대강의실">대강의실</option>
                            <option value="실습실">실습실</option>
                          </select>
                        ) : (
                          <Badge className="text-white" style={{ backgroundColor: getTypeColor(selectedRoom.type) }}>
                            {selectedRoom.type}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                          상태
                        </label>
                        {isEditMode ? (
                          <select
                            value={selectedRoom.status}
                            onChange={(e) => handleRoomFieldChange("status", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="사용중">사용중</option>
                            <option value="예약됨">예약됨</option>
                            <option value="사용가능">사용가능</option>
                            <option value="점검중">점검중</option>
                          </select>
                        ) : (
                          <Badge
                            className="text-white"
                            style={{ backgroundColor: getStatusColor(selectedRoom.status) }}
                          >
                            {selectedRoom.status}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        수용 인원
                      </label>
                      {isEditMode ? (
                        <Input
                          type="number"
                          value={selectedRoom.capacity}
                          onChange={(e) => handleRoomFieldChange("capacity", Number.parseInt(e.target.value))}
                        />
                      ) : (
                        <div className="flex items-center space-x-4">
                          <p className="text-sm bg-gray-100 p-2 rounded">최대 {selectedRoom.capacity}명</p>
                          <p className="text-sm" style={{ color: "#95A5A6" }}>
                            현재 {selectedRoom.currentStudents}명 사용중
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 현재 사용 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#2C3E50" }}>현재 사용 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        현재 진행 과정
                      </label>
                      {isEditMode ? (
                        <Input
                          value={selectedRoom.currentCourse}
                          onChange={(e) => handleRoomFieldChange("currentCourse", e.target.value)}
                        />
                      ) : (
                        <p className="text-sm bg-gray-100 p-2 rounded">
                          {selectedRoom.currentCourse || "사용 중인 과정 없음"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        사용 시간
                      </label>
                      {isEditMode ? (
                        <Input
                          value={selectedRoom.schedule}
                          onChange={(e) => handleRoomFieldChange("schedule", e.target.value)}
                        />
                      ) : (
                        <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.schedule || "예약된 시간 없음"}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        사용률
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full"
                            style={{
                              backgroundColor: "#3498db",
                              width: `${selectedRoom.capacity > 0 ? (selectedRoom.currentStudents / selectedRoom.capacity) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          {selectedRoom.capacity > 0
                            ? Math.round((selectedRoom.currentStudents / selectedRoom.capacity) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        관리자
                      </label>
                      {isEditMode ? (
                        <Input
                          value={selectedRoom.manager}
                          onChange={(e) => handleRoomFieldChange("manager", e.target.value)}
                        />
                      ) : (
                        <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.manager}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: "#2C3E50" }}>
                        등록일
                      </label>
                      <p className="text-sm bg-gray-100 p-2 rounded">{selectedRoom.registeredDate}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 장비 정보 */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>보유 장비</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 버튼 영역 */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                {isEditMode ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditMode(false)} className="px-6">
                      취소
                    </Button>
                    <Button onClick={handleSaveRoom} className="px-6 text-white" style={{ backgroundColor: "#3498db" }}>
                      저장
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleDeleteRoom}
                      className="px-6 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </Button>
                    <Button onClick={handleEditRoom} className="px-6 text-white" style={{ backgroundColor: "#3498db" }}>
                      <Edit className="w-4 h-4 mr-2" />
                      수정
                    </Button>
                    <Button variant="outline" onClick={handleCloseModal} className="px-6 bg-transparent">
                      닫기
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
