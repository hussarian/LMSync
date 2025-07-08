"use client"
import { useState } from "react"
import "../styles/AssignmentRegistrationModal.css"

const AssignmentRegistrationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    dueDate: "",
    description: "",
    attachments: [],
  })

  // 샘플 강의 목록
  const courses = ["웹 개발 기초 과정", "데이터베이스 관리 과정", "모바일 앱 개발"]

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files],
    })
  }

  const removeAttachment = (index) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index)
    setFormData({ ...formData, attachments: newAttachments })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.course || !formData.dueDate) {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    // 실제로는 서버에 저장
    console.log("과제 등록:", formData)
    alert("과제가 등록되었습니다.")
    onClose()
  }

  return (
    <div className="assignment-registration-overlay" onClick={onClose}>
      <div className="assignment-registration-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>과제 등록</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label>과제명 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="과제명을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label>강의 선택 *</label>
            <select value={formData.course} onChange={(e) => handleInputChange("course", e.target.value)} required>
              <option value="">강의를 선택하세요</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>제출 마감일 *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>과제 설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="과제에 대한 상세 설명을 입력하세요"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>첨부 파일</label>
            <div className="file-upload-area">
              <input type="file" multiple onChange={handleFileUpload} className="file-input" id="file-upload" />
              <label htmlFor="file-upload" className="file-upload-btn">
                파일 선택
              </label>
              <span className="file-upload-text">과제 양식 파일을 첨부하세요</span>
            </div>

            {formData.attachments.length > 0 && (
              <div className="attached-files">
                <h4>첨부된 파일:</h4>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="attached-file">
                    <span className="file-name">📎 {file.name}</span>
                    <button type="button" className="remove-file-btn" onClick={() => removeAttachment(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="submit" className="submit-btn">
              과제 등록
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

export default AssignmentRegistrationModal
