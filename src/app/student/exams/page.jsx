"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, FileText, Award, Eye, Play, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function StudentExamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [selectedExam, setSelectedExam] = useState(null)
  const [isExamModalOpen, setIsExamModalOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [examStarted, setExamStarted] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)

  // 샘플 시험 데이터
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "JavaScript 기초 중간고사",
      subject: "웹 프로그래밍",
      instructor: "김강사",
      type: "중간고사",
      status: "available",
      graded: false, // 채점 완료 여부 추가
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      duration: 90, // 분
      totalQuestions: 20,
      totalScore: 100,
      myScore: null,
      grade: null,
      attempts: 0,
      maxAttempts: 1,
      description: "JavaScript 기초 문법과 DOM 조작에 대한 이해도를 평가합니다.",
      questions: [
        {
          id: 1,
          type: "객관식",
          question: "JavaScript에서 변수를 선언하는 키워드가 아닌 것은?",
          options: ["var", "let", "const", "def"],
          correctAnswer: 3,
          score: 5,
        },
        {
          id: 2,
          type: "객관식",
          question: "다음 중 JavaScript의 데이터 타입이 아닌 것은?",
          options: ["string", "number", "boolean", "integer"],
          correctAnswer: 3,
          score: 5,
        },
        {
          id: 3,
          type: "주관식",
          question: "JavaScript에서 배열의 마지막 요소를 제거하는 메서드의 이름을 작성하세요.",
          correctAnswer: "pop",
          score: 10,
        },
      ],
    },
    {
      id: 2,
      title: "React 심화 기말고사",
      subject: "프론트엔드 개발",
      instructor: "이강사",
      type: "기말고사",
      status: "completed",
      graded: true,
      startDate: "2024-01-10",
      endDate: "2024-01-11",
      duration: 120,
      totalQuestions: 25,
      totalScore: 100,
      myScore: 85,
      grade: "B+",
      attempts: 1,
      maxAttempts: 1,
      description: "React Hooks, 상태 관리, 컴포넌트 설계에 대한 종합 평가입니다.",
      submittedAt: "2024-01-10 14:30",
      questions: [
        {
          id: 1,
          type: "객관식",
          question: "React에서 상태를 관리하는 Hook은 무엇인가요?",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctAnswer: 1,
          userAnswer: 1,
          score: 4,
          isCorrect: true,
          feedback: "정답입니다. useState는 함수형 컴포넌트에서 상태를 관리하는 기본적인 Hook입니다.",
        },
        {
          id: 2,
          type: "객관식",
          question: "useEffect Hook의 두 번째 매개변수는 무엇인가요?",
          options: ["콜백 함수", "의존성 배열", "상태 값", "이벤트 객체"],
          correctAnswer: 1,
          userAnswer: 0,
          score: 4,
          isCorrect: false,
          feedback: "의존성 배열(dependency array)이 정답입니다. 이 배열의 값이 변경될 때만 useEffect가 실행됩니다.",
        },
        {
          id: 3,
          type: "주관식",
          question: "React에서 컴포넌트 간 데이터를 전달하는 방법을 하나 작성하세요.",
          correctAnswer: "props",
          userAnswer: "props",
          score: 5,
          isCorrect: true,
          feedback: "정답입니다. props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 기본적인 방법입니다.",
        },
      ],
    },
    {
      id: 3,
      title: "Python 기초 퀴즈",
      subject: "프로그래밍 기초",
      instructor: "박강사",
      type: "퀴즈",
      status: "upcoming",
      graded: false,
      startDate: "2024-01-20",
      endDate: "2024-01-21",
      duration: 60,
      totalQuestions: 15,
      totalScore: 75,
      myScore: null,
      grade: null,
      attempts: 0,
      maxAttempts: 2,
      description: "Python 기본 문법과 자료구조에 대한 이해도를 확인합니다.",
      questions: [],
    },
    {
      id: 4,
      title: "데이터베이스 중간고사",
      subject: "데이터베이스",
      instructor: "최강사",
      type: "중간고사",
      status: "expired",
      graded: false,
      startDate: "2024-01-05",
      endDate: "2024-01-06",
      duration: 100,
      totalQuestions: 30,
      totalScore: 100,
      myScore: 0,
      grade: "F",
      attempts: 0,
      maxAttempts: 1,
      description: "관계형 데이터베이스와 SQL에 대한 기본 지식을 평가합니다.",
      questions: [],
    },
  ])

  // 통계 계산
  const totalExams = exams.length
  const completedExams = exams.filter((exam) => exam.status === "completed").length
  const availableExams = exams.filter((exam) => exam.status === "available").length
  const averageScore =
    exams.filter((exam) => exam.myScore !== null).reduce((sum, exam) => sum + exam.myScore, 0) /
      exams.filter((exam) => exam.myScore !== null).length || 0

  // 필터링된 시험 목록
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter
    const matchesSubject = subjectFilter === "all" || exam.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  // 과목 목록 추출
  const subjects = [...new Set(exams.map((exam) => exam.subject))]

  // 시험 상태별 스타일
  const getStatusStyle = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "응시 가능"
      case "completed":
        return "완료"
      case "upcoming":
        return "예정"
      case "expired":
        return "기한 만료"
      default:
        return "알 수 없음"
    }
  }

  // 시험 시작
  const startExam = (exam) => {
    setSelectedExam(exam)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(exam.duration * 60) // 분을 초로 변환
    setExamStarted(true)
    setIsExamModalOpen(true)
  }

  // 시험 타이머
  useEffect(() => {
    let timer
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            submitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [examStarted, timeLeft])

  // 시간 포맷팅
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // 답안 저장
  const saveAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // 시험 제출
  const submitExam = () => {
    // 채점 로직 (실제로는 서버에서 처리)
    let score = 0
    selectedExam.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (question.type === "객관식") {
        if (Number.parseInt(userAnswer) === question.correctAnswer) {
          score += question.score
        }
      } else if (question.type === "주관식") {
        if (userAnswer && userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase()) {
          score += question.score
        }
      }
    })

    // 시험 결과 업데이트
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === selectedExam.id
          ? {
              ...exam,
              status: "completed",
              graded: false, // 제출 직후에는 채점되지 않음
              myScore: score,
              grade: score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F",
              attempts: exam.attempts + 1,
              submittedAt: new Date().toLocaleString(),
            }
          : exam,
      ),
    )

    setExamStarted(false)
    setIsExamModalOpen(false)
    alert(`시험이 제출되었습니다. 점수: ${score}점`)
  }

  const viewExamResult = (exam) => {
    setSelectedResult(exam)
    setIsResultModalOpen(true)
  }

  const sidebarItems = [
    { href: "/student/exams", label: "시험 목록", key: "exam-list" },
    { href: "/student/grades", label: "성적 조회", key: "exam-results" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="my-exam" userRole="student" userName="김학생" />
      <div className="flex">
        <Sidebar title="시험 및 성적" menuItems={sidebarItems} currentPath="/student/exams" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">시험 및 성적</h1>
              <p className="text-gray-600 mt-1">시험을 응시하고 성적을 확인할 수 있습니다.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">전체 시험</p>
                    <p className="text-2xl font-bold text-gray-900">{totalExams}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">완료한 시험</p>
                    <p className="text-2xl font-bold text-gray-900">{completedExams}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">응시 가능</p>
                    <p className="text-2xl font-bold text-gray-900">{availableExams}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Award className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">평균 점수</p>
                    <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="시험명, 과목명, 강사명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 상태</option>
                    <option value="available">응시 가능</option>
                    <option value="completed">완료</option>
                    <option value="upcoming">예정</option>
                    <option value="expired">기한 만료</option>
                  </select>
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 과목</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 시험 목록 */}
            <div className="space-y-4">
              {filteredExams.length === 0 ? (
                <div className="bg-white p-8 rounded-lg border text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">조건에 맞는 시험이 없습니다.</p>
                </div>
              ) : (
                filteredExams.map((exam) => (
                  <div key={exam.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.title}</h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(exam.status)}`}
                                >
                                  {getStatusText(exam.status)}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                  {exam.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">과목:</span> {exam.subject}
                            </div>
                            <div>
                              <span className="font-medium">담당교수:</span> {exam.instructor}
                            </div>
                            <div>
                              <span className="font-medium">시험시간:</span> {exam.duration}분
                            </div>
                            <div>
                              <span className="font-medium">문항수:</span> {exam.totalQuestions}문제
                            </div>
                            <div>
                              <span className="font-medium">만점:</span> {exam.totalScore}점
                            </div>
                            <div>
                              <span className="font-medium">응시기간:</span> {exam.startDate} ~ {exam.endDate}
                            </div>
                            {exam.myScore !== null && (
                              <>
                                <div>
                                  <span className="font-medium">내 점수:</span>
                                  <span
                                    className={`ml-1 font-bold ${exam.myScore >= 60 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {exam.myScore}점
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium">등급:</span>
                                  <span
                                    className={`ml-1 font-bold ${exam.myScore >= 60 ? "text-green-600" : "text-red-600"}`}
                                  >
                                    {exam.grade}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm">{exam.description}</p>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2">
                          {exam.status === "available" && (
                            <button
                              onClick={() => startExam(exam)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              시험 시작
                            </button>
                          )}
                          {exam.status === "completed" && exam.graded && (
                            <button
                              onClick={() => viewExamResult(exam)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              결과 보기
                            </button>
                          )}
                          {exam.status === "completed" && !exam.graded && (
                            <button
                              disabled
                              className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed"
                            >
                              <AlertCircle className="w-4 h-4" />
                              채점 중
                            </button>
                          )}
                          {exam.status === "upcoming" && (
                            <button
                              disabled
                              className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed"
                            >
                              <Calendar className="w-4 h-4" />
                              시험 예정
                            </button>
                          )}
                          {exam.status === "expired" && (
                            <button
                              disabled
                              className="bg-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed"
                            >
                              <XCircle className="w-4 h-4" />
                              기한 만료
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 시험 응시 모달 */}
      {isExamModalOpen && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* 모달 헤더 */}
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{selectedExam.title}</h2>
                  <p className="text-blue-100">
                    {selectedExam.subject} | {selectedExam.instructor}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
                  <div className="text-blue-100 text-sm">남은 시간</div>
                </div>
              </div>
            </div>

            {/* 진행 상황 */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  문��� {currentQuestion + 1} / {selectedExam.questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  답변 완료: {Object.keys(answers).length} / {selectedExam.questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / selectedExam.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 문제 내용 */}
            <div className="p-6 flex-1 overflow-y-auto" style={{ maxHeight: "calc(90vh - 200px)" }}>
              {selectedExam.questions[currentQuestion] && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        {selectedExam.questions[currentQuestion].type}
                      </span>
                      <span className="text-sm text-gray-600">
                        배점: {selectedExam.questions[currentQuestion].score}점
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {selectedExam.questions[currentQuestion].question}
                    </h3>
                  </div>

                  {selectedExam.questions[currentQuestion].type === "객관식" && (
                    <div className="space-y-3">
                      {selectedExam.questions[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${selectedExam.questions[currentQuestion].id}`}
                            value={index}
                            checked={answers[selectedExam.questions[currentQuestion].id] == index}
                            onChange={(e) => saveAnswer(selectedExam.questions[currentQuestion].id, e.target.value)}
                            className="mr-3"
                          />
                          <span>
                            {index + 1}. {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {selectedExam.questions[currentQuestion].type === "주관식" && (
                    <div>
                      <textarea
                        value={answers[selectedExam.questions[currentQuestion].id] || ""}
                        onChange={(e) => saveAnswer(selectedExam.questions[currentQuestion].id, e.target.value)}
                        placeholder="답안을 입력하세요..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전 문제
                </button>
                <button
                  onClick={() => setCurrentQuestion(Math.min(selectedExam.questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === selectedExam.questions.length - 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음 문제
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (confirm("시험을 종료하시겠습니까? 저장되지 않은 답안은 사라집니다.")) {
                      setIsExamModalOpen(false)
                      setExamStarted(false)
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  시험 종료
                </button>
                <button
                  onClick={() => {
                    if (confirm("시험을 제출하시겠습니까?")) {
                      submitExam()
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  시험 제출
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 시험 결과 모달 */}
      {isResultModalOpen && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* 모달 헤더 */}
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{selectedResult.title} - 시험 결과</h2>
                  <p className="text-blue-100">
                    {selectedResult.subject} | {selectedResult.instructor}
                  </p>
                </div>
                <button onClick={() => setIsResultModalOpen(false)} className="text-white hover:text-gray-200">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 성적 요약 */}
            <div className="p-6 border-b bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedResult.myScore}점</div>
                  <div className="text-sm text-gray-600">획득 점수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedResult.totalScore}점</div>
                  <div className="text-sm text-gray-600">만점</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${selectedResult.myScore >= 60 ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedResult.grade}
                  </div>
                  <div className="text-sm text-gray-600">등급</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((selectedResult.myScore / selectedResult.totalScore) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">정답률</div>
                </div>
              </div>
            </div>

            {/* 시험 정보 */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">시험 정보</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">시험 유형:</span>
                  <span className="ml-2">{selectedResult.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">시험 시간:</span>
                  <span className="ml-2">{selectedResult.duration}분</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">총 문항수:</span>
                  <span className="ml-2">{selectedResult.totalQuestions}문제</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">제출일시:</span>
                  <span className="ml-2">{selectedResult.submittedAt}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">응시 횟수:</span>
                  <span className="ml-2">
                    {selectedResult.attempts}/{selectedResult.maxAttempts}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">합격 여부:</span>
                  <span
                    className={`ml-2 font-medium ${selectedResult.myScore >= 60 ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedResult.myScore >= 60 ? "합격" : "불합격"}
                  </span>
                </div>
              </div>
            </div>

            {/* 문제별 결과 */}
            <div className="p-6 flex-1 overflow-y-auto" style={{ maxHeight: "calc(90vh - 300px)" }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">문제별 채점 결과</h3>
              <div className="space-y-4">
                {selectedResult.questions && selectedResult.questions.length > 0 ? (
                  selectedResult.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                            문제 {index + 1}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                            {question.type}
                          </span>
                          <span className="text-sm text-gray-600">배점: {question.score}점</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {question.isCorrect ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              정답 ({question.score}점)
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              오답 (0점)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-2">{question.question}</h4>
                      </div>

                      {question.type === "객관식" && (
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-600">선택지:</span>
                            <div className="mt-1 space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded text-sm ${
                                    optIndex === question.correctAnswer
                                      ? "bg-green-100 text-green-800 font-medium"
                                      : optIndex === question.userAnswer
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-50 text-gray-700"
                                  }`}
                                >
                                  {optIndex + 1}. {option}
                                  {optIndex === question.correctAnswer && (
                                    <span className="ml-2 text-green-600 font-medium">(정답)</span>
                                  )}
                                  {optIndex === question.userAnswer && optIndex !== question.correctAnswer && (
                                    <span className="ml-2 text-red-600 font-medium">(내 답)</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {question.type === "주관식" && (
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-600">내 답안:</span>
                            <div className="mt-1 p-2 bg-gray-50 rounded text-gray-700">
                              {question.userAnswer || "답안 없음"}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-600">정답:</span>
                            <div className="mt-1 p-2 bg-green-50 rounded text-green-700 font-medium">
                              {question.correctAnswer}
                            </div>
                          </div>
                        </div>
                      )}

                      {question.feedback && (
                        <div className="mt-3 p-3 bg-blue-50 rounded">
                          <span className="font-medium text-blue-800">강사 피드백:</span>
                          <p className="text-blue-700 mt-1">{question.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">문제별 상세 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                총 {selectedResult.questions?.length || 0}문제 중{" "}
                {selectedResult.questions?.filter((q) => q.isCorrect).length || 0}문제 정답
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsResultModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  닫기
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">결과 다운로드</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
