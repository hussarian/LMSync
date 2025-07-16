"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, BookOpen, Award, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"

// 세부 과목 목록 페이지 컴포넌트
export default function DetailSubjectsListPage() {
  // 검색어 입력 상태 (검색창에 입력된 값)
  const [searchTerm, setSearchTerm] = useState("")
  // 부모 과목 필터 상태
  const [selectedParentSubject, setSelectedParentSubject] = useState("all")
  // 난이도 필터 상태
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  // 상태(활성/비활성) 필터 상태
  const [selectedStatus, setSelectedStatus] = useState("all")
  // 상세보기 모달 표시 여부
  const [showDetailModal, setShowDetailModal] = useState(false)
  // 상세보기에서 선택된 세부 과목 정보
  const [selectedSubject, setSelectedSubject] = useState(null)
  // 세부 과목 생성 모달 표시 여부
  const [showCreateModal, setShowCreateModal] = useState(false)
  // 새 세부 과목명 입력값
  const [newSubjectName, setNewSubjectName] = useState("")
  // 새 세부 과목 설명 입력값
  const [newSubjectDescription, setNewSubjectDescription] = useState("")
  // 등록/수정 모드 구분 (true: 수정, false: 등록)
  const [isEditMode, setIsEditMode] = useState(false)
  // 수정 대상 세부과목 정보 (수정 시에만 사용)
  const [editTarget, setEditTarget] = useState(null)

  // next/navigation의 라우터 객체 (페이지 이동에 사용)
  const router = useRouter()

  // 사이드바에 표시할 메뉴 항목 배열
  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  // 실제 세부 과목 데이터 배열 (현재는 빈 배열, 추후 API 연동 예정)
  const filteredDetailSubjects = []

  // 과목 상태(활성/비활성)에 따라 색상 반환
  const getStatusColor = (status) => {
    switch (status) {
      case "활성":
        return "#1ABC9C"
      case "비활성":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }


  // 삭제 버튼 클릭 시 삭제 확인 후 알림 (실제 삭제 로직은 추후 구현)
  const handleDelete = (subjectId) => {
    console.log("세부 과목 삭제:", subjectId)
    if (confirm("정말로 이 세부 과목을 삭제하시겠습니까?")) {
      alert(`${subjectId} 세부 과목이 삭제되었습니다.`)
    }
  }

  // 상세보기 버튼 클릭 시 해당 세부 과목 정보로 모달 표시
  const handleView = (subject) => {
    // 실제 데이터 연동 시 subjectId로 데이터 조회 필요
    setSelectedSubject(subject)
    setShowDetailModal(true)
  }

  // '세부 과목 추가' 버튼 클릭 시 등록 모드로 모달 오픈
  const handleCreateNew = () => {
    setIsEditMode(false)
    setEditTarget(null)
    setNewSubjectName("")
    setNewSubjectDescription("")
    setShowCreateModal(true)
  }

  // 등록/수정 모달에서 등록/수정 버튼 클릭 시 동작
  const handleModalSubmit = () => {
    if (!newSubjectName.trim() || !newSubjectDescription.trim()) {
      alert("세부 과목명과 설명을 모두 입력해주세요.")
      return
    }
    if (isEditMode) {
      // 수정 로직 (API 연동 시 editTarget.id 등 활용)
      console.log("세부 과목 수정:", {
        id: editTarget?.id,
        name: newSubjectName,
        description: newSubjectDescription,
      })
      alert(`"${newSubjectName}" 세부 과목이 수정되었습니다.`)
    } else {
      // 등록 로직
      console.log("새 세부 과목 생성:", {
        name: newSubjectName,
        description: newSubjectDescription,
      })
      alert(`"${newSubjectName}" 세부 과목이 생성되었습니다.`)
    }
    setShowCreateModal(false)
    setEditTarget(null)
    setNewSubjectName("")
    setNewSubjectDescription("")
  }

  // 등록/수정 모달에서 '취소' 클릭 시 동작
  const handleCreateCancel = () => {
    setShowCreateModal(false)
    setEditTarget(null)
    setNewSubjectName("")
    setNewSubjectDescription("")
  }

  // 세부 과목 통계(목록 개수 등, 실제 데이터 연동 시 값 변경)
  const stats = {
    total: 0, // 전체 세부 과목 수
  }

  // 실제 렌더링 시작
  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        {/* 왼쪽 사이드바: 세부 과목 관리 메뉴 */}
        <Sidebar title="세부 과목 관리" menuItems={sidebarMenuItems} currentPath="/courses/detail" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* 상단 타이틀 및 설명 */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                세부 과목 목록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                등록된 모든 세부 과목의 정보를 조회하고 관리할 수 있습니다.
              </p>
            </div>

            {/* 검색 및 필터 영역: 검색창, 추가 버튼 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>검색 및 필터</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      {/* 검색 아이콘과 입력창 */}
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "#95A5A6" }}
                      />
                      <Input
                        placeholder="세부 과목명, 세부 과목 설명으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 핸들러
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* 세부 과목 추가 버튼 */}
                    <Button
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#1ABC9C" }}
                      onClick={handleCreateNew}
                    >
                      <Plus className="w-4 h-4" />
                      <span>세부 과목 추가</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 세부 과목 통계 카드: 전체 개수  */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {stats.total}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 세부 과목
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 세부 과목 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>세부 과목 목록 ({filteredDetailSubjects.length}개)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          세부 과목명
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          설명
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 세부 과목 데이터 반복 렌더링 (현재는 빈 배열) */}
                      {filteredDetailSubjects.map((subjectdetail) => (
                        <tr key={subjectdetail.subDetailId} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4">
                            <div>
                              {/* 세부 과목명 표시 */}
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {subjectdetail.subDetailName}
                              </p>                              
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              {/* 세부 과목 설명 표시 (30자 이상이면 ... 처리) */}
                              <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                {subjectdetail.subDetailInfo.length > 30
                                  ? `${subjectdetail.subDetailInfo.substring(0, 30)}...`
                                  : subjectdetail.subDetailInfo}
                              </p>
                            </div>
                          </td>
                          
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              {/* 상세보기, 편집, 삭제 버튼 */}
                              <Button size="sm" variant="ghost" onClick={() => handleView(subjectdetail)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(subjectdetail)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#95A5A6" }} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(subjectdetail.subDetailId)}
                                className="p-1"
                              >
                                <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* 데이터가 없을 때 안내 메시지 */}
                  {filteredDetailSubjects.length === 0 && (
                    <div className="text-center py-8">
                      {/* 빈 목록 안내 아이콘 및 메시지 */}
                      <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "#95A5A6" }} />
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
      {/* 세부 과목 상세보기 모달: 상세 정보 표시 (데이터 연동 시 구현) */}
      {showDetailModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                세부 과목 상세 정보
              </h2>
              {/* 모달 닫기 버튼 */}
              <Button variant="ghost" onClick={() => setShowDetailModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                  세부 과목명
                </label>
                <p className="text-lg font-medium" style={{ color: "#2C3E50" }}>
                  {selectedSubject.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                  설명
                </label>
                <p style={{ color: "#2C3E50" }}>{selectedSubject.description}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
                style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  setShowDetailModal(false)
                  handleEdit(selectedSubject)
                }}
                style={{ backgroundColor: "#1ABC9C", color: "white" }}
              >
                편집
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 등록/수정 모달 (isEditMode에 따라 동작/타이틀/버튼 변경) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                {isEditMode ? "세부 과목 수정" : "새 세부 과목 만들기"}
              </h2>
              <Button variant="ghost" onClick={handleCreateCancel} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#2C3E50" }}>
                  세부 과목명 *
                </label>
                <Input
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="세부 과목명을 입력하세요"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#2C3E50" }}>
                  설명 *
                </label>
                <textarea
                  value={newSubjectDescription}
                  onChange={(e) => setNewSubjectDescription(e.target.value)}
                  placeholder="세부 과목에 대한 설명을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  rows={4}
                  style={{ borderColor: "#95A5A6" }}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={handleCreateCancel}
                style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
              >
                취소
              </Button>
              <Button
                onClick={handleModalSubmit}
                style={{ backgroundColor: isEditMode ? "#f39c12" : "#1ABC9C", color: "white" }}
              >
                {isEditMode ? "수정" : "등록"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
