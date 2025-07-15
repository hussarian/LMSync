"use client"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, TrendingUp, Clock, Plus, Eye, Edit } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function InstructorExamPage() {
  const sidebarItems = [
    { key: "my-exams", label: "내 시험 관리", href: "/instructor/exam/my-exams" },
    { key: "question-management", label: "문제 관리", href: "/instructor/exam/question-bank" },
    { key: "history", label: "내 과정 성적", href: "/instructor/exam/lectures/history" },
  ]

  const stats = [
    {
      title: "담당 시험",
      value: "12개",
      icon: FileText,
      color: "#9b59b6",
    },
    {
      title: "진행 중인 시험",
      value: "3개",
      icon: Clock,
      color: "#9b59b6",
    },
    {
      title: "채점 대기",
      value: "28건",
      icon: Edit,
      color: "#9b59b6",
    },
    {
      title: "평균 점수",
      value: "82.5점",
      icon: TrendingUp,
      color: "#9b59b6",
    },
  ]

  const myExams = [
    {
      id: 1,
      title: "JavaScript 기초 중간고사",
      course: "웹 개발 기초",
      status: "진행중",
      participants: 25,
      submitted: 18,
      graded: 12,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      avgScore: 78.5,
    },
  ]

  const recentGrading = [
    {
      id: 1,
      studentName: "김철수",
      examTitle: "JavaScript 기초 중간고사",
      submittedAt: "2024-01-18 14:30",
      status: "채점 대기",
    },
    {
      id: 2,
      studentName: "이영희",
      examTitle: "React 컴포넌트 퀴즈",
      submittedAt: "2024-01-18 13:45",
      status: "채점 대기",
    },
    {
      id: 3,
      studentName: "박민수",
      examTitle: "JavaScript 기초 중간고사",
      submittedAt: "2024-01-18 12:20",
      status: "채점 완료",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "채점중":
        return "bg-yellow-100 text-yellow-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getGradingStatusColor = (status) => {
    switch (status) {
      case "채점 대기":
        return "bg-red-100 text-red-800"
      case "채점 완료":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="시험 관리" menuItems={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                시험 관리
              </h1>
              <p className="text-gray-600">담당 과정의 시험을 관리하고 채점할 수 있습니다.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            {/* 내 시험 목록 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <FileText className="w-5 h-5" />내 시험 목록
                  </CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />새 시험 만들기
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold" style={{ color: "#2C3E50" }}>
                            {exam.title}
                          </h3>
                          <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">과정: {exam.course}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>참여자: {exam.participants}명</span>
                          <span>제출: {exam.submitted}명</span>
                          <span>채점: {exam.graded}명</span>
                          {exam.avgScore > 0 && <span>평균: {exam.avgScore}점</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <p className="text-sm text-gray-600">시험 기간</p>
                          <p className="font-medium" style={{ color: "#9b59b6" }}>
                            {exam.startDate} ~ {exam.endDate}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          관리
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 채점 대기 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <Edit className="w-5 h-5" />
                  채점 대기 목록
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentGrading.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                            {item.studentName}
                          </h4>
                          <Badge className={getGradingStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{item.examTitle}</p>
                        <p className="text-xs text-gray-500">제출일: {item.submittedAt}</p>
                      </div>
                      <div className="flex gap-2">
                        {item.status === "채점 대기" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            채점하기
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          보기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 빠른 작업 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <BookOpen className="w-5 h-5" />
                    시험 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm mb-4">담당 과정의 시험을 생성하고 관리할 수 있습니다.</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <Plus className="w-4 h-4 mr-2" />새 시험 만들기
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      시험 템플릿 관리
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <TrendingUp className="w-5 h-5" />
                    채점 및 분석
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm mb-4">시험 결과를 채점하고 성적을 분석할 수 있습니다.</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      일괄 채점하기
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      성적 분석 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
