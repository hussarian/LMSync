"use client"
import { useState, useEffect } from "react"
import "../styles/QuestionModal.css"

const QuestionModal = ({ question, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    question: "",
    type: "rating",
    category: "",
    required: false,
    options: [],
  })

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question || "",
        type: question.type || "rating",
        category: question.category || "",
        required: question.required || false,
        options: question.options || [],
      })
    }
  }, [question])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.question.trim()) {
      alert("질문을 입력해주세요.")
      return
    }
    if (!formData.category.trim()) {
      alert("카테고리를 입력해주세요.")
      return
    }
    onSave(formData)
  }

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, ""],
    })
  }

  const handleRemoveOption = (index) => {
    setFormData({
      ...formData,
      options: formData.options.filter((_, i) => i !== index),
    })
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({
      ...formData,
      options: newOptions,
    })
  }

  return (
    <div className="question-modal-overlay" onClick={onClose}>
      <div className="question-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{question ? "질문 수정" : "새 질문 추가"}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group">
            <label>질문 *</label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="평가 질문을 입력하세요"
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>카테고리 *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="예: 강의 내용, 강사, 환경 등"
                required
              />
            </div>
            <div className="form-group">
              <label>질문 유형</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="rating">평점 (1-5점)</option>
                <option value="text">서술형</option>
                <option value="choice">선택형</option>
              </select>
            </div>
          </div>

          {formData.type === "choice" && (
            <div className="form-group">
              <label>선택 옵션</label>
              <div className="options-container">
                {formData.options.map((option, index) => (
                  <div key={index} className="option-item">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`옵션 ${index + 1}`}
                    />
                    <button type="button" onClick={() => handleRemoveOption(index)} className="remove-option-btn">
                      ✕
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddOption} className="add-option-btn">
                  + 옵션 추가
                </button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.required}
                onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
              />
              필수 질문
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-btn">
              {question ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionModal
