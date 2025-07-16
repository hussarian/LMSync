"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import { useRouter } from "next/navigation"

export default function SubjectsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [subjectFormData, setSubjectFormData] = useState({
    name: "",
    category: "프로그래밍",
    difficulty: "초급",
    duration: "",
    description: "",
    prerequisites: "",
    objectives: "",
  })

  const router = useRouter()

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  // 더미 데이터 제거: 실제 데이터는 API 등에서 받아와야 함
  // const subjectsData = [ ... ] (삭제)
  // 임시: 빈 배열로 처리
  const subjectsData = []

  // 필터링된 과목 데이터
  const filteredSubjects = subjectsData.filter((subject) => {
    // 실제 데이터 연동 전까지는 항상 빈 배열
    return false
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "초급":
        return "#1ABC9C"
      case "중급":
        return "#f39c12"
      case "고급":
        return "#e74c3c"
      default:
        return "#95A5A6"
    }
  }

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

  const handleEdit = (subjectId) => {
    const subject = subjectsData.find((s) => s.id === subjectId)
    if (subject) {
      setEditingSubject(subject)
      setSubjectFormData({
        name: subject.name,
        category: subject.category,
        difficulty: subject.difficulty,
        duration: subject.duration,
        description: subject.description,
        prerequisites: subject.prerequisites,
        objectives: subject.objectives,
      })
    } else {
      setEditingSubject(null)
      setSubjectFormData({
        name: "",
        category: "프로그래밍",
        difficulty: "초급",
        duration: "",
        description: "",
        prerequisites: "",
        objectives: "",
      })
    }
    setIsCreateModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
    setEditingSubject(null)
    setSubjectFormData({
      name: "",
      category: "프로그래밍",
      difficulty: "초급",
      duration: "",
      description: "",
      prerequisites: "",
      objectives: "",
    })
  }

  const handleFormChange = (field, value) => {
    setSubjectFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSubject = () => {
    console.log("저장된 과목 데이터:", subjectFormData)
    if (editingSubject) {
      alert(`${subjectFormData.name} 과목이 수정되었습니다.`)
    } else {
      alert(`${subjectFormData.name} 과목이 생성되었습니다.`)
    }
    handleCloseModal()
  }

  const handleDelete = (subjectId) => {
    console.log("과목 삭제:", subjectId)
    if (confirm("정말로 이 과목을 삭제하시겠습니까?")) {
      alert(`${subjectId} 과목이 삭제되었습니다.`)
    }
  }

  const handleView = (subjectId) => {
    router.push(`/courses/subjects/${subjectId}`)
  }

  // 과목 통계 계산
  const stats = {
    total: subjectsData.length,
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/subjects" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                전체 과목 목록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                등록된 모든 과목의 정보를 조회하고 관리할 수 있습니다.
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
                        placeholder="과목명, 과목코드, 세부과목명 으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 bg-transparent"
                      style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                    >
                      <Filter className="w-4 h-4" />
                      <span>필터</span>
                    </Button>
                    <Button
                      className="text-white font-medium flex items-center space-x-2"
                      style={{ backgroundColor: "#1ABC9C" }}
                      onClick={() => router.push("/courses/subjects/register")}
                    >
                      <Plus className="w-4 h-4" />
                      <span>과목 추가</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* 과목 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {stats.total}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 과목
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* 과목 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>과목 목록 (0개)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "#95A5A6" }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
                    등록된 과목이 없습니다
                  </h3>
                  <p style={{ color: "#95A5A6" }}>과목을 추가하거나, 실제 데이터를 연동해 주세요.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
