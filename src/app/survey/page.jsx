"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Users, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function SurveyPage() {
  const [currentPath] = useState("/survey")

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
    { href: "/survey/items", label: "평가 항목", key: "survey-items" },
    { href: "/survey/lectures", label: "강의 리스트", key: "survey-lectures" },
    { href: "/survey/templates", label: "템플릿 목록", key: "survey-templates" },
  ]

  // 통계 데이터
  const stats = [
    {
      title: "전체 설문",
      value: "24개",
      icon: FileText,
      color: "#e74c3c",
      description: "등록된 설문 수",
    },
    {
      title: "진행 중인 설문",
      value: "8개",
      icon: Clock,
      color: "#f39c12",
      description: "현재 진행 중",
    },
    {
      title: "완료된 설문",
      value: "16개",
      icon: CheckCircle,
      color: "#27ae60",
      description: "완료된 설문 수",
    },
  ]

  // 최근 설문 현황
  const recentSurveys = [
    {
      id: 1,
      title: "JavaScript 기초 과정 만족도 조사",
      course: "JavaScript 기초",
      status: "진행중",
      responses: 45,
      totalStudents: 60,
      endDate: "2024-01-20",
      type: "만족도",
    },
    {
      id: 2,
      title: "React 심화 과정 강의 평가",
      course: "React 심화",
      status: "완료",
      responses: 32,
      totalStudents: 32,
      endDate: "2024-01-15",
      type: "강의평가",
    },
    {
      id: 3,
      title: "Python 데이터 분석 중간 평가",
      course: "Python 데이터 분석",
      status: "예정",
      responses: 0,
      totalStudents: 25,
      endDate: "2024-01-25",
      type: "중간평가",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-orange-100 text-orange-800"
      case "완료":
        return "bg-green-100 text-green-800"
      case "예정":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "만족도":
        return "bg-purple-100 text-purple-800"
      case "강의평가":
        return "bg-indigo-100 text-indigo-800"
      case "중간평가":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="staff" userName="관리자" />

      <div className="flex">
        <Sidebar title="설문 평가 관리" menuItems={sidebarMenuItems} currentPath={currentPath} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                설문 평가 관리
              </h1>
              <p className="text-gray-600">좌측 사이드바에서 메뉴를 선택해주세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-l-4 hover:shadow-lg transition-shadow">
                  <div
                    className="border-l-4 absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: stat.color }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-[rgba(228,245,235,1)]" style={{ color: "#1abc9c" }}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      </div>
                      <div className="p-3 rounded-full" style={{ backgroundColor: "#e4f5eb" }}>
                        <stat.icon className="w-6 h-6 font-normal" style={{ color: "1abc9c" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 최근 설문 현황 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" style={{ color: "#1abc9c" }} />
                    최근 설문 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSurveys.map((survey) => (
                      <div key={survey.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{survey.title}</h4>
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(survey.status)}>{survey.status}</Badge>
                            <Badge className={getTypeColor(survey.type)}>{survey.type}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{survey.course}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            응답: {survey.responses}/{survey.totalStudents}명
                          </span>
                          <span>마감: {survey.endDate}</span>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(survey.responses / survey.totalStudents) * 100}%`,
                              backgroundColor: "#1abc9c",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 빠른 작업 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" style={{ color: "#1abc9c" }} />
                    빠른 작업
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start bg-transparentr-teal-400 border-teal-500 border-teal-800 border-sky-400 border-indigo-400 border-indigo-900 border-teal-50 border-yellow-100 border-orange-50 border-neutral-50 border-slate-950 border-slate-100 border-slate-600 border-white border border-solid"
                      variant="outline"
                      style={{ borderColor: "#1abc9c", color: "black" }}
                    >
                      <FileText className="w-4 h-4 mr-2" />새 설문 만들기
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      style={{ borderColor: "#1abc9c", color: "black" }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      설문 결과 분석
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      style={{ borderColor: "#1abc9c", color: "black" }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      설문 일정 관리
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      style={{ borderColor: "#1abc9c", color: "black" }}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      통계 리포트 생성
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 설문 관리 안내 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" style={{ color: "#e74c3c" }} />
                  설문 평가 관리 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium mb-2" style={{ color: "black" }}>
                      평가 항목
                    </h4>
                    <p className="text-gray-600">
                      설문에 사용할 평가 항목들을 관리하고 새로운 항목을 추가할 수 있습니다.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium mb-2" style={{ color: "black" }}>
                      강의 리스트
                    </h4>
                    <p className="text-gray-600">설문 대상이 되는 강의들을 확인하고 설문을 배정할 수 있습니다.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium mb-2" style={{ color: "black" }}>
                      템플릿 목록
                    </h4>
                    <p className="text-gray-600">
                      미리 만들어진 설문 템플릿을 활용하여 빠르게 설문을 생성할 수 있습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
=======
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function SurveyPage() {
 const router = useRouter()

 useEffect(() => {
  router.push("/survey/items")
 }, [router])

 return null
>>>>>>> front-v3
}
