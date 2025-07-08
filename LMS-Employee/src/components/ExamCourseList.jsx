"use client"
import { useState } from "react"
import SubjectScoreModal from "./SubjectScoreModal"
import "../styles/ExamCourseList.css"

const ExamCourseList = ({ courses }) => {
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [showScoreModal, setShowScoreModal] = useState(false)

  const handleCourseToggle = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const handleSubjectClick = (course, subject) => {
    setSelectedSubject({ course, subject })
    setShowScoreModal(true)
  }

  const handleCloseModal = () => {
    setShowScoreModal(false)
    setSelectedSubject(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "active"
      case "모집중":
        return "recruiting"
      case "완료":
        return "completed"
      case "대기":
        return "waiting"
      default:
        return ""
    }
  }

  return (
    <div className="exam-course-list">
      <div className="course-list-header">
        <h2>과정별 시험 현황</h2>
        <p>각 과정의 시험 현황과 성적을 확인할 수 있습니다.</p>
      </div>

      <div className="course-stats">
        <div className="stat-item">
          <span className="stat-number">{courses.length}</span>
          <span className="stat-label">전체 과정</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.reduce((sum, c) => sum + c.totalExams, 0)}</span>
          <span className="stat-label">총 시험 수</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.reduce((sum, c) => sum + c.subjects.length, 0)}</span>
          <span className="stat-label">총 과목 수</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Math.round(
              courses.reduce((sum, c) => sum + c.subjects.reduce((subSum, s) => subSum + s.averageScore, 0), 0) /
                courses.reduce((sum, c) => sum + c.subjects.length, 0),
            )}
          </span>
          <span className="stat-label">전체 평균</span>
        </div>
      </div>

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-header" onClick={() => handleCourseToggle(course.id)}>
              <div className="course-info">
                <h3>{course.name}</h3>
                <div className="course-meta">
                  <span className="instructor">강사: {course.instructor}</span>
                  <span className="period">{course.period}</span>
                  <span className={`status ${getStatusColor(course.status)}`}>{course.status}</span>
                </div>
              </div>
              <div className="course-stats-summary">
                <div className="stat-item">
                  <span className="stat-label">시험 수</span>
                  <span className="stat-value">{course.totalExams}개</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">과목 수</span>
                  <span className="stat-value">{course.subjects.length}개</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">평균 점수</span>
                  <span className="stat-value">
                    {Math.round(course.subjects.reduce((sum, s) => sum + s.averageScore, 0) / course.subjects.length)}점
                  </span>
                </div>
              </div>
              <div className="toggle-icon">{expandedCourse === course.id ? "▼" : "▶"}</div>
            </div>

            {expandedCourse === course.id && (
              <div className="subjects-list">
                <div className="subjects-header">
                  <h4>과목별 성적 현황</h4>
                </div>
                <div className="subjects-grid">
                  {course.subjects.map((subject) => (
                    <div key={subject.id} className="subject-card" onClick={() => handleSubjectClick(course, subject)}>
                      <div className="subject-header">
                        <h5>{subject.name}</h5>
                        <span className="exam-count">{subject.examCount}회 시험</span>
                      </div>
                      <div className="subject-score">
                        <span className="score-label">평균 점수</span>
                        <span className="score-value">{subject.averageScore}점</span>
                      </div>
                      <div className="subject-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${subject.averageScore}%` }}></div>
                        </div>
                      </div>
                      <div className="click-hint">클릭하여 상세 보기</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showScoreModal && selectedSubject && (
        <SubjectScoreModal
          course={selectedSubject.course}
          subject={selectedSubject.subject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ExamCourseList
