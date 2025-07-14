"use client"

import { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ArrowLeft, Send, User, Calendar, BookOpen } from "lucide-react"

export default function EvaluateCoursePage() {
  const params = useParams()
  const history = useHistory()
  const courseId = params.id

  const [currentPath] = useState("/student/survey/evaluate")
  const [ratings, setRatings] = useState({
    content: 0,
    teaching: 0,
    materials: 0,
    assignments: 0,
    overall: 0,
  })
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 사이드바 메뉴 구성
  const sidebarMenuItems = [
  ]

  // 강의 정보 (실제로는 API에서 가져올 데이터)
  const courseInfo = {
    id: courseId,
    courseName: "JavaScript 기초",
    instructor: "김영희 교수",
    period: "2024-01-01 ~ 2024-03-31",
    totalClasses: 20,
    attendedClasses: 15,
  }

  const evaluationItems = [
    {
      key: "content",
      title: "강의 내용",
      description: "강의 내용의 체계성, 명확성, 유용성을 평가해주세요",
    },
    {
      key: "teaching",
      title: "교수법",
      description: "강의 진행 방식, 설명 능력, 학생과의 소통을 평가해주세요",
    },
    {
      key: "materials",
      title: "강의 자료",
      description: "교재, PPT, 참고자료의 질과 활용도를 평가해주세요",
    },
    {
      key: "assignments",
      title: "과제 및 평가",
      description: "과제의 적절성, 피드백의 질을 평가해주세요",
    },
    {
      key: "overall",
      title: "전체적 만족도",
      description: "강의에 대한 전반적인 만족도를 평가해주세요",
    },
  ]

  const handleRatingChange = (item, rating) => {
    setRatings((prev) => ({
      ...prev,
      [item]: rating,
    }))
  }

  const handleSubmit = async () => {
    // 모든 항목이 평가되었는지 확인
    const allRated = Object.values(ratings).every((rating) => rating > 0)
    if (!allRated) {
      alert("모든 항목을 평가해주세요.")
      return
    }

    setIsSubmitting(true)

    try {
      // 실제로는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("설문 평가가 완료되었습니다. 소중한 의견 감사합니다!")
      history.push("/student/survey")
    } catch {
      alert("설문 제출 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ rating, onRatingChange, disabled = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onRatingChange(star)}
            className={`p-1 transition-colors ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"}`}
            disabled={disabled}
          >
            <Star className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
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

            {/* 강의 정보 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: "#1abc9c" }} />
                  강의 평가
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{courseInfo.courseName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{courseInfo.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{courseInfo.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        출석: {courseInfo.attendedClasses}/{courseInfo.totalClasses}회
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 평가 항목들 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>강의 평가 항목</CardTitle>
                <p className="text-sm text-gray-600">
                  각 항목을 5점 척도로 평가해주세요 (1점: 매우 불만족, 5점: 매우 만족)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {evaluationItems.map((item) => (
                    <div key={item.key} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="ml-6">
                          <StarRating
                            rating={ratings[item.key]}
                            onRatingChange={(rating) => handleRatingChange(item.key, rating)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 자유 의견 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>자유 의견</CardTitle>
                <p className="text-sm text-gray-600">강의에 대한 건설적인 피드백을 작성해주세요 (선택사항)</p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="강의의 좋았던 점, 개선이 필요한 점, 제안사항 등을 자유롭게 작성해주세요..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* 제출 버튼 */}
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.values(ratings).some((rating) => rating === 0)}
                className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    제출 중...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    설문 제출
                  </>
                )}
              </Button>
            </div>

            {/* 안내사항 */}
            <Card className="mt-8">
              <CardContent className="p-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• 설문은 익명으로 처리되며, 강의 개선을 위한 목적으로만 사용됩니다.</p>
                  <p>• 한 번 제출한 설문은 수정할 수 없으니 신중하게 평가해주세요.</p>
                  <p>• 성의있는 평가와 피드백은 더 나은 강의를 만드는 데 큰 도움이 됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
