"use client"
import { useState } from "react"
import SubjectDetail from "./SubjectDetail"
import "../styles/SubjectList.css"

const SubjectList = ({ subjects, setSubjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("전체")
  const [difficultyFilter, setDifficultyFilter] = useState("전체")

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedSubject(null)
  }

  const handleUpdateSubject = (updatedSubject) => {
    setSubjects(subjects.map((subject) => (subject.id === updatedSubject.id ? updatedSubject : subject)))
    setSelectedSubject(updatedSubject)
  }

  const handleDeleteSubject = (subjectId) => {
    setSubjects(subjects.filter((subject) => subject.id !== subjectId))
    handleCloseDetail()
  }

  const getFilteredSubjects = () => {
    return subjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "전체" || subject.category === categoryFilter
      const matchesDifficulty = difficultyFilter === "전체" || subject.difficulty === difficultyFilter
      return matchesSearch && matchesCategory && matchesDifficulty
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

  const categories = [...new Set(subjects.map((s) => s.category))]
  const filteredSubjects = getFilteredSubjects()

  return (
    <div className="subject-list">
      <div className="subject-list-header">
        <h2>과목 리스트</h2>
        <p>등록된 모든 과목을 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="subject-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="과목명 또는 설명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
          <label>난이도</label>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option value="전체">전체</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>
        </div>
      </div>

      <div className="subject-stats">
        <div className="stat-item">
          <span className="stat-number">{subjects.length}</span>
          <span className="stat-label">전체 과목</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.length}</span>
          <span className="stat-label">카테고리</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{subjects.filter((s) => s.difficulty === "초급").length}</span>
          <span className="stat-label">초급</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{subjects.filter((s) => s.difficulty === "중급").length}</span>
          <span className="stat-label">중급</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{subjects.filter((s) => s.difficulty === "고급").length}</span>
          <span className="stat-label">고급</span>
        </div>
      </div>

      <div className="subjects-grid">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="subject-card" onClick={() => handleSubjectClick(subject)}>
            <div className="subject-header">
              <h3>{subject.name}</h3>
              <span className={`difficulty-badge ${getDifficultyColor(subject.difficulty)}`}>{subject.difficulty}</span>
            </div>

            <div className="subject-info">
              <p className="subject-description">{subject.description}</p>

              <div className="subject-meta">
                <div className="meta-item">
                  <span className="label">카테고리:</span>
                  <span className="value">{subject.category}</span>
                </div>
                <div className="meta-item">
                  <span className="label">수업 시간:</span>
                  <span className="value">{subject.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="label">세부 과목:</span>
                  <span className="value">{subject.details.length}개</span>
                </div>
              </div>

              {subject.prerequisites.length > 0 && (
                <div className="prerequisites">
                  <span className="prerequisites-label">선수과목:</span>
                  <div className="prerequisites-list">
                    {subject.prerequisites.map((prereq, index) => (
                      <span key={index} className="prerequisite-tag">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="objectives">
                <span className="objectives-label">학습 목표:</span>
                <ul className="objectives-list">
                  {subject.objectives.slice(0, 2).map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                  {subject.objectives.length > 2 && (
                    <li className="more-objectives">+{subject.objectives.length - 2}개 더</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h3>조건에 맞는 과목이 없습니다</h3>
          <p>검색 조건을 변경하거나 새로운 과목을 등록해보세요.</p>
        </div>
      )}

      {showDetail && selectedSubject && (
        <SubjectDetail
          subject={selectedSubject}
          onClose={handleCloseDetail}
          onUpdate={handleUpdateSubject}
          onDelete={handleDeleteSubject}
        />
      )}
    </div>
  )
}

export default SubjectList
