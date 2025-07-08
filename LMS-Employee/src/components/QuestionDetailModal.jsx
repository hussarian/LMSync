"use client"
import { useState } from "react"
import "../styles/QuestionDetailModal.css"

const QuestionDetailModal = ({ subject, question, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState({
    title: question.title,
    type: question.type,
    difficulty: question.difficulty,
    points: question.points,
    content: question.content || "문제 내용이 여기에 표시됩니다.",
    options: question.options || ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
    correctAnswer: question.correctAnswer || "1",
    explanation: question.explanation || "정답 해설이 여기에 표시됩니다.",
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // 여기서 실제 저장 로직 구현
    console.log("문제 수정:", editedQuestion)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedQuestion({
      title: question.title,
      type: question.type,
      difficulty: question.difficulty,
      points: question.points,
      content: question.content || "문제 내용이 여기에 표시됩니다.",
      options: question.options || ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
      correctAnswer: question.correctAnswer || "1",
      explanation: question.explanation || "정답 해설이 여기에 표시됩니다.",
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm("정말로 이 문제를 삭제하시겠습니까?")) {
      // 여기서 실제 삭제 로직 구현
      console.log("문제 삭제:", question.id)
      onClose()
    }
  }

  const handleInputChange = (field, value) => {
    setEditedQuestion((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuestion.options]
    newOptions[index] = value
    setEditedQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "초급":
        return "beginner"
      case "중급":
        return "intermediate"
      case "고급":
        return "advanced"
      default:
        return ""
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "객관식":
        return "multiple-choice"
      case "주관식":
        return "short-answer"
      case "서술형":
        return "essay"
      case "코딩":
        return "coding"
      default:
        return ""
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="question-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h3>문제 상세 정보</h3>
            <p>
              {subject.name} - {subject.category}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="question-info">
            <div className="question-meta">
              <div className="meta-item">
                <label>문제 제목</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedQuestion.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                ) : (
                  <span>{editedQuestion.title}</span>
                )}
              </div>
              <div className="meta-row">
                <div className="meta-item">
                  <label>문제 유형</label>
                  {isEditing ? (
                    <select value={editedQuestion.type} onChange={(e) => handleInputChange("type", e.target.value)}>
                      <option value="객관식">객관식</option>
                      <option value="주관식">주관식</option>
                      <option value="서술형">서술형</option>
                      <option value="코딩">코딩</option>
                    </select>
                  ) : (
                    <span className={`type-badge ${getTypeColor(editedQuestion.type)}`}>{editedQuestion.type}</span>
                  )}
                </div>
                <div className="meta-item">
                  <label>난이도</label>
                  {isEditing ? (
                    <select
                      value={editedQuestion.difficulty}
                      onChange={(e) => handleInputChange("difficulty", e.target.value)}
                    >
                      <option value="초급">초급</option>
                      <option value="중급">중급</option>
                      <option value="고급">고급</option>
                    </select>
                  ) : (
                    <span className={`difficulty-badge ${getDifficultyColor(editedQuestion.difficulty)}`}>
                      {editedQuestion.difficulty}
                    </span>
                  )}
                </div>
                <div className="meta-item">
                  <label>배점</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedQuestion.points}
                      onChange={(e) => handleInputChange("points", Number.parseInt(e.target.value))}
                      min="1"
                      max="100"
                    />
                  ) : (
                    <span className="points">{editedQuestion.points}점</span>
                  )}
                </div>
              </div>
            </div>

            <div className="question-content">
              <label>문제 내용</label>
              {isEditing ? (
                <textarea
                  value={editedQuestion.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows="4"
                />
              ) : (
                <div className="content-display">{editedQuestion.content}</div>
              )}
            </div>

            {editedQuestion.type === "객관식" && (
              <div className="question-options">
                <label>선택지</label>
                <div className="options-list">
                  {editedQuestion.options.map((option, index) => (
                    <div key={index} className="option-item">
                      <span className="option-number">{index + 1}.</span>
                      {isEditing ? (
                        <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                      ) : (
                        <span
                          className={`option-text ${editedQuestion.correctAnswer === (index + 1).toString() ? "correct" : ""}`}
                        >
                          {option}
                          {editedQuestion.correctAnswer === (index + 1).toString() && (
                            <span className="correct-mark">✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="correct-answer">
                    <label>정답</label>
                    <select
                      value={editedQuestion.correctAnswer}
                      onChange={(e) => handleInputChange("correctAnswer", e.target.value)}
                    >
                      {editedQuestion.options.map((_, index) => (
                        <option key={index} value={(index + 1).toString()}>
                          {index + 1}번
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="question-explanation">
              <label>정답 해설</label>
              {isEditing ? (
                <textarea
                  value={editedQuestion.explanation}
                  onChange={(e) => handleInputChange("explanation", e.target.value)}
                  rows="3"
                />
              ) : (
                <div className="explanation-display">{editedQuestion.explanation}</div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={handleCancel}>
                취소
              </button>
              <button className="btn-primary" onClick={handleSave}>
                저장
              </button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={onClose}>
                닫기
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                삭제
              </button>
              <button className="btn-primary" onClick={handleEdit}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionDetailModal
