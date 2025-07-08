"use client"
import { useState } from "react"
import "../styles/SubjectDetailModal.css"

const SubjectDetailModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    duration: "",
  })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content || !formData.duration) {
      alert("모든 항목을 입력해주세요.")
      return
    }

    onAdd(formData)
    setFormData({ title: "", content: "", duration: "" })
    onClose()
  }

  return (
    <div className="subject-detail-modal-overlay" onClick={onClose}>
      <div className="subject-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>세부 과목 생성</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label>세부 과목 제목 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="예: HTML 기초, CSS 스타일링"
              required
            />
          </div>

          <div className="form-group">
            <label>수업 시간 *</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="예: 8시간, 2주"
              required
            />
          </div>

          <div className="form-group">
            <label>세부 내용 *</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="이 세부 과목에서 다룰 내용을 상세히 설명하세요"
              rows="4"
              required
            />
          </div>

          <div className="modal-footer">
            <button type="submit" className="add-btn">
              추가
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubjectDetailModal
