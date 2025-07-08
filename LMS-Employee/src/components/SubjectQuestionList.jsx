"use client"
import { useState } from "react"
import QuestionDetailModal from "./QuestionDetailModal"
import "../styles/SubjectQuestionList.css"

const SubjectQuestionList = ({ subjects }) => {
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("전체")
  const [instructorFilter, setInstructorFilter] = useState("전체")
  const [difficultyFilter, setDifficultyFilter] = useState("전체")

  const handleSubjectToggle = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
  }

  const handleQuestionClick = (subject, question) => {
    setSelectedQuestion({ subject, question })
    setShowQuestionModal(true)
  }

  const handleCloseModal = () => {
    setShowQuestionModal(false)
    setSelectedQuestion(null)
  }

  const getFilteredSubjects = () => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "전체" || subject.category === categoryFilter
      const matchesInstructor = instructorFilter === "전체" || subject.instructor === instructorFilter
      const matchesDifficulty = difficultyFilter === "전체" || subject.difficulty === difficultyFilter

      return matchesSearch && matchesCategory && matchesInstructor && matchesDifficulty
    })
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

  const getQuestionTypeColor = (type) => {
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

  const categories = [...new Set(subjects.map((s) => s.category))]
  const instructors = [...new Set(subjects.map((s) => s.instructor))]
  const filteredSubjects = getFilteredSubjects()

  return (
    <div className="subject-question-list">
      <div className="question-list-header">
        <h2>과목별 문제 관리</h2>
        <p>각 과목의 문제를 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="search-filters">
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="과목명 또는 강사명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>카테고리</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="전체">전체</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>강사</label>
            <select value={instructorFilter} onChange={(e) => setInstructorFilter(e.target.value)}>
              <option value="전체">전체</option>
              {instructors.map((instructor) => (
                <option key={instructor} value={instructor}>
                  {instructor}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>난이도</label>
            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
              <option value="전체">전체</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>
        </div>
      </div>

      <div className="question-stats">
        <div className="stat-item">
          <span className="stat-number">{filteredSubjects.length}</span>
          <span className="stat-label">과목 수</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredSubjects.reduce((sum, s) => sum + s.questions.length, 0)}</span>
          <span className="stat-label">총 문제 수</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredSubjects.reduce((sum, s) => sum + s.questions.filter((q) => q.difficulty === "초급").length, 0)}
          </span>
          <span className="stat-label">초급 문제</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredSubjects.reduce((sum, s) => sum + s.questions.filter((q) => q.difficulty === "중급").length, 0)}
          </span>
          <span className="stat-label">중급 문제</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredSubjects.reduce((sum, s) => sum + s.questions.filter((q) => q.difficulty === "고급").length, 0)}
          </span>
          <span className="stat-label">고급 문제</span>
        </div>
      </div>

      <div className="subjects-list">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="subject-item">
            <div className="subject-header" onClick={() => handleSubjectToggle(subject.id)}>
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <div className="subject-meta">
                  <span className="instructor">강사: {subject.instructor}</span>
                  <span className="category">{subject.category}</span>
                  <span className={`difficulty ${getDifficultyColor(subject.difficulty)}`}>{subject.difficulty}</span>
                </div>
              </div>
              <div className="subject-stats">
                <div className="stat-item">
                  <span className="stat-label">문제 수</span>
                  <span className="stat-value">{subject.questions.length}개</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">총 배점</span>
                  <span className="stat-value">{subject.questions.reduce((sum, q) => sum + q.points, 0)}점</span>
                </div>
              </div>
              <div className="toggle-icon">{expandedSubject === subject.id ? "▼" : "▶"}</div>
            </div>

            {expandedSubject === subject.id && (
              <div className="questions-list">
                <div className="questions-header">
                  <h4>문제 목록</h4>
                  <button className="btn-add-question">문제 추가</button>
                </div>
                <div className="questions-grid">
                  {subject.questions.map((question) => (
                    <div
                      key={question.id}
                      className="question-card"
                      onClick={() => handleQuestionClick(subject, question)}
                    >
                      <div className="question-header">
                        <h5>{question.title}</h5>
                        <div className="question-badges">
                          <span className={`type-badge ${getQuestionTypeColor(question.type)}`}>{question.type}</span>
                          <span className={`difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="question-info">
                        <div className="question-points">
                          <span className="points-label">배점</span>
                          <span className="points-value">{question.points}점</span>
                        </div>
                      </div>
                      <div className="click-hint">클릭하여 수정/삭제</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">❓</div>
          <h3>조건에 맞는 과목이 없습니다</h3>
          <p>검색 조건을 변경해보세요.</p>
        </div>
      )}

      {showQuestionModal && selectedQuestion && (
        <QuestionDetailModal
          subject={selectedQuestion.subject}
          question={selectedQuestion.question}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default SubjectQuestionList
