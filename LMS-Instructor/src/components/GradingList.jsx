"use client"
import { useState } from "react"
import GradingScreen from "./GradingScreen"
import "../styles/GradingList.css"

const GradingList = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showGradingScreen, setShowGradingScreen] = useState(false)

  // 채점 대상 과제 (모든 학생이 제출했거나 마감일이 지난 과제)
  const [gradingAssignments] = useState([
    {
      id: 1,
      title: "HTML/CSS 실습 과제",
      course: "웹 개발 기초 과정",
      dueDate: "2024-02-15",
      totalStudents: 15,
      submittedCount: 15,
      gradedCount: 10,
      status: "채점중",
      isOverdue: false,
      allSubmitted: true,
      submissions: [
        {
          studentId: 1,
          studentName: "김학생",
          submittedAt: "2024-02-10",
          fileName: "portfolio_kim.zip",
          score: 85,
          isGraded: true,
          feedback: "전반적으로 잘 작성되었습니다. CSS 스타일링이 깔끔합니다.",
        },
        {
          studentId: 2,
          studentName: "이학생",
          submittedAt: "2024-02-12",
          fileName: "portfolio_lee.zip",
          score: null,
          isGraded: false,
          feedback: "",
        },
        {
          studentId: 3,
          studentName: "박학생",
          submittedAt: "2024-02-14",
          fileName: "portfolio_park.zip",
          score: null,
          isGraded: false,
          feedback: "",
        },
      ],
    },
    {
      id: 2,
      title: "데이터베이스 설계",
      course: "데이터베이스 관리 과정",
      dueDate: "2024-01-30",
      totalStudents: 12,
      submittedCount: 12,
      gradedCount: 12,
      status: "채점완료",
      isOverdue: true,
      allSubmitted: true,
      submissions: [
        {
          studentId: 4,
          studentName: "최학생",
          submittedAt: "2024-01-28",
          fileName: "erd_choi.pdf",
          score: 88,
          isGraded: true,
          feedback: "ERD 설계가 논리적이고 정규화가 잘 되어있습니다.",
        },
        {
          studentId: 5,
          studentName: "정학생",
          submittedAt: "2024-01-29",
          fileName: "erd_jung.pdf",
          score: 95,
          isGraded: true,
          feedback: "완벽한 설계입니다. 제약조건까지 잘 고려되었습니다.",
        },
      ],
    },
    {
      id: 3,
      title: "JavaScript 프로젝트",
      course: "웹 개발 기초 과정",
      dueDate: "2024-03-01",
      totalStudents: 15,
      submittedCount: 10,
      gradedCount: 0,
      status: "마감",
      isOverdue: true,
      allSubmitted: false,
      submissions: [
        {
          studentId: 6,
          studentName: "강학생",
          submittedAt: "2024-02-28",
          fileName: "todolist_kang.zip",
          score: null,
          isGraded: false,
          feedback: "",
        },
        {
          studentId: 7,
          studentName: "윤학생",
          submittedAt: "2024-02-27",
          fileName: "todolist_yoon.zip",
          score: null,
          isGraded: false,
          feedback: "",
        },
      ],
    },
  ])

  const handleStartGrading = (assignment) => {
    setSelectedAssignment(assignment)
    setShowGradingScreen(true)
  }

  const handleCloseGrading = () => {
    setShowGradingScreen(false)
    setSelectedAssignment(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "채점중":
        return "grading"
      case "채점완료":
        return "completed"
      case "마감":
        return "closed"
      default:
        return ""
    }
  }

  const getGradingProgress = (assignment) => {
    return Math.round((assignment.gradedCount / assignment.submittedCount) * 100)
  }

  if (showGradingScreen && selectedAssignment) {
    return <GradingScreen assignment={selectedAssignment} onClose={handleCloseGrading} />
  }

  return (
    <div className="grading-list">
      <div className="grading-list-header">
        <h2>채점</h2>
        <p>제출이 완료된 과제의 채점을 진행할 수 있습니다.</p>
      </div>

      <div className="grading-stats">
        <div className="stat-item">
          <span className="stat-number">{gradingAssignments.length}</span>
          <span className="stat-label">채점 대상</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{gradingAssignments.filter((a) => a.status === "채점중").length}</span>
          <span className="stat-label">채점중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{gradingAssignments.filter((a) => a.status === "채점완료").length}</span>
          <span className="stat-label">채점완료</span>
        </div>
      </div>

      <div className="grading-assignments">
        {gradingAssignments.map((assignment) => (
          <div key={assignment.id} className="grading-card">
            <div className="assignment-info">
              <div className="assignment-header">
                <h3>{assignment.title}</h3>
                <span className={`assignment-status ${getStatusColor(assignment.status)}`}>{assignment.status}</span>
              </div>
              <div className="assignment-meta">
                <span className="course-name">{assignment.course}</span>
                <span className="due-date">마감: {assignment.dueDate}</span>
                <span className="submission-info">
                  제출: {assignment.submittedCount}/{assignment.totalStudents}명
                </span>
              </div>
              <div className="completion-reason">
                {assignment.allSubmitted ? (
                  <span className="reason all-submitted">✓ 모든 학생 제출 완료</span>
                ) : assignment.isOverdue ? (
                  <span className="reason overdue">⏰ 제출 기한 만료</span>
                ) : null}
              </div>
            </div>

            <div className="grading-progress">
              <div className="progress-info">
                <span>채점 진행률</span>
                <span>
                  {assignment.gradedCount}/{assignment.submittedCount} ({getGradingProgress(assignment)}%)
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${getGradingProgress(assignment)}%` }}></div>
              </div>
            </div>

            <div className="grading-actions">
              {assignment.status === "채점완료" ? (
                <button className="view-results-btn">결과 보기</button>
              ) : (
                <button className="start-grading-btn" onClick={() => handleStartGrading(assignment)}>
                  채점 시작
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {gradingAssignments.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>채점할 과제가 없습니다</h3>
          <p>모든 학생이 제출하거나 마감일이 지난 과제가 여기에 표시됩니다.</p>
        </div>
      )}
    </div>
  )
}

export default GradingList
