"use client"
import { useState } from "react"
import { useParams } from "react-router-dom"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Users,
  TrendingUp,
  ArrowLeft,
  Download,
  Edit,
  Eye,
  CheckCircle,
  Calendar,
  BookOpen,
  X,
  Plus,
  Minus,
} from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { Link } from "react-router-dom"

export default function ExamDetailPage() {
  const params = useParams()
  const examId = params.id
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState(null)
  const [editingQuestions, setEditingQuestions] = useState([])

  const sidebarItems = [
    { key: "my-exams", label: "내 시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/questions" },
  ]

  // 시험 상세 정보 (실제로는 API에서 가져올 데이터)
  const examDetail = {
    id: examId,
    title: "JavaScript 기초 중간고사",
    course: "웹 개발 기초",
    courseCode: "WEB101",
    status: "진행중",
    type: "중간고사",
    description: "JavaScript의 기본 문법과 DOM 조작에 대한 이해도를 평가하는 중간고사입니다.",
    participants: 25,
    submitted: 18,
    graded: 12,
    totalQuestions: 20,
    duration: 90,
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    createdDate: "2024-01-10",
    avgScore: 78.5,
    maxScore: 100,
    passingScore: 60,
    instructions: "모든 문제를 신중히 읽고 답변해주세요. 시간 제한이 있으니 시간 배분에 유의하세요.",
    questions: [
      {
        id: 1,
        type: "객관식",
        question: "JavaScript에서 변수를 선언하는 키워드가 아닌 것은?",
        options: ["var", "let", "const", "define"],
        correctAnswer: "define",
        points: 5,
      },
      {
        id: 2,
        type: "주관식",
        question: "DOM이란 무엇인지 설명하세요.",
        points: 10,
      },
      {
        id: 3,
        type: "객관식",
        question: "다음 중 JavaScript의 데이터 타입이 아닌 것은?",
        options: ["string", "number", "boolean", "integer"],
        correctAnswer: "integer",
        points: 5,
      },
    ],
  }

  // 학생별 응시 현황 (실제로는 API에서 가져올 데이터)
  const studentResults = [
    {
      id: 1,
      studentId: "2024001",
      name: "김학생",
      email: "student1@example.com",
      submittedAt: "2024-01-16 14:30:25",
      status: "채점완료",
      score: 85,
      timeSpent: 75,
      answers: 18,
      correct: 15,
      graded: true,
      gradedAt: "2024-01-16 16:20:10",
    },
    {
      id: 2,
      studentId: "2024002",
      name: "이학생",
      email: "student2@example.com",
      submittedAt: "2024-01-16 15:45:12",
      status: "채점대기",
      score: null,
      timeSpent: 88,
      answers: 20,
      correct: null,
      graded: false,
      gradedAt: null,
    },
    {
      id: 3,
      studentId: "2024003",
      name: "박학생",
      email: "student3@example.com",
      submittedAt: "2024-01-17 10:15:33",
      status: "채점완료",
      score: 72,
      timeSpent: 82,
      answers: 19,
      correct: 14,
      graded: true,
      gradedAt: "2024-01-17 11:30:45",
    },
    {
      id: 4,
      studentId: "2024004",
      name: "최학생",
      email: "student4@example.com",
      submittedAt: null,
      status: "미제출",
      score: null,
      timeSpent: null,
      answers: null,
      correct: null,
      graded: false,
      gradedAt: null,
    },
    {
      id: 5,
      studentId: "2024005",
      name: "정학생",
      email: "student5@example.com",
      submittedAt: "2024-01-18 09:22:18",
      status: "채점완료",
      score: 91,
      timeSpent: 68,
      answers: 20,
      correct: 18,
      graded: true,
      gradedAt: "2024-01-18 10:15:30",
    },
  ]

  const stats = [
    {
      title: "총 참여자",
      value: `${examDetail.participants}명`,
      icon: Users,
      color: "#9b59b6",
    },
    {
      title: "제출 완료",
      value: `${examDetail.submitted}명`,
      icon: CheckCircle,
      color: "#9b59b6",
    },
    {
      title: "채점 완료",
      value: `${examDetail.graded}명`,
      icon: Edit,
      color: "#9b59b6",
    },
    {
      title: "평균 점수",
      value: `${examDetail.avgScore}점`,
      icon: TrendingUp,
      color: "#9b59b6",
    },
  ]

  const filteredResults = studentResults.filter((result) => {
    const matchesSearch =
      result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || result.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "채점완료":
        return "bg-green-100 text-green-800"
      case "채점대기":
        return "bg-yellow-100 text-yellow-800"
      case "미제출":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score, maxScore) => {
    if (!score) return "text-gray-500"
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "text-green-600 font-bold"
    if (percentage >= 80) return "text-blue-600 font-semibold"
    if (percentage >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const handleGradeStudent = (student) => {
    setSelectedStudent(student)
    setIsGradingModalOpen(true)
  }

  const handleGradingSubmit = (gradingData) => {
    console.log("채점 완료:", gradingData)
    // 실제로는 API 호출하여 채점 결과 저장
    setIsGradingModalOpen(false)
    setSelectedStudent(null)
    // 목록 새로고침 로직 추가
  }

  const handleEditExam = () => {
    setEditingExam({
      title: examDetail.title,
      course: examDetail.course,
      type: examDetail.type,
      duration: examDetail.duration,
      maxScore: examDetail.maxScore,
      passingScore: examDetail.passingScore,
      startDate: examDetail.startDate,
      endDate: examDetail.endDate,
      description: examDetail.description,
      instructions: examDetail.instructions,
    })
    setEditingQuestions([...examDetail.questions])
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = () => {
    console.log("시험 수정 완료:", editingExam, editingQuestions)
    // 실제로는 API 호출하여 시험 정보 업데이트
    setIsEditModalOpen(false)
    setEditingExam(null)
    setEditingQuestions([])
  }

  const handleEditCancel = () => {
    setIsEditModalOpen(false)
    setEditingExam(null)
    setEditingQuestions([])
  }

  const handleExamFieldChange = (field, value) => {
    setEditingExam((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleQuestionEdit = (questionId, field, value) => {
    setEditingQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
  }

  const handleOptionEdit = (questionId, optionIndex, value) => {
    setEditingQuestions((prev) =>
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

  const addEditQuestion = () => {
    const newQuestion = {
      id: editingQuestions.length + 1,
      type: "객관식",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "define",
      points: 5,
    }
    setEditingQuestions((prev) => [...prev, newQuestion])
  }

  const removeEditQuestion = (questionId) => {
    if (editingQuestions.length > 1) {
      setEditingQuestions((prev) => prev.filter((q) => q.id !== questionId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="시험 관리" menuItems={sidebarItems} currentPath="/instructor/exam/my-exams" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex items-center gap-4 mb-6">
              <Link to="/instructor/exam/my-exams">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  목록으로
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                  {examDetail.title}
                </h1>
                <p className="text-gray-600">
                  {examDetail.course} ({examDetail.courseCode}) • {examDetail.type}
                </p>
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            {/* 시험 기본 정보 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <FileText className="w-5 h-5" />
                    시험 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">시험 상태</p>
                      <Badge className={getStatusColor(examDetail.status)}>{examDetail.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">시험 유형</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">문항 수</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.totalQuestions}문항
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">시험 시간</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.duration}분
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">만점</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.maxScore}점
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">합격 점수</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.passingScore}점
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">시험 설명</p>
                    <p className="text-sm" style={{ color: "#2C3E50" }}>
                      {examDetail.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">응시 안내</p>
                    <p className="text-sm" style={{ color: "#2C3E50" }}>
                      {examDetail.instructions}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <Calendar className="w-5 h-5" />
                    일정 및 현황
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">시작일</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">종료일</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">출제일</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.createdDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">평균 점수</p>
                      <p className="font-medium" style={{ color: "#2C3E50" }}>
                        {examDetail.avgScore}점
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">제출률</span>
                        <span style={{ color: "#2C3E50" }}>
                          {examDetail.submitted}/{examDetail.participants} (
                          {Math.round((examDetail.submitted / examDetail.participants) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(examDetail.submitted / examDetail.participants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">채점률</span>
                        <span style={{ color: "#2C3E50" }}>
                          {examDetail.graded}/{examDetail.submitted} (
                          {Math.round((examDetail.graded / examDetail.submitted) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(examDetail.graded / examDetail.submitted) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleEditExam}>
                      <Edit className="w-4 h-4 mr-2" />
                      시험 수정
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      결과 다운로드
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 문제 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <BookOpen className="w-5 h-5" />
                  출제 문제 ({examDetail.questions.length}문항)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examDetail.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                            {index + 1}번
                          </span>
                          <Badge variant="outline">{question.type}</Badge>
                          <span className="text-sm text-gray-500">{question.points}점</span>
                        </div>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#2C3E50" }}>
                        {question.question}
                      </p>
                      {question.options && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded ${
                                option === question.correctAnswer
                                  ? "bg-green-50 text-green-800 border border-green-200"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              {optIndex + 1}. {option}
                              {option === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 학생별 응시 현황 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <Users className="w-5 h-5" />
                    학생별 응시 현황 ({filteredResults.length}명)
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="학생명, 학번으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">전체 상태</option>
                      <option value="채점완료">채점완료</option>
                      <option value="채점대기">채점대기</option>
                      <option value="미제출">미제출</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">학생 정보</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">제출일시</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">상태</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">점수</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">소요시간</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">답변수</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((result) => (
                        <tr key={result.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium" style={{ color: "#2C3E50" }}>
                                {result.name}
                              </p>
                              <p className="text-sm text-gray-500">{result.studentId}</p>
                              <p className="text-xs text-gray-400">{result.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm" style={{ color: "#2C3E50" }}>
                              {result.submittedAt || "-"}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <p className={`text-sm ${getScoreColor(result.score, examDetail.maxScore)}`}>
                              {result.score ? `${result.score}점` : "-"}
                            </p>
                            {result.correct && (
                              <p className="text-xs text-gray-500">
                                정답: {result.correct}/{result.answers}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm" style={{ color: "#2C3E50" }}>
                              {result.timeSpent ? `${result.timeSpent}분` : "-"}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm" style={{ color: "#2C3E50" }}>
                              {result.answers ? `${result.answers}/${examDetail.totalQuestions}` : "-"}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {result.submittedAt && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  답안보기
                                </Button>
                              )}
                              {result.status === "채점대기" && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleGradeStudent(result)}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  채점하기
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-500">다른 검색어나 필터를 사용해보세요.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {/* 채점 모달 */}
      {isGradingModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                시험 채점 - {selectedStudent.name}
              </h2>
              <button onClick={() => setIsGradingModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 학생 정보 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">학생명</p>
                    <p className="font-medium" style={{ color: "#2C3E50" }}>
                      {selectedStudent.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">학번</p>
                    <p className="font-medium" style={{ color: "#2C3E50" }}>
                      {selectedStudent.studentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">제출일시</p>
                    <p className="font-medium" style={{ color: "#2C3E50" }}>
                      {selectedStudent.submittedAt}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">소요시간</p>
                    <p className="font-medium" style={{ color: "#2C3E50" }}>
                      {selectedStudent.timeSpent}분
                    </p>
                  </div>
                </div>
              </div>

              {/* 문제별 채점 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  문제별 채점
                </h3>

                {examDetail.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                          {index + 1}번
                        </span>
                        <Badge variant="outline">{question.type}</Badge>
                        <span className="text-sm text-gray-500">배점: {question.points}점</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium mb-2" style={{ color: "#2C3E50" }}>
                        문제
                      </p>
                      <p className="text-sm text-gray-700">{question.question}</p>
                    </div>

                    {question.type === "객관식" && (
                      <div className="mb-4">
                        <p className="font-medium mb-2" style={{ color: "#2C3E50" }}>
                          선택지
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded ${
                                option === question.correctAnswer
                                  ? "bg-green-50 text-green-800 border border-green-200"
                                  : option === "선택한답안" // 실제로는 학생이 선택한 답안과 비교
                                    ? "bg-red-50 text-red-800 border border-red-200"
                                    : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              {optIndex + 1}. {option}
                              {option === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">
                            <span className="text-gray-500">학생 답안: </span>
                            <span className="font-medium">2. let</span> {/* 실제로는 학생 답안 데이터 */}
                          </p>
                        </div>
                      </div>
                    )}

                    {question.type === "주관식" && (
                      <div className="mb-4">
                        <p className="font-medium mb-2" style={{ color: "#2C3E50" }}>
                          학생 답안
                        </p>
                        <div className="bg-gray-50 p-3 rounded border">
                          <p className="text-sm">
                            DOM은 Document Object Model의 약자로, HTML 문서의 구조를 객체로 표현한 것입니다.
                            JavaScript를 통해 웹 페이지의 요소들을 동적으로 조작할 수 있게 해주는 인터페이스입니다.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          점수:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={question.points}
                          defaultValue={question.type === "객관식" ? question.points : 0}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm text-gray-500">/ {question.points}점</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="피드백 (선택사항)"
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 총점 및 전체 피드백 */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#2C3E50" }}>
                      총점
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={examDetail.maxScore}
                        defaultValue="0"
                        className="w-24 px-3 py-2 border border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-500">/ {examDetail.maxScore}점</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#2C3E50" }}>
                      전체 피드백
                    </label>
                    <textarea
                      rows="3"
                      placeholder="학생에게 전달할 전체적인 피드백을 작성해주세요..."
                      className="w-full px-3 py-2 border border-gray-300 rounded resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsGradingModalOpen(false)} className="bg-transparent">
                  취소
                </Button>
                <Button
                  onClick={() =>
                    handleGradingSubmit({
                      studentId: selectedStudent.id,
                      // 채점 데이터 수집 로직
                    })
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  채점 완료
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 시험 수정 모달 */}
      {isEditModalOpen && editingExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                시험 수정 - {examDetail.title}
              </h2>
              <button onClick={handleEditCancel} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 시험 기본 정보 수정 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                  시험 기본 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시험 제목</label>
                    <input
                      type="text"
                      value={editingExam.title}
                      onChange={(e) => handleExamFieldChange("title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시험 유형</label>
                    <select
                      value={editingExam.type}
                      onChange={(e) => handleExamFieldChange("type", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="퀴즈">퀴즈</option>
                      <option value="중간고사">중간고사</option>
                      <option value="기말고사">기말고사</option>
                      <option value="실습평가">실습평가</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시험 시간 (분)</label>
                    <input
                      type="number"
                      value={editingExam.duration}
                      onChange={(e) => handleExamFieldChange("duration", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">만점</label>
                    <input
                      type="number"
                      value={editingExam.maxScore}
                      onChange={(e) => handleExamFieldChange("maxScore", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">합격 점수</label>
                    <input
                      type="number"
                      value={editingExam.passingScore}
                      onChange={(e) => handleExamFieldChange("passingScore", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                    <input
                      type="date"
                      value={editingExam.startDate}
                      onChange={(e) => handleExamFieldChange("startDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                    <input
                      type="date"
                      value={editingExam.endDate}
                      onChange={(e) => handleExamFieldChange("endDate", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">시험 설명</label>
                  <textarea
                    value={editingExam.description}
                    onChange={(e) => handleExamFieldChange("description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">응시 안내</label>
                  <textarea
                    value={editingExam.instructions}
                    onChange={(e) => handleExamFieldChange("instructions", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 문제 수정 */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                    출제 문제
                  </h3>
                  <Button onClick={addEditQuestion} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    문제 추가
                  </Button>
                </div>

                <div className="space-y-4">
                  {editingQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-md font-semibold" style={{ color: "#2C3E50" }}>
                          문제 {index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <select
                            value={question.type}
                            onChange={(e) => handleQuestionEdit(question.id, "type", e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="객관식">객관식</option>
                            <option value="주관식">주관식</option>
                            <option value="코드형">코드형</option>
                          </select>
                          <input
                            type="number"
                            value={question.points}
                            onChange={(e) => handleQuestionEdit(question.id, "points", Number.parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="점수"
                          />
                          <span className="text-sm text-gray-500">점</span>
                          {editingQuestions.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeEditQuestion(question.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">문제</label>
                          <textarea
                            value={question.question}
                            onChange={(e) => handleQuestionEdit(question.id, "question", e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {question.type === "객관식" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">선택지</label>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct_edit_${question.id}`}
                                    checked={question.correctAnswer === option}
                                    onChange={() => handleQuestionEdit(question.id, "correctAnswer", option)}
                                    className="text-blue-600"
                                  />
                                  <span className="text-sm font-medium text-gray-700 w-6">
                                    {String.fromCharCode(65 + optionIndex)}.
                                  </span>
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionEdit(question.id, optionIndex, e.target.value)}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-end gap-3 p-6 border-t">
              <Button variant="outline" onClick={handleEditCancel} className="bg-transparent">
                취소
              </Button>
              <Button onClick={handleEditSubmit} className="bg-blue-600 hover:bg-blue-700">
                수정 완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
