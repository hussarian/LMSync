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

export default function DetailSubjectsListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParentSubject, setSelectedParentSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectDescription, setNewSubjectDescription] = useState("")

  const router = useRouter()

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  // 더미 세부 과목 데이터
  const detailSubjectsData = [
    {
      id: "DS001",
      name: "HTML 태그와 구조",
      parentSubject: "HTML/CSS 기초",
      parentSubjectId: "S001",
      order: 1,
      description: "HTML의 기본 태그들과 문서 구조를 학습합니다",
      objectives: "HTML 기본 태그 사용법과 시맨틱 마크업 이해",
      materials: ["HTML 기초 자료.pdf", "실습 예제.html"],
      assignments: 2,
      quizzes: 1,
      status: "활성",
      instructor: "김강사",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      completionRate: 95,
      avgScore: 88,
    },
    {
      id: "DS002",
      name: "CSS 선택자와 스타일링",
      parentSubject: "HTML/CSS 기초",
      parentSubjectId: "S001",
      order: 2,
      description: "CSS 선택자의 종류와 스타일 속성을 학습합니다",
      objectives: "CSS 선택자 활용과 기본 스타일링 능력 습득",
      materials: ["CSS 선택자 가이드.pdf", "스타일링 예제.css"],
      assignments: 3,
      quizzes: 2,
      status: "활성",
      instructor: "김강사",
      createdDate: "2024-01-16",
      lastModified: "2024-01-22",
      completionRate: 92,
      avgScore: 85,
    },
    {
      id: "DS003",
      name: "반응형 웹 디자인",
      parentSubject: "HTML/CSS 기초",
      parentSubjectId: "S001",
      order: 3,
      description: "미디어 쿼리와 플렉스박스를 활용한 반응형 디자인",
      objectives: "다양한 디바이스에 대응하는 반응형 웹 구현",
      materials: ["반응형 디자인 가이드.pdf", "미디어쿼리 예제.css"],
      assignments: 2,
      quizzes: 1,
      status: "활성",
      instructor: "김강사",
      createdDate: "2024-01-17",
      lastModified: "2024-01-25",
      completionRate: 88,
      avgScore: 82,
    },
    {
      id: "DS004",
      name: "변수와 데이터 타입",
      parentSubject: "JavaScript 기초",
      parentSubjectId: "S002",
      order: 1,
      description: "JavaScript의 변수 선언과 기본 데이터 타입을 학습합니다",
      objectives: "변수 선언 방법과 데이터 타입별 특성 이해",
      materials: ["JavaScript 변수.pdf", "데이터타입 예제.js"],
      assignments: 2,
      quizzes: 2,
      status: "활성",
      instructor: "이강사",
      createdDate: "2024-01-20",
      lastModified: "2024-01-28",
      completionRate: 97,
      avgScore: 91,
    },
    {
      id: "DS005",
      name: "함수와 스코프",
      parentSubject: "JavaScript 기초",
      parentSubjectId: "S002",
      order: 2,
      description: "함수 선언과 호출, 스코프의 개념을 학습합니다",
      objectives: "함수 활용법과 스코프 체인 이해",
      materials: ["JavaScript 함수.pdf", "스코프 예제.js"],
      assignments: 3,
      quizzes: 1,
      status: "활성",
      instructor: "이강사",
      createdDate: "2024-01-21",
      lastModified: "2024-01-30",
      completionRate: 93,
      avgScore: 87,
    },
    {
      id: "DS006",
      name: "DOM 조작",
      parentSubject: "JavaScript 기초",
      parentSubjectId: "S002",
      order: 3,
      description: "DOM 요소 선택과 조작 방법을 학습합니다",
      objectives: "DOM API를 활용한 동적 웹 페이지 구현",
      materials: ["DOM 조작 가이드.pdf", "DOM 예제.html"],
      assignments: 4,
      quizzes: 2,
      status: "활성",
      instructor: "이강사",
      createdDate: "2024-01-22",
      lastModified: "2024-02-01",
      completionRate: 89,
      avgScore: 84,
    },
    {
      id: "DS007",
      name: "이벤트 처리",
      parentSubject: "JavaScript 기초",
      parentSubjectId: "S002",
      order: 4,
      description: "이벤트 리스너와 이벤트 객체를 학습합니다",
      objectives: "사용자 상호작용 처리 능력 습득",
      materials: ["이벤트 처리.pdf", "이벤트 예제.js"],
      assignments: 3,
      quizzes: 1,
      status: "활성",
      instructor: "이강사",
      createdDate: "2024-01-23",
      lastModified: "2024-02-02",
      completionRate: 91,
      avgScore: 86,
    },
    {
      id: "DS008",
      name: "Promise와 async/await",
      parentSubject: "JavaScript 심화",
      parentSubjectId: "S003",
      order: 1,
      description: "비동기 처리의 핵심 개념을 학습합니다",
      objectives: "Promise와 async/await를 활용한 비동기 프로그래밍",
      materials: ["비동기 처리.pdf", "Promise 예제.js"],
      assignments: 4,
      quizzes: 2,
      status: "활성",
      instructor: "박강사",
      createdDate: "2024-01-25",
      lastModified: "2024-02-05",
      completionRate: 85,
      avgScore: 79,
    },
    {
      id: "DS009",
      name: "모듈 시스템",
      parentSubject: "JavaScript 심화",
      parentSubjectId: "S003",
      order: 2,
      description: "ES6 모듈과 CommonJS 모듈을 학습합니다",
      objectives: "모듈 시스템을 활용한 코드 구조화",
      materials: ["모듈 시스템.pdf", "모듈 예제.js"],
      assignments: 3,
      quizzes: 1,
      status: "활성",
      instructor: "박강사",
      createdDate: "2024-01-26",
      lastModified: "2024-02-06",
      completionRate: 87,
      avgScore: 81,
    },
    {
      id: "DS010",
      name: "컴포넌트 기초",
      parentSubject: "React 기초",
      parentSubjectId: "S004",
      order: 1,
      description: "React 컴포넌트의 생성과 사용법을 학습합니다",
      objectives: "함수형 컴포넌트와 JSX 문법 이해",
      materials: ["React 컴포넌트.pdf", "컴포넌트 예제.jsx"],
      assignments: 3,
      quizzes: 2,
      status: "활성",
      instructor: "최강사",
      createdDate: "2024-02-01",
      lastModified: "2024-02-08",
      completionRate: 94,
      avgScore: 89,
    },
    {
      id: "DS011",
      name: "State와 Props",
      parentSubject: "React 기초",
      parentSubjectId: "S004",
      order: 2,
      description: "컴포넌트 간 데이터 전달과 상태 관리를 학습합니다",
      objectives: "Props와 State를 활용한 동적 컴포넌트 구현",
      materials: ["State와 Props.pdf", "상태관리 예제.jsx"],
      assignments: 4,
      quizzes: 2,
      status: "활성",
      instructor: "최강사",
      createdDate: "2024-02-02",
      lastModified: "2024-02-09",
      completionRate: 91,
      avgScore: 86,
    },
    {
      id: "DS012",
      name: "Python 문법 기초",
      parentSubject: "Python 기초",
      parentSubjectId: "S008",
      description: "Python의 기본 문법과 데이터 구조를 학습합니다",
      objectives: "Python 기본 문법과 자료구조 활용",
      materials: ["Python 기초.pdf", "문법 예제.py"],
      assignments: 3,
      quizzes: 2,
      status: "비활성",
      instructor: "송강사",
      createdDate: "2024-01-30",
      lastModified: "2024-02-05",
      completionRate: 0,
      avgScore: 0,
    },
  ]

  // 부모 과목 목록 (중복 제거)
  const parentSubjects = [...new Set(detailSubjectsData.map((item) => item.parentSubject))]

  // 필터링된 세부 과목 데이터
  const filteredDetailSubjects = detailSubjectsData.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.id.includes(searchTerm) ||
      subject.parentSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesParentSubject = selectedParentSubject === "all" || subject.parentSubject === selectedParentSubject
    const matchesDifficulty = selectedDifficulty === "all" || subject.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === "all" || subject.status === selectedStatus

    return matchesSearch && matchesParentSubject && matchesDifficulty && matchesStatus
  })

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
    router.push(`/courses/subjects/detail/edit/${subjectId}`)
  }

  const handleDelete = (subjectId) => {
    console.log("세부 과목 삭제:", subjectId)
    if (confirm("정말로 이 세부 과목을 삭제하시겠습니까?")) {
      alert(`${subjectId} 세부 과목이 삭제되었습니다.`)
    }
  }

  const handleView = (subjectId) => {
    const subject = detailSubjectsData.find((s) => s.id === subjectId)
    setSelectedSubject(subject)
    setShowDetailModal(true)
  }

  const handleCreateNew = () => {
    setShowCreateModal(true)
  }

  const handleCreateSubmit = () => {
    if (!newSubjectName.trim() || !newSubjectDescription.trim()) {
      alert("세부 과목명과 설명을 모두 입력해주세요.")
      return
    }

    console.log("새 세부 과목 생성:", {
      name: newSubjectName,
      description: newSubjectDescription,
    })

    alert(`"${newSubjectName}" 세부 과목이 생성되었습니다.`)

    // 모달 닫기 및 입력값 초기화
    setShowCreateModal(false)
    setNewSubjectName("")
    setNewSubjectDescription("")
  }

  const handleCreateCancel = () => {
    setShowCreateModal(false)
    setNewSubjectName("")
    setNewSubjectDescription("")
  }

  // 세부 과목 통계 계산
  const stats = {
    total: detailSubjectsData.length,
    active: detailSubjectsData.filter((s) => s.status === "활성").length,
    inactive: detailSubjectsData.filter((s) => s.status === "비활성").length,
    avgCompletion: Math.round(
      detailSubjectsData.reduce((sum, s) => sum + s.completionRate, 0) / detailSubjectsData.length,
    ),
    avgScore: Math.round(
      detailSubjectsData.filter((s) => s.avgScore > 0).reduce((sum, s) => sum + s.avgScore, 0) /
        detailSubjectsData.filter((s) => s.avgScore > 0).length,
    ),
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과목 관리" menuItems={sidebarMenuItems} currentPath="/courses/detail" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                세부 과목 목록
              </h1>
              <p className="text-lg" style={{ color: "#95A5A6" }}>
                등록된 모든 세부 과목의 정보를 조회하고 관리할 수 있습니다.
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
                        placeholder="세부 과목명, 코드, 부모 과목, 강사명으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
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


            {/* 세부 과목 통계 */}
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
                          코드
                        </th>
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
                      {filteredDetailSubjects.map((subject) => (
                        <tr key={subject.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                          <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                            {subject.id}
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {subject.name}
                              </p>                              
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-xs mt-1" style={{ color: "#95A5A6" }}>
                                {subject.description.length > 30
                                  ? `${subject.description.substring(0, 30)}...`
                                  : subject.description}
                              </p>
                            </div>
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

                  {filteredDetailSubjects.length === 0 && (
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
      {/* 세부 과목 상세보기 모달 */}
      {showDetailModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                세부 과목 상세 정보
              </h2>
              <Button variant="ghost" onClick={() => setShowDetailModal(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      세부 과목 코드
                    </label>
                    <p className="font-mono text-lg" style={{ color: "#2C3E50" }}>
                      {selectedSubject.id}
                    </p>
                  </div>
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
                      부모 과목
                    </label>
                    <Badge variant="outline" style={{ borderColor: "#3498db", color: "#3498db" }}>
                      {selectedSubject.parentSubject}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                        순서
                      </label>
                      <p style={{ color: "#2C3E50" }}>{selectedSubject.order}번째</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                        난이도
                      </label>
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: getDifficultyColor(selectedSubject.difficulty) }}
                      >
                        {selectedSubject.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                        학습 기간
                      </label>
                      <p style={{ color: "#2C3E50" }}>{selectedSubject.duration}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                        담당 강사
                      </label>
                      <p style={{ color: "#2C3E50" }}>{selectedSubject.instructor}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      상태
                    </label>
                    <Badge className="text-white" style={{ backgroundColor: getStatusColor(selectedSubject.status) }}>
                      {selectedSubject.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 학습 내용 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>학습 내용</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      과목 설명
                    </label>
                    <p style={{ color: "#2C3E50" }}>{selectedSubject.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      학습 목표
                    </label>
                    <p style={{ color: "#2C3E50" }}>{selectedSubject.objectives}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      학습 자료
                    </label>
                    <div className="space-y-2">
                      {selectedSubject.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" style={{ color: "#1ABC9C" }} />
                          <span style={{ color: "#2C3E50" }}>{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 과제 및 평가 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>과제 및 평가</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: "#1ABC9C" }} />
                      <p className="text-2xl font-bold" style={{ color: "#1ABC9C" }}>
                        {selectedSubject.assignments}
                      </p>
                      <p className="text-sm" style={{ color: "#95A5A6" }}>
                        과제
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Award className="w-8 h-8 mx-auto mb-2" style={{ color: "#f39c12" }} />
                      <p className="text-2xl font-bold" style={{ color: "#f39c12" }}>
                        {selectedSubject.quizzes}
                      </p>
                      <p className="text-sm" style={{ color: "#95A5A6" }}>
                        퀴즈
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 학습 통계 */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>학습 통계</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      완료율
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${selectedSubject.completionRate}%`,
                            backgroundColor:
                              selectedSubject.completionRate >= 90
                                ? "#1ABC9C"
                                : selectedSubject.completionRate >= 70
                                  ? "#f39c12"
                                  : "#e74c3c",
                          }}
                        />
                      </div>
                      <span className="font-bold" style={{ color: "#2C3E50" }}>
                        {selectedSubject.completionRate}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: "#95A5A6" }}>
                      평균 점수
                    </label>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color:
                          selectedSubject.avgScore >= 80
                            ? "#1ABC9C"
                            : selectedSubject.avgScore >= 60
                              ? "#f39c12"
                              : "#e74c3c",
                      }}
                    >
                      {selectedSubject.avgScore > 0 ? `${selectedSubject.avgScore}점` : "점수 없음"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label style={{ color: "#95A5A6" }}>생성일</label>
                      <p style={{ color: "#2C3E50" }}>{selectedSubject.createdDate}</p>
                    </div>
                    <div>
                      <label style={{ color: "#95A5A6" }}>최종 수정일</label>
                      <p style={{ color: "#2C3E50" }}>{selectedSubject.lastModified}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  handleEdit(selectedSubject.id)
                }}
                style={{ backgroundColor: "#1ABC9C", color: "white" }}
              >
                편집
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 세부 과목 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                새 세부 과목 만들기
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
              <Button onClick={handleCreateSubmit} style={{ backgroundColor: "#1ABC9C", color: "white" }}>
                생성
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
