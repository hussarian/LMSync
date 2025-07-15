"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Search, Plus, Edit, Trash2, Eye, Filter, BookOpen, Clock, BarChart3, X } from "lucide-react"

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "객관식",
    subject: "",
    difficulty: "중",
    points: 5,
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
  })

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)

  const sidebarItems = [
    { key: "my-exam", label: "시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-bank", label: "문제 은행", href: "/instructor/exam/question-bank" },
    { key: "history", label: "내 강의 성적", href: "/instructor/exam/lectures/history" },
  ]

  // 샘플 문제 데이터
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
      },
      {
        id: 2,
        question: "React의 useState Hook에 대해 설명하시오.",
        type: "서술형",
        subject: "웹프로그래밍",
        difficulty: "상",
        points: 10,
        createdDate: "2024-01-20",
        usageCount: 8,
        correctRate: 65,
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
      },
      {
        id: 4,
        question: "데이터베이스의 정규화에 대해 설명하고, 1NF, 2NF, 3NF의 차이점을 서술하시오.",
        type: "서술형",
        subject: "데이터베이스",
        difficulty: "상",
        points: 15,
        createdDate: "2024-01-22",
        usageCount: 6,
        correctRate: 58,
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
        question.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = selectedSubject === "" || question.subject === selectedSubject
      const matchesType = selectedType === "" || question.type === selectedType
      const matchesDifficulty = selectedDifficulty === "" || question.difficulty === selectedDifficulty

      return matchesSearch && matchesSubject && matchesType && matchesDifficulty
    })

    setFilteredQuestions(filtered)
  }, [searchTerm, selectedSubject, selectedType, selectedDifficulty, questions])

  const handleDeleteQuestion = (questionId) => {
    if (confirm("정말로 이 문제를 삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== questionId))
    }
  }

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
      case "서술형":
        return "text-purple-600 bg-purple-50"
      case "코드형":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleCreateQuestion = () => {
    if (!newQuestion.question.trim() || !newQuestion.subject.trim()) {
      alert("문제 내용과 과목을 입력해주세요.")
      return
    }

    if (newQuestion.type === "객관식" && newQuestion.options.some((opt) => !opt.trim())) {
      alert("모든 선택지를 입력해주세요.")
      return
    }

    const createdQuestion = {
      id: Date.now(),
      ...newQuestion,
      createdDate: new Date().toISOString().split("T")[0],
      usageCount: 0,
      correctRate: 0,
    }

    setQuestions((prev) => [createdQuestion, ...prev])
    setShowCreateModal(false)
    setNewQuestion({
      question: "",
      type: "객관식",
      subject: "",
      difficulty: "중",
      points: 5,
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    })
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion({
      ...question,
      options: question.options || ["", "", "", ""],
    })
    setShowEditModal(true)
  }

  const handleUpdateQuestion = () => {
    if (!editingQuestion.question.trim() || !editingQuestion.subject.trim()) {
      alert("문제 내용과 과목을 입력해주세요.")
      return
    }

    if (editingQuestion.type === "객관식" && editingQuestion.options.some((opt) => !opt.trim())) {
      alert("모든 선택지를 입력해주세요.")
      return
    }

    setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q)))
    setShowEditModal(false)
    setEditingQuestion(null)
  }

  const handleEditQuestionChange = (field, value) => {
    setEditingQuestion((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEditOptionChange = (index, value) => {
    setEditingQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }))
  }

  const handleQuestionChange = (field, value) => {
    setNewQuestion((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionChange = (index, value) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="exam" userRole="instructor" userName="김강사" />
        <div className="flex">
          <Sidebar title="시험 관리" menuItems={sidebarItems} currentPath="/instructor/exam/question-bank" />
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
      <Header currentPage="exam" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="시험 관리" menuItems={sidebarItems} currentPath="/instructor/exam/question-bank" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">문제 은행</h1>
                <p className="text-gray-600 mt-1">출제한 문제들을 관리하고 재사용할 수 있습니다.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />새 문제 만들기
              </button>
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
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">이번 달 생성</p>
                    <p className="text-xl font-semibold">12개</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">평균 사용횟수</p>
                    <p className="text-xl font-semibold">12.2회</p>
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
                    <p className="text-xl font-semibold">73.6%</p>
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
                    placeholder="문제 내용이나 과목명으로 검색..."
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
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 과목</option>
                  <option value="웹프로그래밍">웹프로그래밍</option>
                  <option value="파이썬프로그래밍">파이썬프로그래밍</option>
                  <option value="데이터베이스">데이터베이스</option>
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">전체 유형</option>
                  <option value="객관식">객관식</option>
                  <option value="서술형">서술형</option>
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
                          <span>생성일: {question.createdDate}</span>
                          <span>사용횟수: {question.usageCount}회</span>
                          <span>정답률: {question.correctRate}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditQuestion(question)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
      {/* 새 문제 만들기 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">새 문제 만들기</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">문제 유형</label>
                    <select
                      value={newQuestion.type}
                      onChange={(e) => handleQuestionChange("type", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="객관식">객관식</option>
                      <option value="서술형">서술형</option>
                      <option value="코드형">코드형</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">과목</label>
                    <input
                      type="text"
                      value={newQuestion.subject}
                      onChange={(e) => handleQuestionChange("subject", e.target.value)}
                      placeholder="과목명을 입력하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                    <select
                      value={newQuestion.difficulty}
                      onChange={(e) => handleQuestionChange("difficulty", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="하">하</option>
                      <option value="중">중</option>
                      <option value="상">상</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">배점</label>
                  <input
                    type="number"
                    value={newQuestion.points}
                    onChange={(e) => handleQuestionChange("points", Number.parseInt(e.target.value) || 0)}
                    min="1"
                    max="100"
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 문제 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문제 내용</label>
                  <textarea
                    value={newQuestion.question}
                    onChange={(e) => handleQuestionChange("question", e.target.value)}
                    placeholder="문제 내용을 입력하세요"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 객관식 선택지 */}
                {newQuestion.type === "객관식" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">선택지</label>
                    <div className="space-y-3">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => handleQuestionChange("correctAnswer", index)}
                            className="text-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-700 w-8">{index + 1}.</span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`선택지 ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">정답을 선택해주세요.</p>
                  </div>
                )}

                {/* 해설 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">해설 (선택사항)</label>
                  <textarea
                    value={newQuestion.explanation}
                    onChange={(e) => handleQuestionChange("explanation", e.target.value)}
                    placeholder="문제 해설을 입력하세요"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateQuestion}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  문제 생성
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 문제 수정 모달 */}
      {showEditModal && editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">문제 수정</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingQuestion(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">문제 유형</label>
                    <select
                      value={editingQuestion.type}
                      onChange={(e) => handleEditQuestionChange("type", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="객관식">객관식</option>
                      <option value="서술형">서술형</option>
                      <option value="코드형">코드형</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">과목</label>
                    <input
                      type="text"
                      value={editingQuestion.subject}
                      onChange={(e) => handleEditQuestionChange("subject", e.target.value)}
                      placeholder="과목명을 입력하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                    <select
                      value={editingQuestion.difficulty}
                      onChange={(e) => handleEditQuestionChange("difficulty", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="하">하</option>
                      <option value="중">중</option>
                      <option value="상">상</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">배점</label>
                  <input
                    type="number"
                    value={editingQuestion.points}
                    onChange={(e) => handleEditQuestionChange("points", Number.parseInt(e.target.value) || 0)}
                    min="1"
                    max="100"
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 문제 내용 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문제 내용</label>
                  <textarea
                    value={editingQuestion.question}
                    onChange={(e) => handleEditQuestionChange("question", e.target.value)}
                    placeholder="문제 내용을 입력하세요"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 객관식 선택지 */}
                {editingQuestion.type === "객관식" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">선택지</label>
                    <div className="space-y-3">
                      {editingQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="editCorrectAnswer"
                            checked={editingQuestion.correctAnswer === index}
                            onChange={() => handleEditQuestionChange("correctAnswer", index)}
                            className="text-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-700 w-8">{index + 1}.</span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleEditOptionChange(index, e.target.value)}
                            placeholder={`선택지 ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">정답을 선택해주세요.</p>
                  </div>
                )}

                {/* 해설 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">해설 (선택사항)</label>
                  <textarea
                    value={editingQuestion.explanation || ""}
                    onChange={(e) => handleEditQuestionChange("explanation", e.target.value)}
                    placeholder="문제 해설을 입력하세요"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingQuestion(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdateQuestion}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
