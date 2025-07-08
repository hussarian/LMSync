"use client"
import { useState } from "react"
import QuestionModal from "./QuestionModal"
import "../styles/EvaluationItems.css"

const EvaluationItems = ({ questions, setQuestions, templates, setTemplates }) => {
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [isTemplateMode, setIsTemplateMode] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
  })

  const handleAddQuestion = () => {
    setEditingQuestion(null)
    setShowQuestionModal(true)
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion(question)
    setShowQuestionModal(true)
  }

  const handleDeleteQuestion = (questionId) => {
    if (confirm("정말로 이 질문을 삭제하시겠습니까?")) {
      setQuestions(questions.filter((q) => q.id !== questionId))
    }
  }

  const handleSaveQuestion = (questionData) => {
    if (editingQuestion) {
      // 수정
      setQuestions(questions.map((q) => (q.id === editingQuestion.id ? { ...q, ...questionData } : q)))
    } else {
      // 추가
      const newQuestion = {
        id: Math.max(...questions.map((q) => q.id)) + 1,
        ...questionData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setQuestions([...questions, newQuestion])
    }
    setShowQuestionModal(false)
  }

  const handleTemplateMode = () => {
    setIsTemplateMode(!isTemplateMode)
    setSelectedQuestions([])
  }

  const handleQuestionSelect = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId))
    } else {
      setSelectedQuestions([...selectedQuestions, questionId])
    }
  }

  const handleCreateTemplate = () => {
    if (selectedQuestions.length === 0) {
      alert("최소 하나의 질문을 선택해주세요.")
      return
    }
    setShowTemplateForm(true)
  }

  const handleSaveTemplate = () => {
    if (!templateForm.name.trim()) {
      alert("템플릿 이름을 입력해주세요.")
      return
    }

    const newTemplate = {
      id: Math.max(...templates.map((t) => t.id), 0) + 1,
      name: templateForm.name,
      description: templateForm.description,
      questionIds: selectedQuestions,
      usedInCourses: [],
      createdAt: new Date().toISOString().split("T")[0],
      isActive: true,
    }

    setTemplates([...templates, newTemplate])
    setTemplateForm({ name: "", description: "" })
    setSelectedQuestions([])
    setIsTemplateMode(false)
    setShowTemplateForm(false)
    alert("템플릿이 생성되었습니다.")
  }

  const getQuestionTypeText = (type) => {
    switch (type) {
      case "rating":
        return "평점"
      case "text":
        return "서술형"
      case "choice":
        return "선택형"
      default:
        return type
    }
  }

  return (
    <div className="evaluation-items">
      <div className="evaluation-items-header">
        <h2>평가 항목 관리</h2>
        <p>강의 평가를 위한 질문들을 관리할 수 있습니다.</p>
      </div>

      <div className="items-controls">
        <div className="control-buttons">
          <button className="add-question-btn" onClick={handleAddQuestion}>
            + 질문 추가
          </button>
          <button className={`template-mode-btn ${isTemplateMode ? "active" : ""}`} onClick={handleTemplateMode}>
            {isTemplateMode ? "템플릿 모드 종료" : "템플릿 만들기"}
          </button>
          {isTemplateMode && selectedQuestions.length > 0 && (
            <button className="create-template-btn" onClick={handleCreateTemplate}>
              선택한 질문으로 템플릿 생성 ({selectedQuestions.length}개)
            </button>
          )}
        </div>
      </div>

      <div className="questions-list">
        {questions.map((question) => (
          <div key={question.id} className={`question-card ${isTemplateMode ? "template-mode" : ""}`}>
            {isTemplateMode && (
              <div className="question-checkbox">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleQuestionSelect(question.id)}
                />
              </div>
            )}
            <div className="question-content">
              <div className="question-header">
                <div className="question-info">
                  <span className="question-category">{question.category}</span>
                  <span className={`question-type ${question.type}`}>{getQuestionTypeText(question.type)}</span>
                  {question.required && <span className="required-badge">필수</span>}
                </div>
                {!isTemplateMode && (
                  <div className="question-actions">
                    <button className="edit-btn" onClick={() => handleEditQuestion(question)}>
                      수정
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteQuestion(question.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="question-text">{question.question}</div>
              <div className="question-meta">
                <span>생성일: {question.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>등록된 질문이 없습니다</h3>
          <p>새로운 평가 질문을 추가해보세요.</p>
        </div>
      )}

      {showQuestionModal && (
        <QuestionModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onClose={() => setShowQuestionModal(false)}
        />
      )}

      {showTemplateForm && (
        <div className="template-form-overlay" onClick={() => setShowTemplateForm(false)}>
          <div className="template-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>새 템플릿 만들기</h3>
              <button onClick={() => setShowTemplateForm(false)}>✕</button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>템플릿 이름 *</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  placeholder="템플릿 이름을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label>설명</label>
                <textarea
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                  placeholder="템플릿에 대한 설명을 입력하세요"
                  rows={3}
                />
              </div>
              <div className="selected-questions">
                <h4>선택된 질문 ({selectedQuestions.length}개)</h4>
                <div className="selected-questions-list">
                  {selectedQuestions.map((questionId) => {
                    const question = questions.find((q) => q.id === questionId)
                    return (
                      <div key={questionId} className="selected-question-item">
                        <span className="question-category">{question.category}</span>
                        <span className="question-text">{question.question}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowTemplateForm(false)}>
                취소
              </button>
              <button className="save-btn" onClick={handleSaveTemplate}>
                템플릿 생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EvaluationItems
