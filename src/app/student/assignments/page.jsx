"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Clock, FileText, Download, Upload, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState([])
  const [filteredAssignments, setFilteredAssignments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // 샘플 과제 데이터
  useEffect(() => {
    const sampleAssignments = [
      {
        id: 1,
        title: "JavaScript 기초 문법 실습",
        subject: "웹 프로그래밍 기초",
        subjectCode: "WEB101",
        instructor: "김강사",
        dueDate: "2024-01-20",
        submittedDate: "2024-01-18",
        status: "submitted",
        score: 85,
        maxScore: 100,
        description: "JavaScript의 기본 문법을 활용한 간단한 프로그램 작성",
        attachments: ["assignment1.pdf"],
        submissionFile: "김학생_과제1.js",
      },
      {
        id: 2,
        title: "React 컴포넌트 설계",
        subject: "프론트엔드 개발",
        subjectCode: "FE201",
        instructor: "이강사",
        dueDate: "2024-01-25",
        submittedDate: null,
        status: "pending",
        score: null,
        maxScore: 100,
        description: "React를 사용하여 재사용 가능한 컴포넌트 설계 및 구현",
        attachments: ["react_guide.pdf", "component_template.zip"],
        submissionFile: null,
      },
      {
        id: 3,
        title: "데이터베이스 설계 과제",
        subject: "데이터베이스",
        subjectCode: "DB301",
        instructor: "박강사",
        dueDate: "2024-01-15",
        submittedDate: null,
        status: "overdue",
        score: null,
        maxScore: 100,
        description: "E-R 다이어그램을 활용한 데이터베이스 설계",
        attachments: ["db_requirements.pdf"],
        submissionFile: null,
      },
      {
        id: 4,
        title: "알고리즘 문제 해결",
        subject: "자료구조와 알고리즘",
        subjectCode: "CS201",
        instructor: "최강사",
        dueDate: "2024-01-30",
        submittedDate: null,
        status: "pending",
        score: null,
        maxScore: 100,
        description: "정렬 알고리즘을 구현하고 시간복잡도 분석",
        attachments: ["algorithm_problems.pdf"],
        submissionFile: null,
      },
      {
        id: 5,
        title: "웹 API 개발",
        subject: "백엔드 개발",
        subjectCode: "BE301",
        instructor: "정강사",
        dueDate: "2024-02-05",
        submittedDate: "2024-02-03",
        status: "submitted",
        score: 92,
        maxScore: 100,
        description: "RESTful API 설계 및 구현",
        attachments: ["api_spec.pdf"],
        submissionFile: "김학생_API프로젝트.zip",
      },
    ]

    setTimeout(() => {
      setAssignments(sampleAssignments)
      setFilteredAssignments(sampleAssignments)
      setIsLoading(false)
    }, 1000)
  }, [])

  // 검색 및 필터링
  useEffect(() => {
    let filtered = assignments

    if (searchTerm) {
      filtered = filtered.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((assignment) => assignment.status === statusFilter)
    }

    if (subjectFilter !== "all") {
      filtered = filtered.filter((assignment) => assignment.subjectCode === subjectFilter)
    }

    setFilteredAssignments(filtered)
  }, [searchTerm, statusFilter, subjectFilter, assignments])

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            제출완료
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            제출대기
          </span>
        )
      case "overdue":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            제출기한초과
          </span>
        )
      default:
        return null
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUniqueSubjects = () => {
    const subjects = [...new Set(assignments.map((assignment) => assignment.subjectCode))]
    return subjects
  }

  const handleFileUpload = (assignmentId) => {
    // 파일 업로드 로직
    console.log("파일 업로드:", assignmentId)
  }

  const handleDownloadAttachment = (filename) => {
    // 첨부파일 다운로드 로직
    console.log("첨부파일 다운로드:", filename)
  }

  const handleViewAssignmentDetail = (assignment) => {
    setSelectedAssignment(assignment)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedAssignment(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="my-assignment" userRole="student" userName="김학생" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">과제 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  // 통계 계산
  const totalAssignments = assignments.length
  const submittedAssignments = assignments.filter((a) => a.status === "submitted").length
  const pendingAssignments = assignments.filter((a) => a.status === "pending").length
  const overdueAssignments = assignments.filter((a) => a.status === "overdue").length
  const averageScore =
    assignments.filter((a) => a.score !== null).reduce((sum, a) => sum + a.score, 0) /
      assignments.filter((a) => a.score !== null).length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="my-assignment" userRole="student" userName="김학생" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">과제 관리</h1>
          <p className="text-gray-600 mt-2">수강중인 강의의 과제를 확인하고 제출하세요.</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">전체 과제</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">제출완료</p>
                <p className="text-2xl font-bold text-gray-900">{submittedAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">제출대기</p>
                <p className="text-2xl font-bold text-gray-900">{pendingAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">기한초과</p>
                <p className="text-2xl font-bold text-gray-900">{overdueAssignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">%</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">평균 점수</p>
                <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="과제명, 과목명, 강사명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 상태</option>
                <option value="pending">제출대기</option>
                <option value="submitted">제출완료</option>
                <option value="overdue">기한초과</option>
              </select>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">모든 과목</option>
                {getUniqueSubjects().map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 과제 목록 */}
        <div className="space-y-6">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">과제가 없습니다</h3>
              <p className="text-gray-600">검색 조건에 맞는 과제를 찾을 수 없습니다.</p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewAssignmentDetail(assignment)}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              {assignment.subject} ({assignment.subjectCode})
                            </span>
                            <span>담당: {assignment.instructor}</span>
                          </div>
                          <p className="text-gray-700 mb-4">{assignment.description}</p>
                        </div>
                        <div className="ml-4">{getStatusBadge(assignment.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>마감: {assignment.dueDate}</span>
                        </div>

                        {assignment.status === "pending" && (
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            <span
                              className={
                                getDaysUntilDue(assignment.dueDate) <= 3 ? "text-red-600 font-medium" : "text-gray-600"
                              }
                            >
                              {getDaysUntilDue(assignment.dueDate) > 0
                                ? `${getDaysUntilDue(assignment.dueDate)}일 남음`
                                : "기한 초과"}
                            </span>
                          </div>
                        )}

                        {assignment.submittedDate && (
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span>제출: {assignment.submittedDate}</span>
                          </div>
                        )}

                        {assignment.score !== null && (
                          <div className="flex items-center text-sm">
                            <span
                              className={`font-medium ${assignment.score >= 80 ? "text-green-600" : assignment.score >= 60 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              점수: {assignment.score}/{assignment.maxScore}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 첨부파일 */}
                      {assignment.attachments.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">첨부파일:</p>
                          <div className="flex flex-wrap gap-2">
                            {assignment.attachments.map((file, index) => (
                              <button
                                key={index}
                                onClick={() => handleDownloadAttachment(file)}
                                className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                {file}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 제출된 파일 */}
                      {assignment.submissionFile && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">제출한 파일:</p>
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-sm text-green-700">
                            <FileText className="w-3 h-3 mr-1" />
                            {assignment.submissionFile}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                      {(assignment.status === "pending" || assignment.status === "overdue") && (
                        <Button
                          onClick={() => handleFileUpload(assignment.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          파일 제출
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* 과제 상세보기 모달 */}
        {isDetailModalOpen && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">과제 상세정보</h2>
                  <button onClick={closeDetailModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* 과제 기본 정보 */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{selectedAssignment.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">과목:</span>
                      <span className="ml-2">
                        {selectedAssignment.subject} ({selectedAssignment.subjectCode})
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">담당교수:</span>
                      <span className="ml-2">{selectedAssignment.instructor}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">제출마감:</span>
                      <span className="ml-2">{selectedAssignment.dueDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">배점:</span>
                      <span className="ml-2">{selectedAssignment.maxScore}점</span>
                    </div>
                    {selectedAssignment.submittedDate && (
                      <div>
                        <span className="font-medium text-gray-600">제출일:</span>
                        <span className="ml-2">{selectedAssignment.submittedDate}</span>
                      </div>
                    )}
                    {selectedAssignment.score !== null && (
                      <div>
                        <span className="font-medium text-gray-600">점수:</span>
                        <span
                          className={`ml-2 font-medium ${selectedAssignment.score >= 80 ? "text-green-600" : selectedAssignment.score >= 60 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {selectedAssignment.score}/{selectedAssignment.maxScore}점
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">{getStatusBadge(selectedAssignment.status)}</div>
                </div>

                {/* 과제 설명 */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">과제 설명</h4>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedAssignment.description}</p>
                  </div>
                </div>

                {/* 과제 양식 파일 다운로드 */}
                {selectedAssignment.attachments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">과제 양식 및 첨부파일</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">강사가 제공한 파일</span>
                      </div>
                      <div className="space-y-2">
                        {selectedAssignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className="flex items-center">
                              <Download className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-gray-700">{file}</span>
                            </div>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadAttachment(file)
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              다운로드
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 제출한 파일 */}
                {selectedAssignment.submissionFile && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">제출한 파일</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-900 font-medium">{selectedAssignment.submissionFile}</span>
                        </div>
                        <span className="text-sm text-green-600">제출완료</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" onClick={closeDetailModal} className="px-6 bg-transparent">
                    닫기
                  </Button>

                  <div className="flex gap-3">
                    {(selectedAssignment.status === "pending" || selectedAssignment.status === "overdue") && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFileUpload(selectedAssignment.id)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        파일 제출
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
