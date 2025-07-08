"use client"
import { useState } from "react"
import "../styles/SubjectDetail.css"

const SubjectDetail = ({ subject, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...subject })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...subject })
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(subject.id)
    setShowDeleteConfirm(false)
  }

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...editData.details]
    newDetails[index] = { ...newDetails[index], [field]: value }
    setEditData({ ...editData, details: newDetails })
  }

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...editData.objectives]
    newObjectives[index] = value
    setEditData({ ...editData, objectives: newObjectives })
  }

  const addObjective = () => {
    setEditData({ ...editData, objectives: [...editData.objectives, ""] })
  }

  const removeObjective = (index) => {
    const newObjectives = editData.objectives.filter((_, i) => i !== index)
    setEditData({ ...editData, objectives: newObjectives })
  }

  return (
    <div className="subject-detail-overlay" onClick={onClose}>
      <div className="subject-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? "과목 수정" : "과목 상세정보"}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="subject-detail-info">
            <div className="info-section">
              <h3>기본 정보</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>과목명</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  ) : (
                    <span>{subject.name}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>카테고리</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    />
                  ) : (
                    <span>{subject.category}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>수업 시간</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                    />
                  ) : (
                    <span>{subject.duration}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>난이도</label>
                  {isEditing ? (
                    <select
                      value={editData.difficulty}
                      onChange={(e) => handleInputChange("difficulty", e.target.value)}
                    >
                      <option value="초급">초급</option>
                      <option value="중급">중급</option>
                      <option value="고급">고급</option>
                    </select>
                  ) : (
                    <span className={`difficulty-badge ${subject.difficulty}`}>{subject.difficulty}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>과목 설명</h3>
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows="3"
                />
              ) : (
                <p>{subject.description}</p>
              )}
            </div>

            <div className="info-section">
              <h3>세부 과목</h3>
              <div className="details-list">
                {(isEditing ? editData.details : subject.details).map((detail, index) => (
                  <div key={detail.id} className="detail-item">
                    <div className="detail-header">
                      <h4>
                        {isEditing ? (
                          <input
                            type="text"
                            value={detail.title}
                            onChange={(e) => handleDetailChange(index, "title", e.target.value)}
                          />
                        ) : (
                          detail.title
                        )}
                      </h4>
                      <span className="detail-duration">
                        {isEditing ? (
                          <input
                            type="text"
                            value={detail.duration}
                            onChange={(e) => handleDetailChange(index, "duration", e.target.value)}
                          />
                        ) : (
                          detail.duration
                        )}
                      </span>
                    </div>
                    <p>
                      {isEditing ? (
                        <textarea
                          value={detail.content}
                          onChange={(e) => handleDetailChange(index, "content", e.target.value)}
                          rows="2"
                        />
                      ) : (
                        detail.content
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>선수 과목</h3>
              <div className="prerequisites-list">
                {subject.prerequisites.length > 0 ? (
                  subject.prerequisites.map((prereq, index) => (
                    <span key={index} className="prerequisite-tag">
                      {prereq}
                    </span>
                  ))
                ) : (
                  <span className="no-prerequisites">선수 과목 없음</span>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>학습 목표</h3>
              <div className="objectives-list">
                {(isEditing ? editData.objectives : subject.objectives).map((objective, index) => (
                  <div key={index} className="objective-item">
                    {isEditing ? (
                      <div className="objective-edit">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        />
                        <button type="button" className="remove-objective" onClick={() => removeObjective(index)}>
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span>• {objective}</span>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button type="button" className="add-objective" onClick={addObjective}>
                    + 학습 목표 추가
                  </button>
                )}
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
              <h3>과목 삭제</h3>
              <p>'{subject.name}' 과목을 삭제하시겠습니까?</p>
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

export default SubjectDetail
