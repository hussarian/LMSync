"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, ArrowLeft, Save, Eye, Upload, Search } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { Link } from "react-router-dom"

export default function CreateExamPage() {
  const [examData, setExamData] = useState({
    title: "",
    course: "",
    type: "퀴즈",
    duration: 60,
    maxScore: 100,
    passScore: 60,
    startDate: "",
    endDate: "",
    description: "",
    instructions: "",
    allowLateSubmission: false,
    showResults: true,
    randomizeQuestions: false,
  })

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "객관식",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      score: 5,
      explanation: "",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false)
  const [questionBankData, setQuestionBankData] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [bankSearchTerm, setBankSearchTerm] = useState("")
  const [bankSelectedSubject, setBankSelectedSubject] = useState("all")
  const [bankSelectedDifficulty, setBankSelectedDifficulty] = useState("all")

  const sidebarItems = [
    { key: "my-exams", label: "내 시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/questions" },
  ]

  // 강사가 담당하는 강의 목록
  const myCourses = [
    { id: 1, name: "웹 개발 기초", code: "WEB101" },
    { id: 2, name: "프론트엔드 개발", code: "FE201" },
    { id: 3, name: "백엔드 개발", code: "BE301" },
    { id: 4, name: "데이터베이스", code: "DB201" },
    { id: 5, name: "프로그래밍 기초", code: "PY101" },
  ]

  // 문제은행 샘플 데이터
  const questionBankQuestions = [
    {
      id: "bank_1",
      subject: "웹 개발 기초",
      detailSubject: "HTML 기초",
      question: "HTML에서 제목을 나타내는 태그는 무엇인가요?",
      type: "객관식",
      difficulty: "쉬움",
      options: ["<title>", "<h1>", "<header>", "<head>"],
      correctAnswer: 1,
      score: 5,
      explanation: "h1 태그는 가장 큰 제목을 나타내는 HTML 태그입니다.",
      usageCount: 15,
      correctRate: 85,
    },
    {
      id: "bank_2",
      subject: "웹 개발 기초",
      detailSubject: "CSS 기초",
      question: "CSS에서 요소의 배경색을 설정하는 속성은?",
      type: "객관식",
      difficulty: "쉬움",
      options: ["color", "background-color", "bg-color", "background"],
      correctAnswer: 1,
      score: 5,
      explanation: "background-color 속성은 요소의 배경색을 설정합니다.",
      usageCount: 12,
      correctRate: 92,
    },
    {
      id: "bank_3",
      subject: "프론트엔드 개발",
      detailSubject: "JavaScript 기초",
      question: "JavaScript에서 변수를 선언하는 키워드를 모두 나열하시오.",
      type: "주관식",
      difficulty: "보통",
      score: 10,
      explanation: "var, let, const가 JavaScript에서 변수를 선언하는 키워드입니다.",
      usageCount: 8,
      correctRate: 78,
    },
    {
      id: "bank_4",
      subject: "프론트엔드 개발",
      detailSubject: "React 기초",
      question: "React에서 컴포넌트의 상태를 관리하기 위해 사용하는 Hook은?",
      type: "주관식",
      difficulty: "보통",
      score: 8,
      explanation: "useState Hook을 사용하여 함수형 컴포넌트에서 상태를 관리할 수 있습니다.",
      usageCount: 20,
      correctRate: 65,
    },
    {
      id: "bank_5",
      subject: "백엔드 개발",
      detailSubject: "Node.js 기초",
      question: "Express.js를 사용하여 간단한 REST API 서버를 구현하는 코드를 작성하시오.",
      type: "코드형",
      difficulty: "어려움",
      score: 15,
      explanation: "Express.js의 기본 라우팅과 미들웨어를 활용한 REST API 구현 예시입니다.",
      usageCount: 5,
      correctRate: 45,
    },
  ]

  const examTypes = ["퀴즈", "중간고사", "기말고사", "실습평가", "과제"]
  const questionTypes = ["객관식", "주관식", "코드형"]

  const handleExamDataChange = (field, value) => {
    setExamData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
  }

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
            }
          : q,
      ),
    )
  }

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "객관식",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      score: 5,
      explanation: "",
    }
    setQuestions((prev) => [...prev, newQuestion])
  }

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((q) => q.id !== questionId))
    }
  }

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId && q.options.length < 6 ? { ...q, options: [...q.options, ""] } : q)),
    )
  }

  const removeOption = (questionId, optionIndex) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId && q.options.length > 2
          ? {
              ...q,
              options: q.options.filter((_, idx) => idx !== optionIndex),
              correctAnswer:
                q.correctAnswer >= optionIndex && q.correctAnswer > 0 ? q.correctAnswer - 1 : q.correctAnswer,
            }
          : q,
      ),
    )
  }

  const validateForm = () => {
    const newErrors = {}

    if (!examData.title.trim()) newErrors.title = "시험 제목을 입력해주세요"
    if (!examData.course) newErrors.course = "과정을 선택해주세요"
    if (!examData.startDate) newErrors.startDate = "시작일을 선택해주세요"
    if (!examData.endDate) newErrors.endDate = "종료일을 선택해주세요"
    if (examData.startDate && examData.endDate && examData.startDate >= examData.endDate) {
      newErrors.endDate = "종료일은 시작일보다 늦어야 합니다"
    }

    questions.forEach((q, index) => {
      if (!q.question.trim()) {
        newErrors[`question_${q.id}`] = `${index + 1}번 문제를 입력해주세요`
      }
      if (q.type === "객관식" && q.options.some((opt) => !opt.trim())) {
        newErrors[`options_${q.id}`] = `${index + 1}번 문제의 모든 선택지를 입력해주세요`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // 시험 생성 API 호출
      console.log("시험 데이터:", examData)
      console.log("문제 데이터:", questions)

      // 성공 시 목록 페이지로 이동
      // router.push('/instructor/exam/my-exams')
    } catch (error) {
      console.error("시험 생성 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    if (!validateForm()) return
    console.log("시험 미리보기")
  }

  // 문제은행 관련 함수들
  const openQuestionBank = () => {
    setQuestionBankData(questionBankQuestions)
    setSelectedQuestions([])
    setIsQuestionBankOpen(true)
  }

  const closeQuestionBank = () => {
    setIsQuestionBankOpen(false)
    setSelectedQuestions([])
    setBankSearchTerm("")
    setBankSelectedSubject("all")
    setBankSelectedDifficulty("all")
  }

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const addSelectedQuestions = () => {
    const questionsToAdd = questionBankData
      .filter((q) => selectedQuestions.includes(q.id))
      .map((q) => ({
        id: questions.length + selectedQuestions.indexOf(q.id) + 1,
        type: q.type,
        question: q.question,
        options: q.options || ["", "", "", ""],
        correctAnswer: q.correctAnswer || 0,
        score: q.score,
        explanation: q.explanation || "",
        fromBank: true,
        bankId: q.id,
      }))

    setQuestions((prev) => [...prev, ...questionsToAdd])
    closeQuestionBank()
  }

  // 필터링된 문제은행 문제들
  const filteredBankQuestions = questionBankData.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      question.subject.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      question.detailSubject.toLowerCase().includes(bankSearchTerm.toLowerCase())
    const matchesSubject = bankSelectedSubject === "all" || question.subject === bankSelectedSubject
    const matchesDifficulty = bankSelectedDifficulty === "all" || question.difficulty === bankSelectedDifficulty

    return matchesSearch && matchesSubject && matchesDifficulty
  })

  const getTotalScore = () => {
    return questions.reduce((total, q) => total + (q.score || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="시험 관리" menuItems={sidebarItems} currentPath="/instructor/exam/my-exams" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <Link to="/instructor/exam/my-exams">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      목록으로
                    </Button>
                  </Link>
                  <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                    새 시험 만들기
                  </h1>
                </div>
                <p className="text-gray-600">담당 강의에 새로운 시험을 출제하고 관리할 수 있습니다.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handlePreview} className="bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  미리보기
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "저장 중..." : "시험 생성"}
                </Button>
              </div>
            </div>

            {/* 시험 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>시험 기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시험 제목 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={examData.title}
                      onChange={(e) => handleExamDataChange("title", e.target.value)}
                      placeholder="시험 제목을 입력하세요"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당 과정 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={examData.course}
                      onChange={(e) => handleExamDataChange("course", e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.course ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">과정을 선택하세요</option>
                      {myCourses.map((course) => (
                        <option key={course.id} value={`${course.name} (${course.code})`}>
                          {course.name} ({course.code})
                        </option>
                      ))}
                    </select>
                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시험 유형</label>
                    <select
                      value={examData.type}
                      onChange={(e) => handleExamDataChange("type", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {examTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시험 시간 (분)</label>
                    <Input
                      type="number"
                      value={examData.duration}
                      onChange={(e) => handleExamDataChange("duration", Number.parseInt(e.target.value))}
                      min="1"
                      max="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">만점</label>
                    <Input
                      type="number"
                      value={examData.maxScore}
                      onChange={(e) => handleExamDataChange("maxScore", Number.parseInt(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시작일시 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="datetime-local"
                      value={examData.startDate}
                      onChange={(e) => handleExamDataChange("startDate", e.target.value)}
                      className={errors.startDate ? "border-red-500" : ""}
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      종료일시 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="datetime-local"
                      value={examData.endDate}
                      onChange={(e) => handleExamDataChange("endDate", e.target.value)}
                      className={errors.endDate ? "border-red-500" : ""}
                    />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">시험 설명</label>
                  <Textarea
                    value={examData.description}
                    onChange={(e) => handleExamDataChange("description", e.target.value)}
                    placeholder="시험에 대한 설명을 입력하세요"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">응시 안내사항</label>
                  <Textarea
                    value={examData.instructions}
                    onChange={(e) => handleExamDataChange("instructions", e.target.value)}
                    placeholder="학생들에게 전달할 응시 안내사항을 입력하세요"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allowLateSubmission"
                      checked={examData.allowLateSubmission}
                      onChange={(e) => handleExamDataChange("allowLateSubmission", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="allowLateSubmission" className="text-sm text-gray-700">
                      지각 제출 허용
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showResults"
                      checked={examData.showResults}
                      onChange={(e) => handleExamDataChange("showResults", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="showResults" className="text-sm text-gray-700">
                      결과 즉시 공개
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="randomizeQuestions"
                      checked={examData.randomizeQuestions}
                      onChange={(e) => handleExamDataChange("randomizeQuestions", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="randomizeQuestions" className="text-sm text-gray-700">
                      문제 순서 랜덤
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 문제 출제 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle style={{ color: "#2C3E50" }}>문제 출제</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      총 {questions.length}문항 | 총점: {getTotalScore()}점
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent" onClick={openQuestionBank}>
                      <Upload className="w-4 h-4 mr-2" />
                      문제 가져오기
                    </Button>
                    <Button onClick={addQuestion} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      문제 추가
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-6 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                          문제 {index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <select
                            value={question.type}
                            onChange={(e) => handleQuestionChange(question.id, "type", e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {questionTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <Input
                            type="number"
                            value={question.score}
                            onChange={(e) =>
                              handleQuestionChange(question.id, "score", Number.parseInt(e.target.value))
                            }
                            min="1"
                            max="50"
                            className="w-20 text-sm"
                            placeholder="점수"
                          />
                          <span className="text-sm text-gray-500">점</span>
                          {questions.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeQuestion(question.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            문제 <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => handleQuestionChange(question.id, "question", e.target.value)}
                            placeholder="문제를 입력하세요"
                            rows={3}
                            className={errors[`question_${question.id}`] ? "border-red-500" : ""}
                          />
                          {errors[`question_${question.id}`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`question_${question.id}`]}</p>
                          )}
                        </div>

                        {question.type === "객관식" && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                선택지 <span className="text-red-500">*</span>
                              </label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addOption(question.id)}
                                disabled={question.options.length >= 6}
                                className="bg-transparent"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                선택지 추가
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct_${question.id}`}
                                    checked={question.correctAnswer === optionIndex}
                                    onChange={() => handleQuestionChange(question.id, "correctAnswer", optionIndex)}
                                    className="text-blue-600"
                                  />
                                  <span className="text-sm font-medium text-gray-700 w-6">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  <Input
                                    value={option}
                                    onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                    placeholder={`선택지 ${String.fromCharCode(65 + optionIndex)}`}
                                    className="flex-1"
                                  />
                                  {question.options.length > 2 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeOption(question.id, optionIndex)}
                                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            {errors[`options_${question.id}`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`options_${question.id}`]}</p>
                            )}
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">해설 (선택사항)</label>
                          <Textarea
                            value={question.explanation}
                            onChange={(e) => handleQuestionChange(question.id, "explanation", e.target.value)}
                            placeholder="문제에 대한 해설을 입력하세요"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 시험 생성 안내 */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#2C3E50" }}>시험 생성 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">시험 설정</h4>
                    <p className="text-blue-600">시험 기본 정보와 응시 조건을 설정할 수 있습니다.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">문제 출제</h4>
                    <p className="text-green-600">다양한 유형의 문제를 출제하고 배점을 설정할 수 있습니다.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">시험 관리</h4>
                    <p className="text-purple-600">생성된 시험을 수정하고 응시 현황을 관리할 수 있습니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* 문제은행 모달 */}
      {isQuestionBankOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex flex-col h-[90vh]">
              {/* 모달 헤더 */}
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                    문제은행에서 문제 가져오기
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    기존에 생성된 문제들을 선택하여 시험에 추가할 수 있습니다.
                  </p>
                </div>
                <button onClick={closeQuestionBank} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 검색 및 필터 */}
              <div className="p-6 border-b bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="문제 내용, 과목명으로 검색..."
                        value={bankSearchTerm}
                        onChange={(e) => setBankSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <select
                    value={bankSelectedSubject}
                    onChange={(e) => setBankSelectedSubject(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 과목</option>
                    <option value="웹 개발 기초">웹 개발 기초</option>
                    <option value="프론트엔드 개발">프론트엔드 개발</option>
                    <option value="백엔드 개발">백엔드 개발</option>
                    <option value="데이터베이스">데이터베이스</option>
                  </select>
                  <select
                    value={bankSelectedDifficulty}
                    onChange={(e) => setBankSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 난이도</option>
                    <option value="쉬움">쉬움</option>
                    <option value="보통">보통</option>
                    <option value="어려움">어려움</option>
                  </select>
                </div>
              </div>

              {/* 문제 목록 */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {filteredBankQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedQuestions.includes(question.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleQuestionSelection(question.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedQuestions.includes(question.id)}
                              onChange={() => toggleQuestionSelection(question.id)}
                              className="rounded text-blue-600"
                            />
                            <span className="text-sm font-medium text-blue-600">
                              {question.subject} - {question.detailSubject}
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
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {question.type}
                            </span>
                            <span className="text-xs text-gray-500">{question.score}점</span>
                          </div>
                          <p className="text-gray-800 mb-2">{question.question}</p>
                          {question.options && (
                            <div className="text-sm text-gray-600 mb-2">
                              <div className="grid grid-cols-2 gap-1">
                                {question.options.map((option, idx) => (
                                  <div
                                    key={idx}
                                    className={`${idx === question.correctAnswer ? "font-medium text-green-600" : ""}`}
                                  >
                                    {String.fromCharCode(65 + idx)}. {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>사용횟수: {question.usageCount}회</span>
                            <span>정답률: {question.correctRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredBankQuestions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">검색 조건에 맞는 문제가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                <div className="text-sm text-gray-600">{selectedQuestions.length}개 문제 선택됨</div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={closeQuestionBank} className="bg-transparent">
                    취소
                  </Button>
                  <Button
                    onClick={addSelectedQuestions}
                    disabled={selectedQuestions.length === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    선택한 문제 추가 ({selectedQuestions.length}개)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
