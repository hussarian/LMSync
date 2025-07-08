"use client"
import { useState } from "react"
import SubjectDetailModal from "./SubjectDetailModal"
import "../styles/SubjectRegistration.css"

const SubjectRegistration = ({ subjects, setSubjects }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    difficulty: "초급",
    description: "",
    prerequisites: [],
    objectives: [""],
    details: [],
  })

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [availableSubjects] = useState([
    "HTML/CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "C++",
    "데이터베이스",
    "네트워크",
    "운영체제",
    "알고리즘",
  ])

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.objectives]
    newObjectives[index] = value
    setFormData({ ...formData, objectives: newObjectives })
  }

  const addObjective = () => {
    setFormData({ ...formData, objectives: [...formData.objectives, ""] })
  }

  const removeObjective = (index) => {
    if (formData.objectives.length > 1) {
      const newObjectives = formData.objectives.filter((_, i) => i !== index)
      setFormData({ ...formData, objectives: newObjectives })
    }
  }

  const handlePrerequisiteToggle = (subject) => {
    const isSelected = formData.prerequisites.includes(subject)
    if (isSelected) {
      setFormData({
        ...formData,
        prerequisites: formData.prerequisites.filter((p) => p !== subject),
      })
    } else {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, subject],
      })
    }
  }

  const handleAddDetail = (detail) => {
    setFormData({
      ...formData,
      details: [...formData.details, { ...detail, id: Date.now() }],
    })
  }

  const handleRemoveDetail = (detailId) => {
    setFormData({
      ...formData,
      details: formData.details.filter((d) => d.id !== detailId),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.category ||
      !formData.duration ||
      !formData.description ||
      formData.objectives.some((obj) => !obj.trim()) ||
      formData.details.length === 0
    ) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    const newSubject = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      duration: formData.duration,
      difficulty: formData.difficulty,
      description: formData.description,
      prerequisites: formData.prerequisites,
      objectives: formData.objectives.filter((obj) => obj.trim()),
      details: formData.details,
    }

    setSubjects([...subjects, newSubject])

    // 폼 초기화
    setFormData({
      name: "",
      category: "",
      duration: "",
      difficulty: "초급",
      description: "",
      prerequisites: [],
      objectives: [""],
      details: [],
    })

    alert("새로운 과목이 등록되었습니다!")
  }

  return (
    <div className="subject-registration">
      <div className="registration-header">
        <h2>과목 등록</h2>
        <p>새로운 과목을 등록합니다. 세부 과목을 추가하여 템플릿을 구성하세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3>기본 정보</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>과목명 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="과목명을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>카테고리 *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="예: 웹 개발, 데이터 분석"
                required
              />
            </div>

            <div className="form-group">
              <label>수업 시간 *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="예: 40시간"
                required
              />
            </div>

            <div className="form-group">
              <label>난이도 *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange("difficulty", e.target.value)}
                required
              >
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>과목 설명 *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="과목에 대한 상세 설명을 입력하세요"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>선수 과목</h3>
          <p className="section-description">이 과목을 수강하기 전에 필요한 선수 과목을 선택하세요.</p>
          <div className="prerequisites-selection">
            {availableSubjects.map((subject) => (
              <label key={subject} className="prerequisite-option">
                <input
                  type="checkbox"
                  checked={formData.prerequisites.includes(subject)}
                  onChange={() => handlePrerequisiteToggle(subject)}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>학습 목표 *</h3>
          <div className="objectives-list">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="objective-input">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  placeholder={`학습 목표 ${index + 1}`}
                  required
                />
                {formData.objectives.length > 1 && (
                  <button type="button" className="remove-objective" onClick={() => removeObjective(index)}>
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-objective" onClick={addObjective}>
              + 학습 목표 추가
            </button>
          </div>
        </div>

        <div className="form-section">
          <h3>세부 과목 구성 *</h3>
          <div className="details-section">
            <div className="details-header">
              <p>이 과목의 세부 과목들을 추가하여 템플릿을 구성하세요.</p>
              <button type="button" className="add-detail-btn" onClick={() => setShowDetailModal(true)}>
                세부 과목 생성
              </button>
            </div>

            {formData.details.length > 0 ? (
              <div className="details-list">
                {formData.details.map((detail) => (
                  <div key={detail.id} className="detail-item">
                    <div className="detail-header">
                      <h4>{detail.title}</h4>
                      <div className="detail-actions">
                        <span className="detail-duration">{detail.duration}</span>
                        <button type="button" className="remove-detail" onClick={() => handleRemoveDetail(detail.id)}>
                          ✕
                        </button>
                      </div>
                    </div>
                    <p>{detail.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-details">
                <p>아직 세부 과목이 추가되지 않았습니다.</p>
                <p>세부 과목 생성 버튼을 클릭하여 과목 구성을 시작하세요.</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            과목 등록
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() =>
              setFormData({
                name: "",
                category: "",
                duration: "",
                difficulty: "초급",
                description: "",
                prerequisites: [],
                objectives: [""],
                details: [],
              })
            }
          >
            초기화
          </button>
        </div>
      </form>

      {showDetailModal && <SubjectDetailModal onClose={() => setShowDetailModal(false)} onAdd={handleAddDetail} />}
    </div>
  )
}

export default SubjectRegistration
