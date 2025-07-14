"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Search, Filter, BookOpen, Clock, BarChart3, Eye, User, Calendar, Award, Edit, X } from "lucide-react"

export default function AllQuestionBankPage() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedInstructor, setSelectedInstructor] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentInstructor] = useState("김강사") // 현재 로그인한 강사명
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)

  const sidebarItems = [
    { key: "my-question-bank", label: "내 문제 은행", href: "/instructor/exam/question-bank" },
    { key: "all-question-bank", label: "전체 문제 은행", href: "/instructor/question-bank/all" },
  ]

  // 샘플 문제 데이터 (모든 강사들의 문제)
  useEffect(() => {
    const sampleQuestions = [
      {
        id: 1,
        question: "다음 중 JavaScript의 데이터 타입이 아닌 것은?",
        type: "객관식",
        subject: "웹프로그래밍",
        difficulty: "중",
        points: 5,
        options: ["string", "number", "boolean", "integer"],
        correctAnswer: 3,
        createdDate: "2024-01-15",
        usageCount: 12,
        correctRate: 78,
        instructor: "김강사",
        instructorId: "instructor1",
        department: "컴퓨터공학과",
      },
      {
        id: 2,
        question: "React의 useState Hook에 대해 설명하시오.",
        type: "주관식",
        subject: "웹프로그래밍",
        difficulty: "상",
        points: 10,
        createdDate: "2024-01-20",
        usageCount: 8,
        correctRate: 65,
        instructor: "이교수",
        instructorId: "instructor2",
        department: "소프트웨어학과",
      },
      {
        id: 3,
        question: "다음 Python 코드의 출력 결과를 작성하시오.\n\nfor i in range(3):\n    print(i * 2)",
        type: "코드형",
        subject: "파이썬프로그래밍",
        difficulty: "하",
        points: 8,
        createdDate: "2024-01-18",
        usageCount: 15,
        correctRate: 82,
        instructor: "박박사",
        instructorId: "instructor3",
        department: "데이터사이언스학과",
      },
      {
        id: 4,
        question: "데이터베이스의 정규화에 대해 설명하고, 1NF, 2NF, 3NF의 차이점을 서술하시오.",
        type: "주관식",
        subject: "데이터베이스",
        difficulty: "상",
        points: 15,
        createdDate: "2024-01-22",
        usageCount: 6,
        correctRate: 58,
        instructor: "최선생",
        instructorId: "instructor4",
        department: "정보시스템학과",
      },
      {
        id: 5,
        question: "다음 중 CSS의 display 속성 값이 아닌 것은?",
        type: "객관식",
        subject: "웹프로그래밍",
        difficulty: "하",
        points: 3,
        options: ["block", "inline", "flex", "visible"],
        correctAnswer: 3,
        createdDate: "2024-01-25",
        usageCount: 20,
        correctRate: 85,
        instructor: "김강사",
        instructorId: "instructor1",
        department: "컴퓨터공학과",
      },
      {
        id: 6,
        question: "Java의 상속(Inheritance)과 다형성(Polymorphism)의 개념을 설명하시오.",
        type: "주관식",
        subject: "자바프로그래밍",
        difficulty: "중",
        points: 12,
        createdDate: "2024-01-28",
        usageCount: 9,
        correctRate: 72,
        instructor: "정교수",
        instructorId: "instructor5",
        department: "컴퓨터공학과",
      },
      {
        id: 7,
        question: "다음 SQL 쿼리의 실행 결과를 예측하시오.\n\nSELECT COUNT(*) FROM users WHERE age > 25;",
        type: "코드형",
        subject: "데이터베이스",
        difficulty: "중",
        points: 7,
        createdDate: "2024-01-30",
        usageCount: 11,
        correctRate: 68,
        instructor: "최선생",
        instructorId: "instructor4",
        department: "정보시스템학과",
      },
      {
        id: 8,
        question: "머신러닝에서 과적합(Overfitting)이란 무엇이며, 이를 방지하는 방법을 설명하시오.",
        type: "주관식",
        subject: "머신러닝",
        difficulty: "상",
        points: 20,
        createdDate: "2024-02-01",
        usageCount: 4,
        correctRate: 45,
        instructor: "박박사",
        instructorId: "instructor3",
        department: "데이터사이언스학과",
      },
    ]

    setTimeout(() => {
      setQuestions(sampleQuestions)
      setFilteredQuestions(sampleQuestions)
      setLoading(false)
    }, 1000)
  }, [])

  // 검색 및 필터링
  useEffect(() => {
    const filtered = questions.filter((question) => {
      const matchesSearch =
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = selectedSubject === "" || question.subject === selectedSubject
      const matchesType = selectedType === "" || question.type === selectedType
      const matchesDifficulty = selectedDifficulty === "" || question.difficulty === selectedDifficulty
      const matchesInstructor = selectedInstructor === "" || question.instructor === selectedInstructor

      return matchesSearch && matchesSubject && matchesType && matchesDifficulty && matchesInstructor
    })

    setFilteredQuestions(filtered)
  }, [searchTerm, selectedSubject, selectedType, selectedDifficulty, selectedInstructor, questions])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "상":
        return "text-red-600 bg-red-50"
      case "중":
        return "text-yellow-600 bg-yellow-50"
      case "하":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "객관식":
        return "text-blue-600 bg-blue-50"
      case "주관식":
        return "text-purple-600 bg-purple-50"
      case "코드형":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // 고유한 강사 목록 추출
  const uniqueInstructors = [...new Set(questions.map((q) => q.instructor))]
  const uniqueSubjects = [...new Set(questions.map((q) => q.subject))]

  const handleEditQuestion = (question) => {
    setEditingQuestion({ ...question })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingQuestion.question.trim()) {
      alert("문제 내용을 입력해주세요.")
      return
    }

    const updatedQuestions = questions.map((q) => (q.id === editingQuestion.id ? editingQuestion : q))
    setQuestions(updatedQuestions)
    setIsEditModalOpen(false)
    setEditingQuestion(null)
  }

  const handleEditChange = (field, value) => {
    setEditingQuestion((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...editingQuestion.options]
    newOptions[index] = value
    setEditingQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="question-bank" userRole="instructor" userName="김강사" />
        <div className="flex">
          <Sidebar title="문제 은행" menuItems={sidebarItems} currentPath="/instructor/question-bank/all" />
          <main className="flex-1 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="question-bank" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="문제 은행" menuItems={sidebarItems} currentPath="/instructor/question-bank/all" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">전체 문제 은행</h1>
                <p className="text-gray-600 mt-1">모든 강사들이 출제한 문제들을 확인하고 참고할 수 있습니다.</p>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">전체 문제</p>
                    <p className="text-xl font-semibold">{questions.length}개</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">참여 강사</p>
                    <p className="text-xl font-semibold">{uniqueInstructors.length}명</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">과목 수</p>
                    <p className="text-xl font-semibold">{uniqueSubjects.length}개</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">평균 정답률</p>
                    <p className="text-xl font-semibold">
                      {Math.round(questions.reduce((sum, q) => sum + q.correctRate, 0) / questions.length)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white p-4 rounded-lg border space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="문제 내용, 과목명, 강사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">필터:</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 강사</option>
                  {uniqueInstructors.map((instructor) => (
                    <option key={instructor} value={instructor}>
                      {instructor}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 과목</option>
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 유형</option>
                  <option value="객관식">객관식</option>
                  <option value="주관식">주관식</option>
                  <option value="코드형">코드형</option>
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 난이도</option>
                  <option value="상">상</option>
                  <option value="중">중</option>
                  <option value="하">하</option>
                </select>
              </div>
            </div>

            {/* 문제 목록 */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="bg-white p-8 rounded-lg border text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                  <p className="text-gray-600">다른 검색어나 필터 조건을 시도해보세요.</p>
                </div>
              ) : (
                filteredQuestions.map((question) => (
                  <div key={question.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(question.type)}`}>
                            {question.type}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                          >
                            {question.difficulty}
                          </span>
                          <span className="text-sm text-gray-600">{question.subject}</span>
                          <span className="text-sm text-gray-600">{question.points}점</span>
                          <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            <User className="w-3 h-3" />
                            {question.instructor}
                          </div>
                          <span className="text-xs text-gray-500">{question.department}</span>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{question.question}</h3>

                        {question.options && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">선택지:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {question.options.map((option, index) => (
                                <span
                                  key={index}
                                  className={`text-sm px-2 py-1 rounded ${
                                    index === question.correctAnswer
                                      ? "bg-green-50 text-green-700 font-medium"
                                      : "bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {index + 1}. {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            생성일: {question.createdDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            사용횟수: {question.usageCount}회
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            정답률: {question.correctRate}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {question.instructor === currentInstructor && (
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 페이지네이션 */}
            {filteredQuestions.length > 0 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    이전
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    2
                  </button>
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    3
                  </button>
                  <button className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    다음
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 문제 수정 모달 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">문제 수정</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">문제 유형</label>
                  <select
                    value={editingQuestion?.type || ""}
                    onChange={(e) => handleEditChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="객관식">객관식</option>
                    <option value="주관식">주관식</option>
                    <option value="코드형">코드형</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">과목</label>
                  <input
                    type="text"
                    value={editingQuestion?.subject || ""}
                    onChange={(e) => handleEditChange("subject", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">난이도</label>
                  <select
                    value={editingQuestion?.difficulty || ""}
                    onChange={(e) => handleEditChange("difficulty", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="하">하</option>
                    <option value="중">중</option>
                    <option value="상">상</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">배점</label>
                  <input
                    type="number"
                    value={editingQuestion?.points || ""}
                    onChange={(e) => handleEditChange("points", Number.parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">문제 내용</label>
                <textarea
                  value={editingQuestion?.question || ""}
                  onChange={(e) => handleEditChange("question", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="문제 내용을 입력하세요..."
                />
              </div>

              {editingQuestion?.type === "객관식" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">선택지</label>
                  <div className="space-y-2">
                    {editingQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={editingQuestion.correctAnswer === index}
                          onChange={() => handleEditChange("correctAnswer", index)}
                          className="text-blue-600"
                        />
                        <span className="text-sm font-medium">{index + 1}.</span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`선택지 ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
