"use client"
import StatsCard from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Users, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function ExamPage() {
  const sidebarItems = [
    { key: "course-list", label: "과정 리스트", href: "/exam/courses" },
    { key: "question-list", label: "과목 문제 리스트", href: "/exam/questions" },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const stats = [
    {
      title: "전체 시험",
      value: "0개",
      icon: FileText,
      color: "#9b59b6",
    },
    {
      title: "진행 중인 시험",
      value: "0개",
      icon: Clock,
      color: "#9b59b6",
    },
    {
      title: "완료된 시험",
      value: "0개",
      icon: CheckCircle,
      color: "#9b59b6",
    },
  ]

  // TODO: 실제 API 호출로 교체 필요
  const recentExams = []

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="exam" userRole="director" userName="관리자" />
      <div className="flex">
        <Sidebar title="시험 및 성적 관리" menuItems={sidebarItems} />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C3E50" }}>
                시험 및 성적 관리
              </h1>
              <p className="text-gray-600">좌측 사이드바에서 메뉴를 선택해주세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
              ))}
            </div>

            {/* 최근 시험 현황 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                  <TrendingUp className="w-5 h-5" />
                  최근 시험 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentExams.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">등록된 시험이 없습니다.</p>
                    <p className="text-sm text-gray-400">새로운 시험을 만들어보세요.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentExams.map((exam) => (
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
                          <p className="text-sm text-gray-600">
                            응시자: {exam.completed}/{exam.participants}명
                            {exam.avgScore > 0 && ` | 평균 점수: ${exam.avgScore}점`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">마감일</p>
                          <p className="font-medium" style={{ color: "#9b59b6" }}>
                            {exam.endDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  <p className="text-gray-600 text-sm mb-4">과정별 시험을 관리하고 성적을 확인할 수 있습니다.</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <FileText className="w-4 h-4 mr-2" />새 시험 만들기
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      성적 통계 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: "#2C3E50" }}>
                    <Users className="w-5 h-5" />
                    문제 관리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm mb-4">과목별 문제를 관리하고 문제 은행을 구축할 수 있습니다.</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <FileText className="w-4 h-4 mr-2" />새 문제 등록
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      style={{ borderColor: "#9b59b6", color: "#9b59b6" }}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      문제 은행 관리
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
