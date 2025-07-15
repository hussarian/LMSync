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

export default function CoursesListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [editingCourse, setEditingCourse] = useState(null)
  const [courseFormData, setCourseFormData] = useState({
    name: "",
    instructor: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    description: "",
    schedule: "",
    location: "",
    prerequisites: "",
  })

  const router = useRouter()

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  // 과정 데이터
  const coursesData = []

  // 필터링된 과정 데이터
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus

    return matchesSearch && matchesStatus 
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "#1ABC9C"
      case "모집중":
        return "#3498db"
      case "마감":
        return "#f39c12"
      case "완료":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }

  const handleEdit = (courseId) => {
    if (courseId === null) {
      // 과정 추가 버튼 클릭 시 과정 등록 페이지로 이동
      router.push('/courses/register')
      return
    }
    
    const course = coursesData.find((c) => c.id === courseId)
    if (course) {
      setEditingCourse(course)
      setCourseFormData({
        name: course.name,
        instructor: course.instructor,
        duration: course.duration,
        startDate: course.startDate,
        endDate: course.endDate,
        maxStudents: course.maxStudents.toString(),
        description: course.description,
        schedule: course.schedule || "",
        location: course.location || "",
        prerequisites: course.prerequisites || "",
      })
    } else {
      setEditingCourse(null)
      setCourseFormData({
        name: "",
        instructor: "",
        duration: "",
        startDate: "",
        endDate: "",
        maxStudents: "",
        description: "",
        schedule: "",
        location: "",
        prerequisites: "",
      })
    }
    setIsCreateModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
    setEditingCourse(null)
    setCourseFormData({
      name: "",
      instructor: "",
      duration: "",
      startDate: "",
      endDate: "",
      maxStudents: "",
      description: "",
      schedule: "",
      location: "",
      prerequisites: "",
    })
  }

  const handleFormChange = (field, value) => {
    setCourseFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveCourse = () => {
    console.log("저장된 과정 데이터:", courseFormData)
    if (editingCourse) {
      alert(`${courseFormData.name} 과정이 수정되었습니다.`)
    } else {
      alert(`${courseFormData.name} 과정이 생성되었습니다.`)
    }
    handleCloseModal()
  }

  const handleDelete = (courseId) => {
    console.log("과정 삭제:", courseId)
    if (confirm("정말로 이 과정을 삭제하시겠습니까?")) {
      alert(`${courseId} 과정이 삭제되었습니다.`)
    }
  }

  const handleView = (courseId) => {
    router.push(`/courses/list/${courseId}`)
  }

  // 과정 통계 계산
  const stats = {
    total: coursesData.length,
    active: coursesData.filter((c) => c.status === "진행중").length,
    recruiting: coursesData.filter((c) => c.status === "모집중").length,
    completed: coursesData.filter((c) => c.status === "완료").length,
    totalStudents: coursesData.reduce((sum, course) => sum + course.students, 0),
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/list" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                전체 과정 목록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                등록된 모든 과정의 정보를 조회하고 관리할 수 있습니다.
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
                        placeholder="과정명, 과정코드, 강사명, 카테고리로 검색..."
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
                      <option value="모집중">모집중</option>
                      <option value="진행중">진행중</option>
                      <option value="마감">마감</option>
                      <option value="완료">완료</option>
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
                      <span>과정 추가</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 과정 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                    {stats.total}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    전체 과정
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {stats.active}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    진행중
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#3498db" }}>
                    {stats.recruiting}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    모집중
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#95A5A6" }}>
                    {stats.completed}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    완료
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                    {stats.totalStudents}
                  </div>
                  <div className="text-sm" style={{ color: "#95A5A6" }}>
                    총 수강생
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 과정 목록 테이블 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>과정 목록 ({filteredCourses.length}개)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          과정코드
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          과정명
                        </th>
                        <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          강사명
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          상태
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          수강생
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          기간
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          시작일
                        </th>
                        <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {course.id}
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {course.name}
                              </p>
                              <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                {course.description.length > 50
                                  ? `${course.description.substring(0, 50)}...`
                                  : course.description}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                            {course.instructor}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="text-white" style={{ backgroundColor: getStatusColor(course.status) }}>
                              {course.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                                {course.students}/{course.maxStudents}명
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                                <div
                                  className="h-1 rounded-full"
                                  style={{
                                    backgroundColor: "#1ABC9C",
                                    width: `${(course.students / course.maxStudents) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                {Math.round((course.students / course.maxStudents) * 100)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {course.duration}
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {course.startDate}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(course.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete(course.id)} className="p-1">
                                <Trash2 className="w-4 h-4" style={{ color: "#e74c3c" }} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredCourses.length === 0 && (
                    <div className="text-center py-8">
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
     
      )
    </PageLayout>
  )
}
