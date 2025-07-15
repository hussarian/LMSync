"use client"

import { useState } from "react"
import { ArrowLeft, Users, MessageSquare, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function SurveyLectureDetailPage({ params }) {
  const lectureId = params.id

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { key: "survey-lectures", label: "담당 강의 설문", href: "/instructor/survey/lectures" },
    { key: "survey-results", label: "설문 결과 분석", href: "/instructor/survey/results" },
    { key: "survey-history", label: "설문 이력", href: "/instructor/survey/history" },
  ]

  // 강의 및 설문 상세 데이터
  const [lectureData] = useState({
    id: lectureId,
    code: "CS101",
    name: "JavaScript 기초",
    period: "2024-01학기",
    instructor: "김강사",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    students: 25,
    room: "A101",
    schedule: "월,수,금 09:00-12:00",
    category: "프로그래밍",
    description: "JavaScript의 기본 문법부터 DOM 조작까지 학습하는 기초 과정입니다.",

    // 설문 정보
    survey: {
      id: 1,
      title: "JavaScript 기초 강의 만족도 조사",
      startDate: "2024-03-10",
      endDate: "2024-03-20",
      status: "진행중",
      totalQuestions: 15,
      responses: 18,
      responseRate: 72,
      averageScore: 4.2,

      // 설문 문항별 결과
      questions: [
        {
          id: 1,
          type: "rating",
          question: "강의 내용의 이해도는 어떠셨나요?",
          averageScore: 4.3,
          responses: [
            { score: 5, count: 8, percentage: 44 },
            { score: 4, count: 6, percentage: 33 },
            { score: 3, count: 3, percentage: 17 },
            { score: 2, count: 1, percentage: 6 },
            { score: 1, count: 0, percentage: 0 },
          ],
        },
        {
          id: 2,
          type: "rating",
          question: "강사의 설명은 명확했나요?",
          averageScore: 4.5,
          responses: [
            { score: 5, count: 10, percentage: 56 },
            { score: 4, count: 5, percentage: 28 },
            { score: 3, count: 2, percentage: 11 },
            { score: 2, count: 1, percentage: 5 },
            { score: 1, count: 0, percentage: 0 },
          ],
        },
        {
          id: 3,
          type: "rating",
          question: "강의 진행 속도는 적절했나요?",
          averageScore: 3.9,
          responses: [
            { score: 5, count: 5, percentage: 28 },
            { score: 4, count: 7, percentage: 39 },
            { score: 3, count: 4, percentage: 22 },
            { score: 2, count: 2, percentage: 11 },
            { score: 1, count: 0, percentage: 0 },
          ],
        },
        {
          id: 4,
          type: "rating",
          question: "실습 시간은 충분했나요?",
          averageScore: 4.1,
          responses: [
            { score: 5, count: 7, percentage: 39 },
            { score: 4, count: 6, percentage: 33 },
            { score: 3, count: 3, percentage: 17 },
            { score: 2, count: 2, percentage: 11 },
            { score: 1, count: 0, percentage: 0 },
          ],
        },
        {
          id: 5,
          type: "rating",
          question: "전반적인 강의 만족도는?",
          averageScore: 4.2,
          responses: [
            { score: 5, count: 8, percentage: 44 },
            { score: 4, count: 6, percentage: 33 },
            { score: 3, count: 3, percentage: 17 },
            { score: 2, count: 1, percentage: 6 },
            { score: 1, count: 0, percentage: 0 },
          ],
        },
      ],

      // 자유 의견
      comments: [
        {
          id: 1,
          student: "학생A",
          date: "2024-03-15",
          comment: "실습 위주의 수업이라 이해하기 쉬웠습니다. 다만 진도가 조금 빨랐던 것 같아요.",
          rating: 4,
        },
        {
          id: 2,
          student: "학생B",
          date: "2024-03-16",
          comment: "강사님이 친절하게 설명해주셔서 좋았습니다. 더 많은 예제가 있으면 좋겠어요.",
          rating: 5,
        },
        {
          id: 3,
          student: "학생C",
          date: "2024-03-17",
          comment: "기초부터 차근차근 설명해주셔서 감사합니다. 과제 피드백도 상세해서 도움이 되었어요.",
          rating: 5,
        },
        {
          id: 4,
          student: "학생D",
          date: "2024-03-18",
          comment: "실습 환경 설정에 시간이 많이 걸렸어요. 미리 준비해두면 좋을 것 같습니다.",
          rating: 3,
        },
        {
          id: 5,
          student: "학생E",
          date: "2024-03-19",
          comment: "전반적으로 만족스러운 강의였습니다. 다음 심화 과정도 수강하고 싶어요.",
          rating: 4,
        },
      ],
    },
  })

  const goBack = () => {
    window.history.back()
  }

  const downloadReport = () => {
    // 설문 결과 리포트 다운로드 로직
    alert("설문 결과 리포트를 다운로드합니다.")
  }

  const getScoreColor = (score) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-blue-600"
    if (score >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

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
      <Header currentPage="survey" userRole="instructor" userName="김강사" />
      <div className="flex">
        <Sidebar title="설문 평가 관리" menuItems={sidebarItems} currentPath="/instructor/survey/lectures" />

        <main className="flex-1 p-6">
          {/* 페이지 헤더 */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={goBack} className="p-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{lectureData.name} 설문 상세</h1>
              <p className="text-gray-600 mt-1">
                {lectureData.code} • {lectureData.period} • {lectureData.category}
              </p>
            </div>
            <Button onClick={downloadReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              리포트 다운로드
            </Button>
          </div>

          {/* 강의 기본 정보 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">강의 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">강의 기간</p>
                <p className="font-medium">
                  {lectureData.startDate} ~ {lectureData.endDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">강의실</p>
                <p className="font-medium">{lectureData.room}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">수강생</p>
                <p className="font-medium">{lectureData.students}명</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">강의 시간</p>
                <p className="font-medium">{lectureData.schedule}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">강의 설명</p>
              <p className="text-gray-800 mt-1">{lectureData.description}</p>
            </div>
          </div>

          {/* 설문 개요 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{lectureData.survey.title}</h2>
                <p className="text-gray-600 mt-1">
                  설문 기간: {lectureData.survey.startDate} ~ {lectureData.survey.endDate}
                </p>
              </div>
              <Badge className={getStatusColor(lectureData.survey.status)}>{lectureData.survey.status}</Badge>
            </div>

            {/* 설문 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">응답률</p>
                    <p className="text-2xl font-bold text-blue-700">{lectureData.survey.responseRate}%</p>
                    <p className="text-xs text-blue-600">
                      {lectureData.survey.responses}/{lectureData.students}명
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">평균 만족도</p>
                    <p className="text-2xl font-bold text-green-700">{lectureData.survey.averageScore}/5.0</p>
                    <p className="text-xs text-green-600">전체 평균</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">설문 문항</p>
                    <p className="text-2xl font-bold text-purple-700">{lectureData.survey.totalQuestions}개</p>
                    <p className="text-xs text-purple-600">총 문항 수</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">자유 의견</p>
                    <p className="text-2xl font-bold text-orange-700">{lectureData.survey.comments.length}개</p>
                    <p className="text-xs text-orange-600">학생 피드백</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* 문항별 결과 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">문항별 설문 결과</h2>
            <div className="space-y-6">
              {lectureData.survey.questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </h3>
                      <p className={`text-lg font-bold ${getScoreColor(question.averageScore)}`}>
                        평균: {question.averageScore}/5.0
                      </p>
                    </div>
                  </div>

                  {/* 응답 분포 */}
                  <div className="space-y-2">
                    {question.responses.map((response) => (
                      <div key={response.score} className="flex items-center gap-4">
                        <div className="w-12 text-sm text-gray-600">{response.score}점</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${response.percentage}%` }}
                          >
                            {response.percentage > 10 && (
                              <span className="text-white text-xs font-medium">{response.count}명</span>
                            )}
                          </div>
                          {response.percentage <= 10 && response.count > 0 && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600">
                              {response.count}명
                            </span>
                          )}
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">{response.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 자유 의견 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">학생 자유 의견</h2>
            <div className="space-y-4">
              {lectureData.survey.comments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{comment.student}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
