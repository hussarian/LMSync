"use client"
import { useState } from "react"
import SyllabusModal from "./SyllabusModal"
import "../styles/CourseDetailModal.css"

const CourseDetailModal = ({ course, onClose }) => {
  const [showSyllabusModal, setShowSyllabusModal] = useState(false)

  const handleSyllabusClick = () => {
    setShowSyllabusModal(true)
  }

  const handleCloseSyllabus = () => {
    setShowSyllabusModal(false)
  }

  return (
    <>
      <div className="course-detail-overlay" onClick={onClose}>
        <div className="course-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>강의 상세정보</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-content">
            <div className="course-detail-info">
              <div className="info-section">
                <h3>기본 정보</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>강의명</label>
                    <span>{course.name}</span>
                  </div>
                  <div className="info-item">
                    <label>개강일</label>
                    <span>{course.startDate}</span>
                  </div>
                  <div className="info-item">
                    <label>종강일</label>
                    <span>{course.endDate}</span>
                  </div>
                  <div className="info-item">
                    <label>강의실</label>
                    <span>{course.classroom}</span>
                  </div>
                  <div className="info-item">
                    <label>강의 시간</label>
                    <span>{course.schedule}</span>
                  </div>
                  <div className="info-item">
                    <label>수강생 수</label>
                    <span>{course.students}명</span>
                  </div>
                  <div className="info-item">
                    <label>상태</label>
                    <span className={`status-badge ${course.status}`}>{course.status}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>강의 설명</h3>
                <p>{course.description}</p>
              </div>

              <div className="info-section">
                <h3>포함 과목</h3>
                <div className="subjects-list">
                  {course.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="syllabus-btn" onClick={handleSyllabusClick}>
              강의 계획서
            </button>
          </div>
        </div>
      </div>

      {showSyllabusModal && <SyllabusModal course={course} onClose={handleCloseSyllabus} />}
    </>
  )
}

export default CourseDetailModal
