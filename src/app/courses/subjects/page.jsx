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
    { href: "/courses/subjects/detail", label: "세부 과목 등록", key: "subject-detail" },
  ]

  // 더미 과목 데이터
  const subjectsData = [
    {
      id: "S001",
      name: "HTML/CSS 기초",
      category: "프로그래밍",
      difficulty: "초급",
      duration: "2주",
      description: "웹 표준과 시맨틱 마크업을 학습하는 기초 과목",
      prerequisites: "컴퓨터 기초 지식",
      objectives: "HTML5와 CSS3를 활용한 웹 페이지 제작",
      instructor: "김강사",
      status: "활성",
      createdDate: "2024-01-15",
      usedInCourses: 3,
    },
    {
      id: "S002",
      name: "JavaScript 기초",
      category: "프로그래밍",
      difficulty: "초급",
      duration: "2주",
      description: "변수, 함수, 객체, DOM 조작을 학습하는 JavaScript 기초 과목",
      prerequisites: "HTML/CSS 기초",
      objectives: "JavaScript 기본 문법과 DOM 조작 능력 습득",
      instructor: "이강사",
      status: "활성",
      createdDate: "2024-01-20",
      usedInCourses: 5,
    },
    {
      id: "S003",
      name: "JavaScript 심화",
      category: "프로그래밍",
      difficulty: "중급",
      duration: "4주",
      description: "비동기 처리, ES6+, 모듈 시스템을 학습하는 심화 과목",
      prerequisites: "JavaScript 기초",
      objectives: "고급 JavaScript 개념과 모던 개발 기법 습득",
      instructor: "박강사",
      status: "활성",
      createdDate: "2024-01-25",
      usedInCourses: 4,
    },
    {
      id: "S004",
      name: "React 기초",
      category: "프로그래밍",
      difficulty: "중급",
      duration: "4주",
      description: "컴포넌트, 상태관리, 라이프사이클을 학습하는 React 기초 과목",
      prerequisites: "JavaScript 심화",
      objectives: "React를 활용한 SPA 개발 능력 습득",
      instructor: "최강사",
      status: "활성",
      createdDate: "2024-02-01",
      usedInCourses: 3,
    },
    {
      id: "S005",
      name: "React 심화",
      category: "프로그래밍",
      difficulty: "고급",
      duration: "4주",
      description: "라우팅, 상태관리 라이브러리를 학습하는 React 심화 과목",
      prerequisites: "React 기초",
      objectives: "복잡한 React 애플리케이션 개발 능력 습득",
      instructor: "정강사",
      status: "활성",
      createdDate: "2024-02-05",
      usedInCourses: 2,
    },
    {
      id: "S006",
      name: "Node.js & Express",
      category: "프로그래밍",
      difficulty: "중급",
      duration: "4주",
      description: "서버 개발, API 구축을 학습하는 백엔드 과목",
      prerequisites: "JavaScript 심화",
      objectives: "Node.js를 활용한 서버 개발 능력 습득",
      instructor: "한강사",
      status: "활성",
      createdDate: "2024-02-10",
      usedInCourses: 3,
    },
    {
      id: "S007",
      name: "데이터베이스 연���",
      category: "프로그래밍",
      difficulty: "중급",
      duration: "4주",
      description: "MongoDB 연동, 데이터베이스 설계를 학습하는 과목",
      prerequisites: "Node.js & Express",
      objectives: "데이터베이스 연동 및 관리 능력 습득",
      instructor: "윤강사",
      status: "활성",
      createdDate: "2024-02-15",
      usedInCourses: 2,
    },
    {
      id: "S008",
      name: "Python 기초",
      category: "데이터사이언스",
      difficulty: "초급",
      duration: "2주",
      description: "데이터 분석을 위한 Python 기초 문법 학습",
      prerequisites: "프로���래밍 기초 지식",
      objectives: "Python 기본 문법과 라이브러리 활용 능력 습득",
      instructor: "송강사",
      status: "활성",
      createdDate: "2024-01-30",
      usedInCourses: 4,
    },
    {
      id: "S009",
      name: "NumPy & Pandas",
      category: "데이터사이언스",
      difficulty: "중급",
      duration: "2주",
      description: "배열 연산과 데이터프레임 조작을 학습하는 과목",
      prerequisites: "Python 기초",
      objectives: "데이터 처리 및 분석 라이브러리 활용 능력 습득",
      instructor: "강강사",
      status: "활성",
      createdDate: "2024-02-20",
      usedInCourses: 3,
    },
    {
      id: "S010",
      name: "데이터 시각화",
      category: "데이터사이언스",
      difficulty: "중급",
      duration: "2주",
      description: "Matplotlib, Seaborn을 활용한 데이터 시각화",
      prerequisites: "NumPy & Pandas",
      objectives: "효과적인 데이터 시각화 기법 습득",
      instructor: "임강사",
      status: "활성",
      createdDate: "2024-02-25",
      usedInCourses: 2,
    },
    {
      id: "S011",
      name: "UI/UX 디자인 기초",
      category: "디자인",
      difficulty: "초급",
      duration: "3주",
      description: "사용자 경험과 인터페이스 디자인 기초 이론",
      prerequisites: "디자인 기초 지식",
      objectives: "UI/UX 디자인 원칙과 방법론 이해",
      instructor: "조강사",
      status: "비활성",
      createdDate: "2024-01-10",
      usedInCourses: 1,
    },
    {
      id: "S012",
      name: "Figma 활용",
      category: "디자인",
      difficulty: "초급",
      duration: "2주",
      description: "Figma를 활용한 프로토타이핑과 디자인 시스템 구축",
      prerequisites: "UI/UX 디자인 기초",
      objectives: "Figma 도구 활용 능력과 협업 방법 습득",
      instructor: "차강사",
      status: "활성",
      createdDate: "2024-01-12",
      usedInCourses: 2,
    },
  ]

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

                  {filteredSubjects.length === 0 && (
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
