"use client"
import { useState } from "react"
import "../styles/CourseDetail.css"

const CourseDetail = ({ course, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...course })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...course })
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(course.id)
    setShowDeleteConfirm(false)
  }

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  return (
    <div className="course-detail-overlay" onClick={onClose}>
      <div className="course-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? "과정 수정" : "과정 상세정보"}</h2>
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
                  <label>과정명</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  ) : (
                    <span>{course.name}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>담당 강사</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.instructor}
                      onChange={(e) => handleInputChange("instructor", e.target.value)}
                    />
                  ) : (
                    <span>{course.instructor}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>개강일</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                    />
                  ) : (
                    <span>{course.startDate}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>종강일</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                    />
                  ) : (
                    <span>{course.endDate}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>강의실</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.classroom}
                      onChange={(e) => handleInputChange("classroom", e.target.value)}
                    />
                  ) : (
                    <span>{course.classroom}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>강의 시간</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.schedule}
                      onChange={(e) => handleInputChange("schedule", e.target.value)}
                    />
                  ) : (
                    <span>{course.schedule}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>최소 인원</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.minStudents}
                      onChange={(e) => handleInputChange("minStudents", Number.parseInt(e.target.value))}
                    />
                  ) : (
                    <span>{course.minStudents}명</span>
                  )}
                </div>

                <div className="info-item">
                  <label>최대 인원</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.maxStudents}
                      onChange={(e) => handleInputChange("maxStudents", Number.parseInt(e.target.value))}
                    />
                  ) : (
                    <span>{course.maxStudents}명</span>
                  )}
                </div>

                <div className="info-item">
                  <label>현재 수강생</label>
                  <span>{course.currentStudents}명</span>
                </div>

                <div className="info-item">
                  <label>상태</label>
                  {isEditing ? (
                    <select value={editData.status} onChange={(e) => handleInputChange("status", e.target.value)}>
                      <option value="모집중">모집중</option>
                      <option value="진행중">진행중</option>
                      <option value="완료">완료</option>
                      <option value="대기">대기</option>
                    </select>
                  ) : (
                    <span className={`status-badge ${course.status}`}>{course.status}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>과정 설명</h3>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows="4"
                />
              ) : (
                <p>{course.description}</p>
              )}
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
          {isEditing ? (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                저장
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                취소
              </button>
            </div>
          ) : (
            <div className="view-actions">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                삭제
              </button>
            </div>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="delete-confirm-overlay">
            <div className="delete-confirm-modal">
              <h3>과정 삭제</h3>
              <p>'{course.name}' 과정을 삭제하시겠습니까?</p>
              <p className="warning">이 작업은 되돌릴 수 없습니다.</p>
              <div className="confirm-actions">
                <button className="confirm-delete-btn" onClick={handleDelete}>
                  삭제
                </button>
                <button className="cancel-delete-btn" onClick={() => setShowDeleteConfirm(false)}>
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetail
