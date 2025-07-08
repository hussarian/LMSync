"use client"
import { useState } from "react"
import AssignmentRegistrationModal from "./AssignmentRegistrationModal"
import AssignmentStatisticsModal from "./AssignmentStatisticsModal"
import "../styles/AssignmentList.css"

const AssignmentList = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showStatisticsModal, setShowStatisticsModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [expandedAssignment, setExpandedAssignment] = useState(null)
  const [courseFilter, setCourseFilter] = useState("전체")
  const [statusFilter, setStatusFilter] = useState("전체")

  // 샘플 과제 데이터
  const [assignments] = useState([
    {
      id: 1,
      title: "HTML/CSS 실습 과제",
      course: "웹 개발 기초 과정",
      dueDate: "2024-02-15",
      status: "진행중",
      totalStudents: 15,
      submittedCount: 12,
      description: "개인 포트폴리오 웹사이트 제작",
      attachments: ["assignment_template.zip"],
      submissions: [
        { studentId: 1, studentName: "김학생", submittedAt: "2024-02-10", fileName: "portfolio_kim.zip", score: 85 },
        { studentId: 2, studentName: "이학생", submittedAt: "2024-02-12", fileName: "portfolio_lee.zip", score: 92 },
        { studentId: 3, studentName: "박학생", submittedAt: "2024-02-14", fileName: "portfolio_park.zip", score: 78 },
      ],
    },
    {
      id: 2,
      title: "JavaScript 프로젝트",
      course: "웹 개발 기초 과정",
      dueDate: "2024-03-01",
      status: "진행중",
      totalStudents: 15,
      submittedCount: 8,
      description: "To-Do List 애플리케이션 개발",
      attachments: ["js_project_guide.pdf"],
      submissions: [
        { studentId: 1, studentName: "김학생", submittedAt: "2024-02-28", fileName: "todolist_kim.zip", score: null },
        { studentId: 2, studentName: "이학생", submittedAt: "2024-02-27", fileName: "todolist_lee.zip", score: null },
      ],
    },
    {
      id: 3,
      title: "데이터베이스 설계",
      course: "데이터베이스 관리 과정",
      dueDate: "2024-01-30",
      status: "완료",
      totalStudents: 12,
      submittedCount: 12,
      description: "쇼핑몰 데이터베이스 ERD 설계",
      attachments: ["db_design_template.docx"],
      submissions: [
        { studentId: 4, studentName: "최학생", submittedAt: "2024-01-28", fileName: "erd_choi.pdf", score: 88 },
        { studentId: 5, studentName: "정학생", submittedAt: "2024-01-29", fileName: "erd_jung.pdf", score: 95 },
      ],
    },
  ])

  const courses = ["전체", "웹 개발 기초 과정", "데이터베이스 관리 과정"]

  const handleToggleExpand = (assignmentId) => {
    setExpandedAssignment(expandedAssignment === assignmentId ? null : assignmentId)
  }

  const handleDownloadSubmission = (submission) => {
    // 실제로는 파일 다운로드 로직
    console.log("파일 다운로드:", submission.fileName)
    alert(`${submission.fileName} 다운로드를 시작합니다.`)
  }

  const handleShowStatistics = (assignment) => {
    setSelectedAssignment(assignment)
    setShowStatisticsModal(true)
  }

  const getFilteredAssignments = () => {
    return assignments.filter((assignment) => {
      const matchesCourse = courseFilter === "전체" || assignment.course === courseFilter
      const matchesStatus = statusFilter === "전체" || assignment.status === statusFilter
      return matchesCourse && matchesStatus
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "active"
      case "완료":
        return "completed"
      case "마감":
        return "closed"
      default:
        return ""
    }
  }

  const filteredAssignments = getFilteredAssignments()

  return (
    <div className="assignment-list">
      <div className="assignment-list-header">
        <h2>과제 리스트</h2>
        <button className="register-btn" onClick={() => setShowRegistrationModal(true)}>
          과제 등록
        </button>
      </div>

      <div className="assignment-filters">
        <div className="filter-group">
          <label>강의</label>
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>상태</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="전체">전체</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
            <option value="마감">마감</option>
          </select>
        </div>
      </div>

      <div className="assignment-stats">
        <div className="stat-item">
          <span className="stat-number">{assignments.length}</span>
          <span className="stat-label">전체 과제</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{assignments.filter((a) => a.status === "진행중").length}</span>
          <span className="stat-label">진행중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{assignments.reduce((sum, a) => sum + a.submittedCount, 0)}</span>
          <span className="stat-label">총 제출</span>
        </div>
      </div>

      <div className="assignments-list">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header" onClick={() => handleToggleExpand(assignment.id)}>
              <div className="assignment-info">
                <h3>{assignment.title}</h3>
                <div className="assignment-meta">
                  <span className="course-name">{assignment.course}</span>
                  <span className="due-date">마감: {assignment.dueDate}</span>
                  <span className={`assignment-status ${getStatusColor(assignment.status)}`}>{assignment.status}</span>
                </div>
              </div>
              <div className="assignment-progress">
                <span className="progress-text">
                  {assignment.submittedCount}/{assignment.totalStudents} 제출
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(assignment.submittedCount / assignment.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button className="expand-btn">{expandedAssignment === assignment.id ? "▲" : "▼"}</button>
            </div>

            {expandedAssignment === assignment.id && (
              <div className="assignment-details">
                <div className="details-section">
                  <h4>과제 설명</h4>
                  <p>{assignment.description}</p>
                </div>

                <div className="details-section">
                  <h4>첨부 파일</h4>
                  <div className="attachments">
                    {assignment.attachments.map((file, index) => (
                      <span key={index} className="attachment-file">
                        📎 {file}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <div className="section-header">
                    <h4>제출 현황</h4>
                    <button className="statistics-btn" onClick={() => handleShowStatistics(assignment)}>
                      통계
                    </button>
                  </div>
                  <div className="submissions-table">
                    <div className="table-header">
                      <span>학생명</span>
                      <span>제출일</span>
                      <span>파일명</span>
                      <span>점수</span>
                      <span>다운로드</span>
                    </div>
                    {assignment.submissions.map((submission) => (
                      <div key={submission.studentId} className="table-row">
                        <span>{submission.studentName}</span>
                        <span>{submission.submittedAt}</span>
                        <span>{submission.fileName}</span>
                        <span>{submission.score || "미채점"}</span>
                        <button className="download-btn" onClick={() => handleDownloadSubmission(submission)}>
                          다운로드
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>조건에 맞는 과제가 없습니다</h3>
          <p>필터 조건을 변경하거나 새로운 과제를 등록해보세요.</p>
        </div>
      )}

      {showRegistrationModal && <AssignmentRegistrationModal onClose={() => setShowRegistrationModal(false)} />}

      {showStatisticsModal && selectedAssignment && (
        <AssignmentStatisticsModal assignment={selectedAssignment} onClose={() => setShowStatisticsModal(false)} />
      )}
    </div>
  )
}

export default AssignmentList
