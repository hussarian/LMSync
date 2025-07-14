"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export default function InstructorAssignmentsPage() {
  const [assignments, setAssignments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCourse, setFilterCourse] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [submissionForm, setSubmissionForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    course: "",
    attachments: [],
  })

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { key: "lectures", label: "담당 강의", href: "/instructor/courses/lectures" },
    { key: "assignments", label: "과제 리스트", href: "/instructor/courses/assignments" }, 
  ]

  // 샘플 과제 데이터
  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true)
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const sampleAssignments = [
        {
          id: 1,
          title: "웹 프로그래밍 기초 과제 1",
          description: "HTML과 CSS를 활용한 개인 포트폴리오 웹사이트 제작",
          courseName: "웹 프로그래밍 기초",
          courseCode: "WEB101",
          dueDate: "2024-01-20",
          submittedDate: "2024-01-15",
          status: "submitted",
          submissionCount: 28,
          totalStudents: 30,
          gradingStatus: "completed",
        },
        {
          id: 2,
          title: "데이터베이스 설계 프로젝트",
          description: "도서관 관리 시스템을 위한 ERD 설계 및 SQL 쿼리 작성",
          courseName: "데이터베이스 시스템",
          courseCode: "DB201",
          dueDate: "2024-01-25",
          submittedDate: "2024-01-22",
          status: "submitted",
          submissionCount: 25,
          totalStudents: 25,
          gradingStatus: "in_progress",
        },
        {
          id: 3,
          title: "알고리즘 분석 보고서",
          description: "정렬 알고리즘의 시간 복잡도 분석 및 성능 비교 보고서",
          courseName: "자료구조와 알고리즘",
          courseCode: "ALG301",
          dueDate: "2024-02-01",
          submittedDate: null,
          status: "pending",
          submissionCount: 0,
          totalStudents: 22,
          gradingStatus: "not_started",
        },
        {
          id: 4,
          title: "모바일 앱 개발 과제",
          description: "React Native를 사용한 간단한 할 일 관리 앱 개발",
          courseName: "모바일 프로그래밍",
          courseCode: "MOB401",
          dueDate: "2024-01-30",
          submittedDate: "2024-01-28",
          status: "submitted",
          submissionCount: 18,
          totalStudents: 20,
          gradingStatus: "completed",
        },
        {
          id: 5,
          title: "네트워크 보안 분석",
          description: "실제 네트워크 환경에서의 보안 취약점 분석 및 대응 방안 제시",
          courseName: "네트워크 보안",
          courseCode: "SEC501",
          dueDate: "2024-02-05",
          submittedDate: null,
          status: "draft",
          submissionCount: 0,
          totalStudents: 15,
          gradingStatus: "not_started",
        },
      ]

      setAssignments(sampleAssignments)
      setLoading(false)
    }

    fetchAssignments()
  }, [])

  // 필터링된 과제 목록
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus
    const matchesCourse = filterCourse === "all" || assignment.courseCode === filterCourse

    return matchesSearch && matchesStatus && matchesCourse
  })

  // 통계 계산
  const stats = {
    total: assignments.length,
    submitted: assignments.filter((a) => a.status === "submitted").length,
    pending: assignments.filter((a) => a.status === "pending").length,
    draft: assignments.filter((a) => a.status === "draft").length,
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800 border-green-200">제출 완료</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">제출 대기</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">임시 저장</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">알 수 없음</Badge>
    }
  }

  const getGradingStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">채점 완료</Badge>
      case "in_progress":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">채점 중</Badge>
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">채점 대기</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">-</Badge>
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <PageLayout title="과제 리스트" sidebarItems={sidebarItems} currentPath="/instructor/courses/assignments">
      <div className="space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 과제 수</p>
                <p className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                  {stats.total}
                </p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">제출 완료</p>
                <p className="text-2xl font-bold text-green-600">{stats.submitted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">제출 대기</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">임시 저장</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="과제명, 설명, 과정명으로 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">모든 상태</option>
                <option value="submitted">제출 완료</option>
                <option value="pending">제출 대기</option>
                <option value="draft">임시 저장</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="all">모든 과정</option>
                <option value="WEB101">웹 프로그래밍 기초</option>
                <option value="DB201">데이터베이스 시스템</option>
                <option value="ALG301">자료구조와 알고리즘</option>
                <option value="MOB401">모바일 프로그래밍</option>
                <option value="SEC501">네트워크 보안</option>
              </select>
            </div>
          </div>
        </div>

        {/* 과제 목록 */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                과제 목록 ({filteredAssignments.length}개)
              </h3>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSubmissionModal(true)}>
                <Plus className="w-4 h-4 mr-2" />새 과제 등록
              </Button>
            </div>
          </div>

          {filteredAssignments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">과제가 없습니다</h3>
              <p className="text-gray-500">검색 조건을 변경하거나 새로운 과제를 등록해보세요.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      과제 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      과정
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제출 마감일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제출일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제출 현황
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      채점 상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{assignment.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{assignment.courseName}</div>
                        <div className="text-sm text-gray-500">{assignment.courseCode}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(assignment.dueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {assignment.submittedDate ? formatDate(assignment.submittedDate) : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(assignment.status)}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {assignment.submissionCount}/{assignment.totalStudents}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getGradingStatusBadge(assignment.gradingStatus)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/instructor/courses/assignments/${assignment.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                            >
                              상세보기
                            </Button>
                          </Link>
                          {assignment.status === "submitted" && assignment.gradingStatus !== "completed" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
          )}
        </div>

        {/* 안내사항 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">과제 관리 안내</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>과제 제출 마감일이 지나면 자동으로 상태가 변경됩니다.</li>
                  <li>학생들의 과제 제출 현황을 실시간으로 확인할 수 있습니다.</li>
                  <li>채점이 완료된 과제는 학생들에게 자동으로 결과가 전달됩니다.</li>
                  <li>과제별 상세 통계 및 분석 자료를 확인할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 과제 제출 모달 */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold" style={{ color: "#2C3E50" }}>
                  새 과제 등록
                </h2>
                <button onClick={() => setShowSubmissionModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form className="p-6 space-y-6">
              {/* 과제명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  과제명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="과제명을 입력하세요"
                  value={submissionForm.title}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, title: e.target.value })}
                />
              </div>

              {/* 과정 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  과정 선택 <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={submissionForm.course}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, course: e.target.value })}
                >
                  <option value="">과정을 선택하세요</option>
                  <option value="WEB101">웹 프로그래밍 기초</option>
                  <option value="DB201">데이터베이스 시스템</option>
                  <option value="ALG301">자료구조와 알고리즘</option>
                  <option value="MOB401">모바일 프로그래밍</option>
                  <option value="SEC501">네트워크 보안</option>
                </select>
              </div>

              {/* 과제 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  과제 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="과제에 대한 상세한 설명을 입력하세요"
                  value={submissionForm.description}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, description: e.target.value })}
                />
              </div>

              {/* 제출 마감일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제출 마감일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={submissionForm.dueDate}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, dueDate: e.target.value })}
                />
              </div>

              {/* 파일 첨부 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">첨부 파일</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        파일을 드래그하거나 클릭하여 업로드
                      </span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF, DOC, DOCX 파일 (최대 10MB)</p>
                  </div>
                </div>
              </div>

              {/* 추가 옵션 */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="allow-late-submission"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allow-late-submission" className="ml-2 block text-sm text-gray-700">
                    지각 제출 허용
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="notify-students"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="notify-students" className="ml-2 block text-sm text-gray-700">
                    학생들에게 알림 발송
                  </label>
                </div>
              </div>
            </form>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSubmissionModal(false)}
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={(e) => {
                  e.preventDefault()
                  // 여기에 과제 등록 로직 추가
                  console.log("과제 등록:", submissionForm)
                  setShowSubmissionModal(false)
                  // 폼 초기화
                  setSubmissionForm({
                    title: "",
                    description: "",
                    dueDate: "",
                    course: "",
                    attachments: [],
                  })
                }}
              >
                과제 등록
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
