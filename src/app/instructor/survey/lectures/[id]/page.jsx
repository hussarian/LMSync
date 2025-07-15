"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Users, MessageSquare, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function SurveyLectureDetailPage({ params }) {
  const lectureId = params.id
  const [loading, setLoading] = useState(true)

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { key: "survey-lectures", label: "담당 강의 설문", href: "/instructor/survey/lectures" },
    { key: "survey-results", label: "설문 결과 분석", href: "/instructor/survey/results" },
    { key: "survey-history", label: "설문 이력", href: "/instructor/survey/history" },
  ]

  // TODO: API 연동 필요 - 강의 및 설문 상세 데이터 조회
  // TODO: 설문 리포트 PDF 다운로드 기능 구현
  // TODO: 설문 결과 차트 시각화 개선
  // TODO: 실시간 응답 업데이트 기능 추가
  // TODO: 설문 문항 관리 기능 추가
  const [lectureData, setLectureData] = useState(null)

  useEffect(() => {
    // TODO: 실제 API 호출로 교체
    const fetchLectureData = async () => {
      try {
        setLoading(true)
        // const response = await getLectureSurveyDetail(lectureId)
        // setLectureData(response.data)
        setLectureData(null) // 임시로 null 설정
      } catch (error) {
        console.error('강의 설문 데이터 조회 실패:', error)
        setLectureData(null)
      } finally {
        setLoading(false)
      }
    }

    if (lectureId) {
      fetchLectureData()
    }
  }, [lectureId])

  const goBack = () => {
    window.history.back()
  }

  const downloadReport = () => {
    // TODO: 실제 설문 결과 리포트 다운로드 로직 구현
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">설문 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!lectureData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="survey" userRole="instructor" userName="강사" />
        <div className="flex">
          <Sidebar title="설문 평가 관리" menuItems={sidebarItems} currentPath="/instructor/survey/lectures" />
          <main className="flex-1 p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={goBack} className="p-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">설문 상세</h1>
            </div>
            <EmptyState
              icon={MessageSquare}
              title="설문 데이터를 찾을 수 없습니다"
              description="요청하신 강의의 설문 데이터가 존재하지 않거나 아직 생성되지 않았습니다."
              action={{
                label: "설문 목록으로 돌아가기",
                onClick: () => (window.location.href = "/instructor/survey/lectures"),
              }}
            />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="survey" userRole="instructor" userName="강사" />
      <div className="flex">
        <Sidebar title="설문 평가 관리" menuItems={sidebarItems} currentPath="/instructor/survey/lectures" />

        <main className="flex-1 p-6">
          {/* 페이지 헤더 */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={goBack} className="p-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{lectureData?.name || "-"} 설문 상세</h1>
              <p className="text-gray-600 mt-1">
                {lectureData?.code || "-"} • {lectureData?.period || "-"} • {lectureData?.category || "-"}
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
                  {lectureData?.startDate || "-"} ~ {lectureData?.endDate || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">강의실</p>
                <p className="font-medium">{lectureData?.room || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">수강생</p>
                <p className="font-medium">{lectureData?.students || 0}명</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">강의 시간</p>
                <p className="font-medium">{lectureData?.schedule || "-"}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">강의 설명</p>
              <p className="text-gray-800 mt-1">{lectureData?.description || "-"}</p>
            </div>
          </div>

          {/* 설문 개요 */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{lectureData?.survey?.title || "설문 조사"}</h2>
                <p className="text-gray-600 mt-1">
                  설문 기간: {lectureData?.survey?.startDate || "-"} ~ {lectureData?.survey?.endDate || "-"}
                </p>
              </div>
              <Badge className={getStatusColor(lectureData?.survey?.status)}>{lectureData?.survey?.status || "-"}</Badge>
            </div>

            {/* 설문 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">응답률</p>
                    <p className="text-2xl font-bold text-blue-700">{lectureData?.survey?.responseRate || 0}%</p>
                    <p className="text-xs text-blue-600">
                      {lectureData?.survey?.responses || 0}/{lectureData?.students || 0}명
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">평균 만족도</p>
                    <p className="text-2xl font-bold text-green-700">{lectureData?.survey?.averageScore || 0}/5.0</p>
                    <p className="text-xs text-green-600">전체 평균</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">설문 문항</p>
                    <p className="text-2xl font-bold text-purple-700">{lectureData?.survey?.totalQuestions || 0}개</p>
                    <p className="text-xs text-purple-600">총 문항 수</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">자유 의견</p>
                    <p className="text-2xl font-bold text-orange-700">{lectureData?.survey?.comments?.length || 0}개</p>
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
            {lectureData?.survey?.questions?.length > 0 ? (
              <div className="space-y-6">
                {lectureData.survey.questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question || "-"}
                        </h3>
                        <p className={`text-lg font-bold ${getScoreColor(question.averageScore || 0)}`}>
                          평균: {question.averageScore || 0}/5.0
                        </p>
                      </div>
                    </div>

                    {/* 응답 분포 */}
                    <div className="space-y-2">
                      {question.responses?.map((response) => (
                        <div key={response.score} className="flex items-center gap-4">
                          <div className="w-12 text-sm text-gray-600">{response.score || 0}점</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                            <div
                              className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${response.percentage || 0}%` }}
                            >
                              {(response.percentage || 0) > 10 && (
                                <span className="text-white text-xs font-medium">{response.count || 0}명</span>
                              )}
                            </div>
                            {(response.percentage || 0) <= 10 && (response.count || 0) > 0 && (
                              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600">
                                {response.count || 0}명
                              </span>
                            )}
                          </div>
                          <div className="w-12 text-sm text-gray-600 text-right">{response.percentage || 0}%</div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">아직 설문 문항이 없습니다.</p>
              </div>
            )}
          </div>

          {/* 자유 의견 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">학생 자유 의견</h2>
            {lectureData?.survey?.comments?.length > 0 ? (
              <div className="space-y-4">
                {lectureData.survey.comments.map((comment) => (
                  <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{comment.student || "익명"}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (comment.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{comment.date || "-"}</span>
                    </div>
                    <p className="text-gray-700">{comment.comment || "-"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">아직 학생 의견이 없습니다.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
