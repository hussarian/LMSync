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
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [courseFormData, setCourseFormData] = useState({
    name: "",
    category: "프로그래밍",
    instructor: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    price: "",
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
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
  ]

  // 더미 과정 데이터
  const coursesData = [
    {
      id: "C001",
      name: "웹 개발 풀스택 과정",
      category: "프로그래밍",
      instructor: "김강사",
      duration: "6개월",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      students: 25,
      maxStudents: 30,
      status: "진행중",
      description: "HTML, CSS, JavaScript, React, Node.js를 활용한 풀스택 웹 개발 과정",
      price: "1,200,000원",
      schedule: "월, 수, 금 19:00-22:00",
      location: "강의실 A-101",
      prerequisites: "컴퓨터 기초 지식",
    },
    {
      id: "C002",
      name: "데이터 분석 기초 과정",
      category: "데이터사이언스",
      instructor: "이교수",
      duration: "3개월",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      students: 18,
      maxStudents: 20,
      status: "진행중",
      description: "Python, Pandas, NumPy를 활용한 데이터 분석 기초 과정",
      price: "800,000원",
      schedule: "화, 목 14:00-17:00",
      location: "온라인",
      prerequisites: "수학 기초 지식",
    },
    {
      id: "C003",
      name: "UI/UX 디자인 과정",
      category: "디자인",
      instructor: "박디자이너",
      duration: "4개월",
      startDate: "2024-01-10",
      endDate: "2024-05-10",
      students: 15,
      maxStudents: 15,
      status: "마감",
      description: "Figma, Adobe XD를 활용한 UI/UX 디자인 실무 과정",
      price: "950,000원",
      schedule: "월, 수 10:00-13:00",
      location: "디자인 스튜디오",
      prerequisites: "디자인 툴 사용 경험",
    },
    {
      id: "C004",
      name: "모바일 앱 개발 과정",
      category: "프로그래밍",
      instructor: "최개발자",
      duration: "5개월",
      startDate: "2024-04-01",
      endDate: "2024-08-31",
      students: 0,
      maxStudents: 25,
      status: "모집중",
      description: "React Native를 활용한 크로스플랫폼 모바일 앱 개발 과정",
      price: "1,100,000원",
      schedule: "화, 목 19:00-22:00",
      location: "온라인",
      prerequisites: "JavaScript 기초 지식",
    },
    {
      id: "C005",
      name: "디지털 마케팅 과정",
      category: "마케팅",
      instructor: "정마케터",
      duration: "2개월",
      startDate: "2024-01-01",
      endDate: "2024-02-29",
      students: 22,
      maxStudents: 25,
      status: "완료",
      description: "SNS 마케팅, 구글 애드워즈, 콘텐츠 마케팅 전략 과정",
      price: "600,000원",
      schedule: "월, 금 14:00-17:00",
      location: "마케팅 센터",
      prerequisites: "마케팅 기초 지식",
    },
    {
      id: "C006",
      name: "클라우드 인프라 과정",
      category: "인프라",
      instructor: "한엔지니어",
      duration: "4개월",
      startDate: "2024-03-15",
      endDate: "2024-07-15",
      students: 12,
      maxStudents: 20,
      status: "진행중",
      description: "AWS, Docker, Kubernetes를 활용한 클라우드 인프라 구축 과정",
      price: "1,000,000원",
      schedule: "수, 금 10:00-13:00",
      location: "클라우드 센터",
      prerequisites: "리눅스 기초 지식",
    },
    {
      id: "C007",
      name: "인공지능 기초 과정",
      category: "AI/ML",
      instructor: "윤연구원",
      duration: "6개월",
      startDate: "2024-05-01",
      endDate: "2024-10-31",
      students: 0,
      maxStudents: 30,
      status: "모집중",
      description: "Python, TensorFlow를 활용한 머신러닝 및 딥러닝 기초 과정",
      price: "1,500,000원",
      schedule: "화, 목 10:00-13:00",
      location: "AI 연구소",
      prerequisites: "Python 기초 지식",
    },
    {
      id: "C008",
      name: "사이버보안 전문가 과정",
      category: "보안",
      instructor: "송보안전문가",
      duration: "8개월",
      startDate: "2024-02-01",
      endDate: "2024-09-30",
      students: 16,
      maxStudents: 18,
      status: "진행중",
      description: "네트워크 보안, 웹 보안, 모의해킹 실무 과정",
      price: "1,800,000원",
      schedule: "월, 수, 금 14:00-17:00",
      location: "보안 센터",
      prerequisites: "네트워크 기초 지식",
    },
  ]

  // 필터링된 과정 데이터
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
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
    const course = coursesData.find((c) => c.id === courseId)
    if (course) {
      setEditingCourse(course)
      setCourseFormData({
        name: course.name,
        category: course.category,
        instructor: course.instructor,
        duration: course.duration,
        startDate: course.startDate,
        endDate: course.endDate,
        maxStudents: course.maxStudents.toString(),
        price: course.price,
        description: course.description,
        schedule: course.schedule || "",
        location: course.location || "",
        prerequisites: course.prerequisites || "",
      })
    } else {
      setEditingCourse(null)
      setCourseFormData({
        name: "",
        category: "프로그래밍",
        instructor: "",
        duration: "",
        startDate: "",
        endDate: "",
        maxStudents: "",
        price: "",
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
      category: "프로그래밍",
      instructor: "",
      duration: "",
      startDate: "",
      endDate: "",
      maxStudents: "",
      price: "",
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
                          카테고리
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
                          수강료
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
                          <td className="py-3 px-4">
                            <Badge variant="outline" style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}>
                              {course.category}
                            </Badge>
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
                          <td className="py-3 px-4 text-center font-medium" style={{ color: "#1ABC9C" }}>
                            {course.price}
                          </td>
                          <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                            {course.startDate}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => handleView(course.id)} className="p-1">
                                <Eye className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleEdit(course.id)} className="p-1">
                                <Edit className="w-4 h-4" style={{ color: "#95A5A6" }} />
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
      {/* 과정 생성/편집 모달 */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#2C3E50" }}>{editingCourse ? "과정 수정" : "새 과정 생성"}</CardTitle>
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
                    과정명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="과정명을 입력하세요"
                    value={courseFormData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={courseFormData.category}
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
                    담당 강사 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="강사명을 입력하세요"
                    value={courseFormData.instructor}
                    onChange={(e) => handleFormChange("instructor", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    과정 기간 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="예: 6개월, 12주"
                    value={courseFormData.duration}
                    onChange={(e) => handleFormChange("duration", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    시작일 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={courseFormData.startDate}
                    onChange={(e) => handleFormChange("startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    종료일 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={courseFormData.endDate}
                    onChange={(e) => handleFormChange("endDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    최대 수강생 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={courseFormData.maxStudents}
                    onChange={(e) => handleFormChange("maxStudents", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    수강료 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="예: 1,200,000원"
                    value={courseFormData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    수업 일정
                  </label>
                  <Input
                    placeholder="예: 월, 수, 금 19:00-22:00"
                    value={courseFormData.schedule}
                    onChange={(e) => handleFormChange("schedule", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    강의실
                  </label>
                  <Input
                    placeholder="예: 강의실 A-101"
                    value={courseFormData.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                    수강 조건
                  </label>
                  <Input
                    placeholder="예: 컴퓨터 기초 지식"
                    value={courseFormData.prerequisites}
                    onChange={(e) => handleFormChange("prerequisites", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                  과정 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="과정에 대한 상세한 설명을 입력하세요"
                  value={courseFormData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md resize-none"
                  style={{ borderColor: "#95A5A6" }}
                  rows={4}
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
                  onClick={handleSaveCourse}
                  className="text-white font-medium"
                  style={{ backgroundColor: "#1ABC9C" }}
                >
                  {editingCourse ? "수정" : "생성"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
