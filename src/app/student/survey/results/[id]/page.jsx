"use client"

import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, User, Calendar, BookOpen, CheckCircle, MessageSquare, BarChart3 } from "lucide-react"

export default function SurveyResultsPage() {
  const params = useParams()
  const history = useHistory()
  const courseId = params.id

  const [currentPath] = useState("/student/survey/results")

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
  ]

  // 강의 정보 및 평가 결과 (실제로는 API에서 가져올 데이터)
  const surveyResult = {
    courseInfo: {
      id: courseId,
      courseName: "JavaScript 기초",
      instructor: "김영희 교수",
      period: "2024-01-01 ~ 2024-03-31",
      totalClasses: 20,
      attendedClasses: 15,
    },
    submissionInfo: {
      submittedAt: "2024-01-20 14:30",
      status: "완료",
    },
    ratings: {
      content: 4,
      teaching: 5,
      materials: 4,
      assignments: 3,
      overall: 4,
    },
    feedback:
      "강의 내용이 체계적이고 이해하기 쉽게 설명해주셔서 좋았습니다. 특히 실습 위주의 수업이 도움이 많이 되었습니다. 다만 과제의 난이도가 조금 높아서 어려웠던 부분이 있었습니다. 전반적으로 만족스러운 강의였습니다.",
    averageRatings: {
      content: 4.2,
      teaching: 4.5,
      materials: 4.1,
      assignments: 3.8,
      overall: 4.3,
    },
  }

  const evaluationItems = [
    {
      key: "content",
      title: "강의 내용",
      description: "강의 내용의 체계성, 명확성, 유용성",
    },
    {
      key: "teaching",
      title: "교수법",
      description: "강의 진행 방식, 설명 능력, 학생과의 소통",
    },
    {
      key: "materials",
      title: "강의 자료",
      description: "교재, PPT, 참고자료의 질과 활용도",
    },
    {
      key: "assignments",
      title: "과제 및 평가",
      description: "과제의 적절성, 피드백의 질",
    },
    {
      key: "overall",
      title: "전체적 만족도",
      description: "강의에 대한 전반적인 만족도",
    },
  ]

  const StarDisplay = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "매우 불만족"
      case 2:
        return "불만족"
      case 3:
        return "보통"
      case 4:
        return "만족"
      case 5:
        return "매우 만족"
      default:
        return ""
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    if (rating >= 3.0) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="student" userName="김학생" />

      <div className="flex">
        <Sidebar title="설문 평가" menuItems={sidebarMenuItems} currentPath={currentPath} />

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* 뒤로가기 버튼 */}
            <Button variant="outline" onClick={() => history.goBack()} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>

            {/* 강의 정보 및 제출 상태 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  설문 평가 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{surveyResult.courseInfo.courseName}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{surveyResult.courseInfo.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{surveyResult.courseInfo.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>
                            출석: {surveyResult.courseInfo.attendedClasses}/{surveyResult.courseInfo.totalClasses}회
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800 mb-2">설문 완료</Badge>
                      <p className="text-sm text-gray-600">제출일: {surveyResult.submissionInfo.submittedAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 내 평가 결과 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: "#1abc9c" }} />내 평가 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {evaluationItems.map((item) => (
                    <div key={item.key} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        </div>
                        <div className="ml-6 text-right">
                          <div className="flex items-center gap-3 mb-2">
                            <StarDisplay rating={surveyResult.ratings[item.key]} />
                            <span className="text-lg font-bold text-gray-900">{surveyResult.ratings[item.key]}.0</span>
                          </div>
                          <p className="text-sm text-gray-600">{getRatingText(surveyResult.ratings[item.key])}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 평균 점수 */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">내 평가 평균</h4>
                      <p className="text-sm text-gray-600">전체 항목 평균 점수</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3">
                        <StarDisplay
                          rating={Math.round(
                            Object.values(surveyResult.ratings).reduce((a, b) => a + b, 0) /
                              Object.values(surveyResult.ratings).length,
                          )}
                        />
                        <span className="text-2xl font-bold text-blue-600">
                          {(
                            Object.values(surveyResult.ratings).reduce((a, b) => a + b, 0) /
                            Object.values(surveyResult.ratings).length
                          ).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 자유 의견 */}
            {surveyResult.feedback && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" style={{ color: "#9b59b6" }} />
                    내가 작성한 자유 의견
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{surveyResult.feedback}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 전체 평가 통계 비교 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" style={{ color: "#e67e22" }} />
                  전체 평가 통계와 비교
                </CardTitle>
                <p className="text-sm text-gray-600">다른 학생들의 평가와 비교해보세요</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluationItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">내 평가:</span>
                            <span className="font-medium text-blue-600">{surveyResult.ratings[item.key]}.0점</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">전체 평균:</span>
                            <span className={`font-medium ${getRatingColor(surveyResult.averageRatings[item.key])}`}>
                              {surveyResult.averageRatings[item.key]}점
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">차이:</span>
                            <span
                              className={`font-medium ${
                                surveyResult.ratings[item.key] > surveyResult.averageRatings[item.key]
                                  ? "text-green-600"
                                  : surveyResult.ratings[item.key] < surveyResult.averageRatings[item.key]
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {surveyResult.ratings[item.key] > surveyResult.averageRatings[item.key] ? "+" : ""}
                              {(surveyResult.ratings[item.key] - surveyResult.averageRatings[item.key]).toFixed(1)}점
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 안내사항 */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• 제출된 설문 평가는 수정할 수 없습니다.</p>
                  <p>• 전체 평가 통계는 모든 학생들의 평가를 종합한 결과입니다.</p>
                  <p>• 설문 결과는 강의 개선을 위한 목적으로 활용됩니다.</p>
                  <p>• 개인의 평가 내용은 익명으로 처리됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
