"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Download, FileText, Calendar, Users, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import PageLayout from "@/components/ui/page-layout"
import { Button } from "@/components/ui/button"

export default function AssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [assignment, setAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmissions, setSelectedSubmissions] = useState([])
  const [gradingModal, setGradingModal] = useState({ isOpen: false, submission: null })

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { key: "lectures", label: "담당 강의", href: "/instructor/courses/lectures" },
    { key: "assignments", label: "과제 리스트", href: "/instructor/courses/assignments" },
    { key: "grading", label: "채점", href: "/instructor/courses/grading" },
  ]

  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      setLoading(true)
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 빈 과제 상세 데이터
      const emptyAssignment = {
        id: Number.parseInt(params.id),
        title: "과제 정보 없음",
        description: "해당 과제의 정보를 찾을 수 없습니다.",
        courseName: "-",
        courseCode: "-",
        dueDate: null,
        createdDate: null,
        totalStudents: 0,
        submissionCount: 0,
        gradingStatus: "not_started",
        maxScore: 0,
        averageScore: 0,
        attachments: [],
      }

      // 빈 제출 현황 데이터
      const emptySubmissions = []

      setAssignment(emptyAssignment)
      setSubmissions(emptySubmissions)
      // 샘플 과제 상세 데이터
      const sampleAssignment = {
        id: Number.parseInt(params.id),
        title: "웹 프로그래밍 기초 과제 1",
        description:
          "HTML과 CSS를 활용한 개인 포트폴리오 웹사이트 제작\n\n요구사항:\n1. 반응형 디자인 적용\n2. 최소 3개 페이지 구성\n3. CSS Grid 또는 Flexbox 사용\n4. 개인 정보 및 포트폴리오 내용 포함",
        courseName: "웹 프로그래밍 기초",
        courseCode: "WEB101",
        dueDate: "2024-01-20T23:59:00",
        createdDate: "2024-01-10T09:00:00",
        totalStudents: 30,
        submissionCount: 28,
        gradingStatus: "completed",
        maxScore: 100,
        averageScore: 85.5,
        attachments: [
          { id: 1, name: "과제_요구사항.pdf", size: "2.5MB", type: "pdf" },
          { id: 2, name: "참고_템플릿.zip", size: "15.2MB", type: "zip" },
        ],
      }

      // 샘플 제출 현황 데이터
      const sampleSubmissions = [
        {
          id: 1,
          studentId: "2024001",
          studentName: "김철수",
          email: "kim@example.com",
          submittedAt: "2024-01-18T14:30:00",
          status: "submitted",
          score: 92,
          graded: true,
          files: [
            { id: 1, name: "portfolio_김철수.zip", size: "8.5MB", type: "zip" },
            { id: 2, name: "README.txt", size: "1.2KB", type: "txt" },
          ],
          feedback: "전반적으로 우수한 작품입니다. 반응형 디자인이 잘 구현되었습니다.",
        },
        {
          id: 2,
          studentId: "2024002",
          studentName: "이영희",
          email: "lee@example.com",
          submittedAt: "2024-01-19T16:45:00",
          status: "submitted",
          score: 88,
          graded: true,
          files: [{ id: 3, name: "my_portfolio.zip", size: "12.3MB", type: "zip" }],
          feedback: "창의적인 디자인이 돋보입니다. CSS 구조를 더 체계적으로 정리하면 좋겠습니다.",
        },
        {
          id: 3,
          studentId: "2024003",
          studentName: "박민수",
          email: "park@example.com",
          submittedAt: "2024-01-20T22:15:00",
          status: "submitted",
          score: null,
          graded: false,
          files: [
            { id: 4, name: "portfolio_final.zip", size: "6.8MB", type: "zip" },
            { id: 5, name: "설명서.docx", size: "245KB", type: "docx" },
          ],
          feedback: null,
        },
        {
          id: 4,
          studentId: "2024004",
          studentName: "정수진",
          email: "jung@example.com",
          submittedAt: null,
          status: "not_submitted",
          score: null,
          graded: false,
          files: [],
          feedback: null,
        },
        {
          id: 5,
          studentId: "2024005",
          studentName: "최동현",
          email: "choi@example.com",
          submittedAt: "2024-01-20T23:45:00",
          status: "late",
          score: 75,
          graded: true,
          files: [{ id: 6, name: "late_submission.zip", size: "4.2MB", type: "zip" }],
          feedback: "지각 제출이지만 기본 요구사항은 ��족했습니다.",
        },
      ]

      setAssignment(sampleAssignment)
      setSubmissions(sampleSubmissions)
      setLoading(false)
    }

    if (params.id) {
      fetchAssignmentDetail()
    }
  }, [params.id])

  const handleDownloadAll = () => {
    if (selectedSubmissions.length === 0) {
      alert("다운로드할 제출물을 선택해주세요.")
      return
    }
    console.log("Downloading selected submissions:", selectedSubmissions)
    // 여기에 일괄 다운로드 로직
  }

  const handleSelectSubmission = (submissionId) => {
    setSelectedSubmissions((prev) =>
      prev.includes(submissionId) ? prev.filter((id) => id !== submissionId) : [...prev, submissionId],
    )
  }

  const handleSelectAll = () => {
    const submittedIds = submissions.filter((s) => s.status !== "not_submitted").map((s) => s.id)
    setSelectedSubmissions(selectedSubmissions.length === submittedIds.length ? [] : submittedIds)
  }

  const handleOpenGradingModal = (submission) => {
    setGradingModal({ isOpen: true, submission })
  }

  const handleCloseGradingModal = () => {
    setGradingModal({ isOpen: false, submission: null })
  }

  const handleSubmitGrading = (submissionId, score, feedback) => {
    // 채점 저장 로직
    console.log("Grading submitted:", { submissionId, score, feedback })
    // 실제 API 호출 후 상태 업데이트
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === submissionId ? { ...sub, score, feedback, graded: true } : sub)),
    )
    handleCloseGradingModal()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!assignment) {
    return <div>과제를 찾을 수 없습니다.</div>
  }

  const submittedSubmissions = submissions.filter((s) => s.status !== "not_submitted")
  const notSubmittedCount = submissions.filter((s) => s.status === "not_submitted").length
  const lateSubmissionCount = submissions.filter((s) => s.status === "late").length

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">제출 완료</span>
        )
      case "late":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">지각</span>
      case "not_submitted":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">미제출</span>
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">알 수 없음</span>
        )
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />
      case "zip":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "txt":
        return <FileText className="w-4 h-4 text-gray-500" />
      case "docx":
        return <FileText className="w-4 h-4 text-blue-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const handleDownloadFile = (fileId, fileName) => {
    console.log(`Downloading file ${fileName} with id ${fileId}`)
    // 실제 파일 다운로드 로직
  }

  return (
    <PageLayout title="과제 상세보기" sidebarItems={sidebarItems} currentPath="/instructor/courses/assignments">
      <div className="space-y-6">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>뒤로가기</span>
          </Button>
        </div>

        {/* 과제 기본 정보 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{assignment.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {assignment.courseName} ({assignment.courseCode})
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  마감: {formatDate(assignment.dueDate)}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {assignment.submissionCount}/{assignment.totalStudents}명 제출
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">과제 설명</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">{assignment.description}</pre>
            </div>
          </div>

          {/* 첨부 파일 */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">첨부 파일</h3>
              <div className="space-y-2">
                {assignment.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadFile(file.id, file.name)}
                      className="flex items-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>다운로드</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 제출 현황 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 제출</p>
                <p className="text-2xl font-bold text-green-600">{assignment.submissionCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">미제출</p>
                <p className="text-2xl font-bold text-red-600">{notSubmittedCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">지각 제출</p>
                <p className="text-2xl font-bold text-yellow-600">{lateSubmissionCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평균 점수</p>
                <p className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                  {assignment.averageScore}점
                </p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 제출 현황 목록 */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                제출 현황 ({submissions.length}명)
              </h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleSelectAll} className="text-sm bg-transparent">
                  {selectedSubmissions.length === submittedSubmissions.length ? "전체 해제" : "전체 선택"}
                </Button>
                <Button
                  onClick={handleDownloadAll}
                  disabled={selectedSubmissions.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  선택 다운로드 ({selectedSubmissions.length})
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선택
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    학생 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제출일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    점수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제출 파일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {submission.status !== "not_submitted" && (
                        <input
                          type="checkbox"
                          checked={selectedSubmissions.includes(submission.id)}
                          onChange={() => handleSelectSubmission(submission.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                        <div className="text-sm text-gray-500">{submission.studentId}</div>
                        <div className="text-xs text-gray-400">{submission.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {submission.submittedAt ? formatDate(submission.submittedAt) : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(submission.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {submission.score !== null ? `${submission.score}점` : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {submission.files.length > 0 ? (
                        <div className="space-y-1">
                          {submission.files.map((file) => (
                            <div key={file.id} className="flex items-center space-x-2">
                              {getFileIcon(file.type)}
                              <span className="text-xs text-gray-600">{file.name}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownloadFile(file.id, file.name)}
                                className="h-6 w-6 p-0"
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">파일 없음</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {submission.status !== "not_submitted" && (
                          <>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <Eye className="w-3 h-3 mr-1" />
                              보기
                            </Button>
                            {!submission.graded && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-xs"
                                onClick={() => handleOpenGradingModal(submission)}
                              >
                                채점
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">과제 관리 안내</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>제출된 파일은 개별 다운로드 또는 일괄 다운로드가 가능합니다.</li>
                  <li>채점이 완료되지 않은 과제는 채점 버튼을 통해 점수를 입력할 수 있습니다.</li>
                  <li>학생별 피드백은 채점 완료 후 자동으로 전달됩니다.</li>
                  <li>지각 제출된 과제는 별도로 표시되며, 감점 정책을 적용할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* 채점 모달 */}
        {gradingModal.isOpen && (
          <GradingModal
            submission={gradingModal.submission}
            assignment={assignment}
            onClose={handleCloseGradingModal}
            onSubmit={handleSubmitGrading}
          />
        )}
      </div>
    </PageLayout>
  )
}

function GradingModal({ submission, assignment, onClose, onSubmit }) {
  const [score, setScore] = useState(submission.score || "")
  const [feedback, setFeedback] = useState(submission.feedback || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!score || score < 0 || score > assignment.maxScore) {
      alert(`점수는 0점에서 ${assignment.maxScore}점 사이여야 합니다.`)
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 시뮬레이션
    onSubmit(submission.id, Number(score), feedback)
    setLoading(false)
  }

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">제출 완료</span>
        )
      case "late":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">지각</span>
      case "not_submitted":
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">미제출</span>
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">알 수 없음</span>
        )
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />
      case "zip":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "txt":
        return <FileText className="w-4 h-4 text-gray-500" />
      case "docx":
        return <FileText className="w-4 h-4 text-blue-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const handleDownloadFile = (fileId, fileName) => {
    console.log(`Downloading file ${fileName} with id ${fileId}`)
    // 실제 파일 다운로드 로직
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">과제 채점</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 학생 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">학생 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">이름:</span>
                <span className="ml-2 font-medium">{submission.studentName}</span>
              </div>
              <div>
                <span className="text-gray-600">학번:</span>
                <span className="ml-2 font-medium">{submission.studentId}</span>
              </div>
              <div>
                <span className="text-gray-600">제출일:</span>
                <span className="ml-2 font-medium">
                  {submission.submittedAt ? formatDate(submission.submittedAt) : "-"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">상태:</span>
                <span className="ml-2">{getStatusBadge(submission.status)}</span>
              </div>
            </div>
          </div>

          {/* 제출 파일 */}
          {submission.files.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">제출 파일</h3>
              <div className="space-y-2">
                {submission.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadFile(file.id, file.name)}
                      className="flex items-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>다운로드</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 점수 입력 */}
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
              점수 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="score"
                min="0"
                max={assignment.maxScore}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="점수를 입력하세요"
                required
              />
              <span className="text-sm text-gray-600">/ {assignment.maxScore}점</span>
            </div>
          </div>

          {/* 피드백 입력 */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              피드백
            </label>
            <textarea
              id="feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="학생에게 전달할 피드백을 작성하세요..."
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              취소
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "저장 중..." : "채점 완료"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
