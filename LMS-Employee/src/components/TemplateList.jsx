"use client"
import { useState } from "react"
import TemplateDetail from "./TemplateDetail"
import "../styles/TemplateList.css"

const TemplateList = ({ templates, setTemplates, questions, courses }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [view, setView] = useState("list") // "list", "detail"

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template)
    setView("detail")
  }

  const handleBackToList = () => {
    setSelectedTemplate(null)
    setView("list")
  }

  const handleDeleteTemplate = (templateId) => {
    if (confirm("정말로 이 템플릿을 삭제하시겠습니까?")) {
      setTemplates(templates.filter((t) => t.id !== templateId))
    }
  }

  const handleToggleActive = (templateId) => {
    setTemplates(templates.map((t) => (t.id === templateId ? { ...t, isActive: !t.isActive } : t)))
  }

  if (view === "detail" && selectedTemplate) {
    return (
      <TemplateDetail template={selectedTemplate} questions={questions} courses={courses} onBack={handleBackToList} />
    )
  }

  return (
    <div className="template-list">
      <div className="template-list-header">
        <h2>템플릿 목록</h2>
        <p>생성된 평가 템플릿을 관리할 수 있습니다.</p>
      </div>

      <div className="template-stats">
        <div className="stat-card">
          <span className="stat-number">{templates.length}</span>
          <span className="stat-label">전체 템플릿</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{templates.filter((t) => t.isActive).length}</span>
          <span className="stat-label">활성 템플릿</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{templates.filter((t) => t.usedInCourses.length > 0).length}</span>
          <span className="stat-label">사용 중인 템플릿</span>
        </div>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className={`template-card ${!template.isActive ? "inactive" : ""}`}>
            <div className="template-header">
              <div className="template-info">
                <h3 onClick={() => handleTemplateClick(template)}>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              <div className="template-actions">
                <button
                  className={`toggle-btn ${template.isActive ? "active" : "inactive"}`}
                  onClick={() => handleToggleActive(template.id)}
                >
                  {template.isActive ? "활성" : "비활성"}
                </button>
                <button className="delete-btn" onClick={() => handleDeleteTemplate(template.id)}>
                  삭제
                </button>
              </div>
            </div>

            <div className="template-details">
              <div className="detail-item">
                <span className="label">질문 수:</span>
                <span className="value">{template.questionIds.length}개</span>
              </div>
              <div className="detail-item">
                <span className="label">사용 강의:</span>
                <span className="value">{template.usedInCourses.length}개</span>
              </div>
              <div className="detail-item">
                <span className="label">생성일:</span>
                <span className="value">{template.createdAt}</span>
              </div>
            </div>

            <div className="template-preview">
              <h4>포함된 질문 미리보기</h4>
              <div className="questions-preview">
                {template.questionIds.slice(0, 3).map((questionId) => {
                  const question = questions.find((q) => q.id === questionId)
                  return question ? (
                    <div key={questionId} className="preview-question">
                      <span className="question-category">{question.category}</span>
                      <span className="question-text">{question.question}</span>
                    </div>
                  ) : null
                })}
                {template.questionIds.length > 3 && (
                  <div className="more-questions">+{template.questionIds.length - 3}개 더</div>
                )}
              </div>
            </div>

            <button className="view-detail-btn" onClick={() => handleTemplateClick(template)}>
              상세보기
            </button>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>생성된 템플릿이 없습니다</h3>
          <p>평가 항목에서 질문을 선택하여 템플릿을 만들어보세요.</p>
        </div>
      )}
    </div>
  )
}

export default TemplateList
