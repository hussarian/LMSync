"use client"
import { useState } from "react"
import "../styles/CourseRegistration.css"

const CourseRegistration = ({ courses, setCourses, subjects }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    instructor: "",
    classroom: "",
    schedule: "",
    minStudents: "",
    maxStudents: "",
    selectedSubjects: [],
    description: "",
  })

  const [availableInstructors] = useState(["김개발", "박데이터", "이모바일", "최디자인", "정백엔드", "한프론트"])

  const [availableClassrooms] = useState(["A101", "A102", "A103", "B201", "B202", "B203", "C301", "C302", "C303"])

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubjectToggle = (subjectId) => {
    const isSelected = formData.selectedSubjects.includes(subjectId)
    if (isSelected) {
      setFormData({
        ...formData,
        selectedSubjects: formData.selectedSubjects.filter((id) => id !== subjectId),
      })
    } else {
      setFormData({
        ...formData,
        selectedSubjects: [...formData.selectedSubjects, subjectId],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.instructor ||
      !formData.classroom ||
      !formData.schedule ||
      !formData.minStudents ||
      !formData.maxStudents ||
      formData.selectedSubjects.length === 0
    ) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    const selectedSubjectNames = formData.selectedSubjects
      .map((id) => subjects.find((subject) => subject.id === id)?.name)
      .filter(Boolean)

    const newCourse = {
      id: Date.now(),
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      instructor: formData.instructor,
      classroom: formData.classroom,
      schedule: formData.schedule,
      minStudents: Number.parseInt(formData.minStudents),
      maxStudents: Number.parseInt(formData.maxStudents),
      currentStudents: 0,
      subjects: selectedSubjectNames,
      status: "모집중",
      description: formData.description,
    }

    setCourses([...courses, newCourse])

    // 폼 초기화
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      instructor: "",
      classroom: "",
      schedule: "",
      minStudents: "",
      maxStudents: "",
      selectedSubjects: [],
      description: "",
    })

    alert("새로운 과정이 등록되었습니다!")
  }

  return (
    <div className="course-registration">
      <div className="registration-header">
        <h2>과정 등록</h2>
        <p>새로운 과정을 등록합니다. 모든 필수 항목을 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3>기본 정보</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>과정명 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="과정명을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>담당 강사 *</label>
              <select
                value={formData.instructor}
                onChange={(e) => handleInputChange("instructor", e.target.value)}
                required
              >
                <option value="">강사를 선택하세요</option>
                {availableInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>개강일 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>종강일 *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>강의실 *</label>
              <select
                value={formData.classroom}
                onChange={(e) => handleInputChange("classroom", e.target.value)}
                required
              >
                <option value="">강의실을 선택하세요</option>
                {availableClassrooms.map((classroom) => (
                  <option key={classroom} value={classroom}>
                    {classroom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>강의 시간 *</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => handleInputChange("schedule", e.target.value)}
                placeholder="예: 월,수,금 14:00-17:00"
                required
              />
            </div>

            <div className="form-group">
              <label>최소 인원 *</label>
              <input
                type="number"
                value={formData.minStudents}
                onChange={(e) => handleInputChange("minStudents", e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>최대 인원 *</label>
              <input
                type="number"
                value={formData.maxStudents}
                onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>과목 선택 *</h3>
          <p className="section-description">이 과정에 포함될 과목들을 선택하세요.</p>
          <div className="subjects-selection">
            {subjects.map((subject) => (
              <div key={subject.id} className="subject-option">
                <label className="subject-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectToggle(subject.id)}
                  />
                  <div className="subject-info">
                    <h4>{subject.name}</h4>
                    <p>{subject.description}</p>
                    <div className="subject-meta">
                      <span className="category">{subject.category}</span>
                      <span className="duration">{subject.duration}</span>
                      <span className={`difficulty ${subject.difficulty}`}>{subject.difficulty}</span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>과정 설명</h3>
          <div className="form-group">
            <label>설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="과정에 대한 상세 설명을 입력하세요"
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            과정 등록
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() =>
              setFormData({
                name: "",
                startDate: "",
                endDate: "",
                instructor: "",
                classroom: "",
                schedule: "",
                minStudents: "",
                maxStudents: "",
                selectedSubjects: [],
                description: "",
              })
            }
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseRegistration
