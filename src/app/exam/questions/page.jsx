"use client"

import { useState } from "react"
import { Search, Plus, FileText, BarChart3, ChevronDown, ChevronUp } from "lucide-react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"

export default function ExamQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
    { key: "course-list", label: "과정 리스트", href: "/exam/courses" },
    { key: "question-list", label: "과목 문제 리스트", href: "/exam/questions" },
  ]

  // 헤더 네비게이션 아이템
  const navItems = [
    { key: "account", label: "계정 등록", href: "/account" },
    { key: "academic", label: "학적부", href: "/academic" },
    { key: "courses", label: "과정 관리", href: "/courses" },
    { key: "classroom", label: "강의실 관리", href: "/classroom" },
    { key: "survey", label: "설문 평가 관리", href: "/survey" },
    { key: "exam", label: "시험 및 성적", href: "/exam" },
    { key: "permission", label: "권한 관리", href: "/permission" },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const subjects = []

  // TODO: 실제 API 호출로 교체 필요
  const subjectQuestions = {}

  // 필터링된 과목 목록
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || subject.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      (selectedDifficulty === "easy" && subject.easyQuestions > 0) ||
      (selectedDifficulty === "medium" && subject.mediumQuestions > 0) ||
      (selectedDifficulty === "hard" && subject.hardQuestions > 0)

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // 통계 계산
  const totalSubjects = subjects.length
  const activeSubjects = subjects.filter((s) => s.status === "활성").length
  const totalQuestions = subjects.reduce((sum, s) => sum + s.totalQuestions, 0)

  const handleView = (subjectId) => {
    console.log("과목 상세보기:", subjectId)
  }

  const handleEdit = (subjectId) => {
    console.log("과목 수정:", subjectId)
  }

  const handleDelete = (subjectId) => {
    console.log("과목 삭제:", subjectId)
  }

  const handleAddQuestion = (subjectId) => {
    console.log("문제 추가:", subjectId)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "쉬움":
        return "text-green-600 bg-green-100"
      case "보통":
        return "text-yellow-600 bg-yellow-100"
      case "어려움":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleToggle = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
  }

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    setIsQuestionModalOpen(true)
  }

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false)
    setSelectedQuestion(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navItems={navItems} currentPage="exam" />

      <div className="flex">
        <Sidebar title="시험 및 성적 관리" menuItems={sidebarMenuItems} currentPath="/exam/questions" />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#9b59b6" }}>
              과목 문제 리스트
            </h1>
            <p className="text-gray-600">과목별 문제를 관리하고 새로운 문제를 추가할 수 있습니다.</p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전체 과목</p>
                  <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {totalSubjects}개
                  </p>
                </div>
                <FileText className="w-8 h-8" style={{ color: "#9b59b6" }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">활성 과목</p>
                  <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {activeSubjects}개
                  </p>
                </div>
                <BarChart3 className="w-8 h-8" style={{ color: "#9b59b6" }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 문제 수</p>
                  <p className="text-2xl font-bold" style={{ color: "#9b59b6" }}>
                    {totalQuestions}개
                  </p>
                </div>
                <Plus className="w-8 h-8" style={{ color: "#9b59b6" }} />
              </div>
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="과목명, 과목코드, 강사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">전체 카테고리</option>
                <option value="프로그래밍">프로그래밍</option>
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="데이터베이스">데이터베이스</option>
                <option value="데이터 분석">데이터 분석</option>
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">전체 난이도</option>
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
              </select>
            </div>
          </div>

          {/* 과목 목록 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" style={{ color: "#2C3E50" }}>
                  과목 목록 ({filteredSubjects.length}개)
                </h2>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                  <Plus className="w-4 h-4" />새 과목 추가
                </Button>
              </div>
            </div>

            <div className="p-6">
              {filteredSubjects.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">등록된 과목이 없습니다.</p>
                  <p className="text-sm text-gray-400">새로운 과목을 추가해보세요.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubjects.map((subject) => (
                    <div key={subject.id}>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                                {subject.name}
                              </h3>
                              <span className="text-sm text-gray-500">({subject.code})</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  subject.status === "활성"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {subject.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">카테고리:</span> {subject.category}
                              </div>
                              <div>
                                <span className="font-medium">강사:</span> {subject.instructor}
                              </div>
                              <div>
                                <span className="font-medium">총 문제:</span> {subject.totalQuestions}개
                              </div>
                              <div>
                                <span className="font-medium">마지막 수정:</span> {subject.lastUpdated}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>쉬움 {subject.easyQuestions}개</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>보통 {subject.mediumQuestions}개</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>어려움 {subject.hardQuestions}개</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggle(subject.id)}
                              className="flex items-center gap-1"
                            >
                              {expandedSubject === subject.id ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  접기
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  문제 보기
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* 문제 목록 확장 영역 */}
                      {expandedSubject === subject.id && (
                        <div className="ml-4 mt-4 border-l-2 border-purple-200 pl-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold text-gray-700">문제 목록</h4>
                              <Button size="sm" onClick={() => handleAddQuestion(subject.id)}>
                                <Plus className="w-4 h-4 mr-1" />
                                문제 추가
                              </Button>
                            </div>

                            {subjectQuestions[subject.id] && subjectQuestions[subject.id].length > 0 ? (
                              <div className="space-y-3">
                                {subjectQuestions[subject.id].map((question) => (
                                  <div
                                    key={question.id}
                                    className="bg-white p-3 rounded border cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleQuestionClick(question)}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            {question.detailSubject}
                                          </span>
                                          <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
                                              question.difficulty
                                            )}`}
                                          >
                                            {question.difficulty}
                                          </span>
                                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                            {question.type}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-800 mb-2">{question.question}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                          <span>배점: {question.points}점</span>
                                          <span>등록일: {question.createdDate}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p>등록된 문제가 없습니다.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 문제 상세보기 모달 */}
      {isQuestionModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                문제 상세정보
              </h2>
              <Button variant="ghost" onClick={closeQuestionModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {selectedQuestion.detailSubject}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    selectedQuestion.difficulty
                  )}`}
                >
                  {selectedQuestion.difficulty}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {selectedQuestion.type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {selectedQuestion.points}점
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">문제 내용</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 leading-relaxed">{selectedQuestion.question}</p>
                </div>
              </div>

              {selectedQuestion.type === "객관식" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">선택지</h3>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border">
                      <span className="font-medium text-gray-700">1. </span>
                      <span className="text-gray-800">함수 선언문</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <span className="font-medium text-gray-700">2. </span>
                      <span className="text-gray-800">함수 표현식</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <span className="font-medium text-gray-700">3. </span>
                      <span className="text-gray-800">화살표 함수</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <span className="font-medium text-gray-700">4. </span>
                      <span className="text-gray-800">클래스 메서드</span>
                      <span className="ml-2 text-xs text-green-600 font-medium">(정답)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">문제 정보</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">등록일:</span>
                    <span className="ml-2 font-medium">{selectedQuestion.createdDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">배점:</span>
                    <span className="ml-2 font-medium">{selectedQuestion.points}점</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={closeQuestionModal}>
                닫기
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">문제 수정</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
