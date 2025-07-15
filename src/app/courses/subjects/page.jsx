"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import EmptyState from "@/components/ui/empty-state"
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
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
  ]

  // TODO: API 연동 필요 - 과목 목록 데이터
  const subjectsData = []

  // 필터링된 과목 데이터
  const filteredSubjects = subjectsData.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.id.includes(searchTerm) ||
      subject.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || subject.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || subject.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
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
    // TODO: 실제 API 호출로 교체 필요
    if (editingSubject) {
      // 과목 수정 API 호출
    } else {
      // 과목 생성 API 호출
    }
    handleCloseModal()
  }

  const handleDelete = (subjectId) => {
    if (confirm("정말로 이 과목을 삭제하시겠습니까?")) {
      // TODO: 실제 삭제 API 호출로 교체 필요
    }
  }

  const handleView = (subjectId) => {
    router.push(`/courses/subjects/${subjectId}`)
  }

  // 과목 통계 계산
  const stats = {
    total: subjectsData.length,
    active: subjectsData.filter((s) => s.status === "활성").length,
    inactive: subjectsData.filter((s) => s.status === "비활성").length,
    programming: subjectsData.filter((s) => s.category === "프로그래밍").length,
    datascience: subjectsData.filter((s) => s.category === "데이터사이언스").length,
    design: subjectsData.filter((s) => s.category === "디자인").length,
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
                        placeholder="과목명, 과목코드, 강사명, 설명으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      style={{ borderColor: "#95A5A6" }}
                    >
                      <option value="all">전체 카테고리</option>
                      <option value="프로그래밍">프로그래밍</option>
                      <option value="데이터사이언스">데이터사이언스</option>
                      <option value="디자인">디자인</option>
                      <option value="마케팅">마케팅</option>
                      <option value="인프라">인프라</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="보안">보안</option>
                    </select>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      style={{ borderColor: "#95A5A6" }}
                    >
                      <option value="all">전체 난이도</option>
                      <option value="초급">초급</option>
                      <option value="중급">중급</option>
                      <option value="고급">고급</option>
                    </select>
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
                      onClick={() => handleEdit(null)}
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
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {stats.active}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    활성 과목
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#95A5A6" }}>
                    {stats.inactive}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    비활성 과목
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#3498db" }}>
                    {stats.programming}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    프로그래밍
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {stats.datascience}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    데이터사이언스
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#e67e22" }}>
                    {stats.design}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    디자인
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 과목 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>과목 목록 ({filteredSubjects.length}개)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          과목코드
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          과목명
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          카테고리
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          난이도
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          기간
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          담당강사
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          상태
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          사용 과정
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          등록일
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubjects.map((subject) => (
                        <tr key={subject.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {subject.id}
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {subject.name}
                              </p>
                              <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                {subject.description.length > 40
                                  ? `${subject.description.substring(0, 40)}...`
                                  : subject.description}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}>
                              {subject.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              className="text-white"
                              style={{ backgroundColor: getDifficultyColor(subject.difficulty) }}
                            >
                              {subject.difficulty}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {subject.duration}
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {subject.instructor}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="text-white" style={{ backgroundColor: getStatusColor(subject.status) }}>
                              {subject.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                              {subject.usedInCourses}개 과정
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {subject.createdDate}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(subject.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(subject.id)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#95A5A6" }} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(subject.id)}
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

                  {subjectsData.length === 0 ? (
                    <EmptyState
                      icon={BookOpen}
                      title="등록된 과목이 없습니다"
                      description="새로운 과목을 등록해보세요."
                      action={
                        <Button 
                          onClick={() => router.push('/courses/subjects/register')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          과목 등록
                        </Button>
                      }
                    />
                  ) : filteredSubjects.length === 0 ? (
                    <EmptyState
                      icon={BookOpen}
                      title="검색 결과가 없습니다"
                      description="다른 검색어나 필터를 사용해보세요."
                    />
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* 과목 생성/편집 모달 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#2C3E50" }}>{editingSubject ? "과목 수정" : "새 과목 생성"}</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseModal} style={{ color: "#95A5A6" }}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    과목명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="과목명을 입력하세요"
                    value={subjectFormData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subjectFormData.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: "#95A5A6" }}
                  >
                    <option value="프로그래밍">프로그래밍</option>
                    <option value="데이터사이언스">데이터사이언스</option>
                    <option value="디자인">디자인</option>
                    <option value="마케팅">마케팅</option>
                    <option value="인프라">인프라</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="보안">보안</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    난이도 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subjectFormData.difficulty}
                    onChange={(e) => handleFormChange("difficulty", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: "#95A5A6" }}
                  >
                    <option value="초급">초급</option>
                    <option value="중급">중급</option>
                    <option value="고급">고급</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    과목 기간 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="예: 2주, 4주"
                    value={subjectFormData.duration}
                    onChange={(e) => handleFormChange("duration", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                  과목 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="과목에 대한 상세한 설명을 입력하세요"
                  value={subjectFormData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md resize-none"
                  style={{ borderColor: "#95A5A6" }}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                  수강 조건
                </label>
                <Input
                  placeholder="예: HTML/CSS 기초"
                  value={subjectFormData.prerequisites}
                  onChange={(e) => handleFormChange("prerequisites", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                  학습 목표
                </label>
                <textarea
                  placeholder="이 과목을 통해 달성할 수 있는 학습 목표를 입력하세요"
                  value={subjectFormData.objectives}
                  onChange={(e) => handleFormChange("objectives", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md resize-none"
                  style={{ borderColor: "#95A5A6" }}
                  rows={2}
                />
              </div>

              {/* 버튼 그룹 */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="bg-transparent"
                  style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                >
                  취소
                </Button>
                <Button
                  onClick={handleSaveSubject}
                  className="text-white font-medium"
                  style={{ backgroundColor: "#1ABC9C" }}
                >
                  {editingSubject ? "수정" : "생성"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
