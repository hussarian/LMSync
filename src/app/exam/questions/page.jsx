"use client"

import { useState } from "react"
import { Search, Plus, FileText, BarChart3, ChevronDown, ChevronUp } from "lucide-react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import React from "react"

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
    { key: "attendance", label: "강의실 관리", href: "/attendance" },
    { key: "survey", label: "설문 평가 관리", href: "/survey" },
    { key: "exam", label: "시험 및 성적", href: "/exam" },
    { key: "permission", label: "권한 관리", href: "/permission" },
  ]

  // 샘플 과목 데이터
  const subjects = [
    {
      id: 1,
      name: "JavaScript 기초",
      code: "JS001",
      category: "프로그래밍",
      instructor: "김개발",
      totalQuestions: 45,
      easyQuestions: 15,
      mediumQuestions: 20,
      hardQuestions: 10,
      lastUpdated: "2024-01-15",
      status: "활성",
    },
    {
      id: 2,
      name: "React 심화",
      code: "RC002",
      category: "프론트엔드",
      instructor: "이리액트",
      totalQuestions: 38,
      easyQuestions: 12,
      mediumQuestions: 18,
      hardQuestions: 8,
      lastUpdated: "2024-01-12",
      status: "활성",
    },
    {
      id: 3,
      name: "Node.js 서버 개발",
      code: "ND003",
      category: "백엔드",
      instructor: "박노드",
      totalQuestions: 52,
      easyQuestions: 18,
      mediumQuestions: 22,
      hardQuestions: 12,
      lastUpdated: "2024-01-10",
      status: "활성",
    },
    {
      id: 4,
      name: "데이터베이스 설계",
      code: "DB004",
      category: "데이터베이스",
      instructor: "최디비",
      totalQuestions: 30,
      easyQuestions: 10,
      mediumQuestions: 15,
      hardQuestions: 5,
      lastUpdated: "2024-01-08",
      status: "비활성",
    },
    {
      id: 5,
      name: "Python 데이터 분석",
      code: "PY005",
      category: "데이터 분석",
      instructor: "정파이썬",
      totalQuestions: 41,
      easyQuestions: 14,
      mediumQuestions: 19,
      hardQuestions: 8,
      lastUpdated: "2024-01-05",
      status: "활성",
    },
  ]

  const subjectQuestions = {
    1: [
      // JavaScript 기초
      {
        id: 1,
        detailSubject: "변수와 데이터 타입",
        question: "JavaScript에서 let과 var의 차이점을 설명하시오.",
        type: "주관식",
        difficulty: "보통",
        points: 10,
        createdDate: "2024-01-10",
      },
      {
        id: 2,
        detailSubject: "함수",
        question: "다음 중 JavaScript 함수 선언 방식이 아닌 것은?",
        type: "객관식",
        difficulty: "쉬움",
        points: 5,
        createdDate: "2024-01-12",
      },
      {
        id: 3,
        detailSubject: "객체와 배열",
        question: "배열의 map() 메서드와 forEach() 메서드의 차이점을 설명하시오.",
        type: "주관식",
        difficulty: "어려움",
        points: 15,
        createdDate: "2024-01-15",
      },
    ],
    2: [
      // React 심화
      {
        id: 4,
        detailSubject: "컴포넌트 생명주기",
        question: "useEffect 훅의 의존성 배열이 빈 배열일 때의 동작을 설명하시오.",
        type: "주관식",
        difficulty: "보통",
        points: 10,
        createdDate: "2024-01-08",
      },
      {
        id: 5,
        detailSubject: "상태 관리",
        question: "Redux와 Context API의 차이점은?",
        type: "객관식",
        difficulty: "어려움",
        points: 15,
        createdDate: "2024-01-10",
      },
    ],
    3: [
      // Node.js 서버 개발
      {
        id: 6,
        detailSubject: "Express.js 기초",
        question: "Express.js에서 미들웨어의 역할을 설명하시오.",
        type: "주관식",
        difficulty: "보통",
        points: 12,
        createdDate: "2024-01-05",
      },
    ],
    4: [
      // 데이터베이스 설계
      {
        id: 7,
        detailSubject: "관계형 데이터베이스",
        question: "정규화의 목적과 1차, 2차, 3차 정규화를 설명하시오.",
        type: "주관식",
        difficulty: "어려움",
        points: 20,
        createdDate: "2024-01-03",
      },
    ],
    5: [
      // Python 데이터 분석
      {
        id: 8,
        detailSubject: "Pandas 기초",
        question: "DataFrame과 Series의 차이점을 설명하시오.",
        type: "주관식",
        difficulty: "쉬움",
        points: 8,
        createdDate: "2024-01-01",
      },
    ],
  }

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
                <option value="all">모든 카테고리</option>
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
                <option value="all">모든 난이도</option>
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
              </select>
            </div>
          </div>

          {/* 과목 목록 테이블 */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      과목 정보
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      강사
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      문제 현황
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      난이도별 분포
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      최근 업데이트
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubjects.map((subject) => (
                    <React.Fragment key={subject.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-500">{subject.code}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {subject.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">{subject.instructor}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium text-gray-900">총 {subject.totalQuestions}개</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 text-xs">
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                              쉬움 {subject.easyQuestions}
                            </span>
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                              보통 {subject.mediumQuestions}
                            </span>
                            <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">
                              어려움 {subject.hardQuestions}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subject.status === "활성" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {subject.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">{subject.lastUpdated}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <Button size="sm" variant="ghost" onClick={() => handleToggle(subject.id)} className="p-1">
                              {expandedSubject === subject.id ? (
                                <ChevronUp className="w-4 h-4" style={{ color: "#9b59b6" }} />
                              ) : (
                                <ChevronDown className="w-4 h-4" style={{ color: "#9b59b6" }} />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {expandedSubject === subject.id && (
                        <tr key={`${subject.id}-questions`}>
                          <td colSpan="8" className="py-0 px-0">
                            <div className="bg-gray-50 p-4 border-t">
                              <h4 className="font-semibold text-gray-700 mb-3">세부과목별 문제 목록</h4>
                              <div className="space-y-3">
                                {subjectQuestions[subject.id]?.map((question) => (
                                  <div
                                    key={question.id}
                                    className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer transition-shadow"
                                    onClick={() => handleQuestionClick(question)}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-sm font-medium text-purple-600">
                                            {question.detailSubject}
                                          </span>
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              question.difficulty === "쉬움"
                                                ? "bg-green-100 text-green-800"
                                                : question.difficulty === "보통"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-red-100 text-red-800"
                                            }`}
                                          >
                                            {question.difficulty}
                                          </span>
                                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {question.type}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-800 mb-2">{question.question}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                          <span>배점: {question.points}점</span>
                                          <span>출제일: {question.createdDate}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )) || <div className="text-center py-4 text-gray-500">등록된 문제가 없습니다.</div>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">검색 조건에 맞는 과목이 없습니다.</p>
            </div>
          )}
        </main>
      </div>
      {/* 문제 상세정보 모달 */}
      {isQuestionModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#9b59b6" }}>
                문제 상세정보
              </h2>
              <button onClick={closeQuestionModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 기본 정보 */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">기본 정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">세부과목:</span>
                      <span className="text-sm font-medium text-purple-600">{selectedQuestion.detailSubject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">문제 유형:</span>
                      <span className="text-sm font-medium">{selectedQuestion.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">난이도:</span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          selectedQuestion.difficulty === "쉬움"
                            ? "bg-green-100 text-green-800"
                            : selectedQuestion.difficulty === "보통"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedQuestion.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">배점:</span>
                      <span className="text-sm font-medium">{selectedQuestion.points}점</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">출제일:</span>
                      <span className="text-sm font-medium">{selectedQuestion.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">문제 통계</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">사용 횟수:</span>
                      <span className="text-sm font-medium">12회</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">평균 정답률:</span>
                      <span className="text-sm font-medium text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">최근 사용:</span>
                      <span className="text-sm font-medium">2024-01-20</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 문제 내용 */}
              <div className="space-y-4">
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

                {selectedQuestion.type === "주관식" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">채점 기준</h3>
                    <div className="bg-white p-4 rounded border">
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• 핵심 개념 설명 (5점)</li>
                        <li>• 구체적인 예시 제시 (3점)</li>
                        <li>• 차이점 명확히 구분 (2점)</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button onClick={closeQuestionModal} variant="outline" className="px-4 py-2 bg-transparent">
                닫기
              </Button>
              <Button
                className="px-4 py-2 text-white"
                style={{ backgroundColor: "#9b59b6" }}
                onClick={() => {
                  console.log("문제 수정:", selectedQuestion.id)
                  closeQuestionModal()
                }}
              >
                문제 수정
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
