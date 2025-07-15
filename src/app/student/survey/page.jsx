"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Star, Clock, CheckCircle, AlertCircle, BookOpen, User, Calendar } from "lucide-react"

export default function StudentSurveyPage() {
  const [currentPath] = useState("/student/survey")

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
  ]

  // TODO: API 연동 필요 - 수강 중인 강의 목록 조회
  // TODO: 설문 진행률 및 마감일 알림 기능 추가
  // TODO: 설문 참여 독려 알림 시스템 추가
  // TODO: 설문 결과 열람 권한 관리
  // TODO: 설문 히스토리 관리 기능 추가
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "완료":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSurveyStatusColor = (status) => {
    switch (status) {
      case "미완료":
        return "bg-orange-100 text-orange-800"
      case "완료":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStartSurvey = (courseId) => {
    // TODO: 설문 시작 전 유효성 검사 추가
    window.location.href = `/student/survey/evaluate/${courseId}`
  }

  const handleViewResults = (courseId) => {
    // TODO: 설문 결과 열람 권한 확인
    window.location.href = `/student/survey/results/${courseId}`
  }

  // 안전한 통계 계산
  const totalCourses = enrolledCourses.length || 0
  const activeCourses = enrolledCourses.filter((course) => course?.status === "진행중").length || 0
  const incompleteSurveys = enrolledCourses.filter((course) => course?.surveyStatus === "미완료").length || 0
  const completedSurveys = enrolledCourses.filter((course) => course?.surveyStatus === "완료").length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="student" userName="학생" />

      <div className="flex">
        <Sidebar title="설문 평가" menuItems={sidebarMenuItems} currentPath={currentPath} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 페이지 헤더 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                강의 평가
              </h1>
              <p className="text-gray-600">수강 중인 강의를 평가하고 피드백을 제공해주세요.</p>
            </div>

            {/* 통계 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">수강 중인 강의</p>
                      <p className="text-3xl font-bold text-blue-600">{activeCourses}개</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">미완료 설문</p>
                      <p className="text-3xl font-bold text-orange-600">{incompleteSurveys}개</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">완료한 설문</p>
                      <p className="text-3xl font-bold text-green-600">{completedSurveys}개</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 수강 강의 목록 또는 빈 상태 */}
            {enrolledCourses.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="수강 중인 강의가 없습니다"
                description="설문을 진행할 수 있는 수강 강의가 없습니다. 강의를 신청하거나 관리자에게 문의하세요."
                action={{
                  label: "내 강의로 이동",
                  onClick: () => (window.location.href = "/student/my-courses"),
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" style={{ color: "#1abc9c" }} />
                    수강 중인 강의 목록
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{course?.courseName || "-"}</h3>
                              <Badge className={getStatusColor(course?.status)}>{course?.status || "-"}</Badge>
                              <Badge className={getSurveyStatusColor(course?.surveyStatus)}>
                                설문 {course?.surveyStatus || "-"}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{course?.instructor || "-"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{course?.period || "-"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>
                                  출석: {course?.attendedClasses || 0}/{course?.totalClasses || 0}회
                                </span>
                              </div>
                            </div>

                            {/* 진도율 */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-600">진도율</span>
                                <span className="text-sm font-medium">{course?.progress || 0}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${course?.progress || 0}%`,
                                    backgroundColor: "#1abc9c",
                                  }}
                                />
                              </div>
                            </div>

                            {course?.surveyStatus === "미완료" && course?.surveyDeadline && (
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-orange-600" />
                                  <span className="text-sm text-orange-800">설문 마감일: {course.surveyDeadline}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="ml-6 flex flex-col gap-2">
                            {course?.surveyStatus === "미완료" ? (
                              <Button
                                onClick={() => handleStartSurvey(course.id)}
                                className="bg-teal-600 hover:bg-teal-700"
                              >
                                <Star className="w-4 h-4 mr-2" />
                                설문 시작
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                onClick={() => handleViewResults(course.id)}
                                className="border-teal-600 text-teal-600 hover:bg-teal-50"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                결과 보기
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 설문 평가 안내 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" style={{ color: "#e74c3c" }} />
                  설문 평가 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">설문 평가 방법</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 각 강의에 대해 5점 척도로 평가해주세요</li>
                      <li>• 강의 내용, 교수법, 과제 등을 종합적으로 평가</li>
                      <li>• 건설적인 피드백을 작성해주세요</li>
                      <li>• 설문은 익명으로 처리됩니다</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">주의사항</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 설문 마감일을 확인해주세요</li>
                      <li>• 한 번 제출한 설문은 수정할 수 없습니다</li>
                      <li>• 성의있는 평가 부탁드립니다</li>
                      <li>• 설문 결과는 강의 개선에 활용됩니다</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
