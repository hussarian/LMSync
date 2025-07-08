"use client"
import { useState } from "react"
import "../styles/SyllabusModal.css"

const SyllabusModal = ({ course, onClose }) => {
  const [isEditing, setIsEditing] = useState(!course.syllabus)
  const [syllabusData, setSyllabusData] = useState(
    course.syllabus || {
      objectives: [],
      schedule: [],
      evaluation: "",
      materials: [],
    },
  )

  const handleSave = () => {
    // 여기서 실제로는 서버에 저장
    console.log("강의계획서 저장:", syllabusData)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    if (confirm("강의계획서를 삭제하시겠습니까?")) {
      // 여기서 실제로는 서버에서 삭제
      console.log("강의계획서 삭제")
      onClose()
    }
  }

  const addObjective = () => {
    setSyllabusData({
      ...syllabusData,
      objectives: [...syllabusData.objectives, ""],
    })
  }

  const updateObjective = (index, value) => {
    const newObjectives = [...syllabusData.objectives]
    newObjectives[index] = value
    setSyllabusData({ ...syllabusData, objectives: newObjectives })
  }

  const removeObjective = (index) => {
    const newObjectives = syllabusData.objectives.filter((_, i) => i !== index)
    setSyllabusData({ ...syllabusData, objectives: newObjectives })
  }

  const addScheduleItem = () => {
    setSyllabusData({
      ...syllabusData,
      schedule: [...syllabusData.schedule, { week: syllabusData.schedule.length + 1, topic: "", content: "" }],
    })
  }

  const updateScheduleItem = (index, field, value) => {
    const newSchedule = [...syllabusData.schedule]
    newSchedule[index][field] = value
    setSyllabusData({ ...syllabusData, schedule: newSchedule })
  }

  const removeScheduleItem = (index) => {
    const newSchedule = syllabusData.schedule.filter((_, i) => i !== index)
    setSyllabusData({ ...syllabusData, schedule: newSchedule })
  }

  const addMaterial = () => {
    setSyllabusData({
      ...syllabusData,
      materials: [...syllabusData.materials, ""],
    })
  }

  const updateMaterial = (index, value) => {
    const newMaterials = [...syllabusData.materials]
    newMaterials[index] = value
    setSyllabusData({ ...syllabusData, materials: newMaterials })
  }

  const removeMaterial = (index) => {
    const newMaterials = syllabusData.materials.filter((_, i) => i !== index)
    setSyllabusData({ ...syllabusData, materials: newMaterials })
  }

  return (
    <div className="syllabus-overlay" onClick={onClose}>
      <div className="syllabus-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{course.name} - 강의계획서</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          {isEditing ? (
            <div className="syllabus-form">
              <div className="form-section">
                <h3>학습 목표</h3>
                {syllabusData.objectives.map((objective, index) => (
                  <div key={index} className="objective-item">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      placeholder="학습 목표를 입력하세요"
                    />
                    <button className="remove-btn" onClick={() => removeObjective(index)}>
                      ✕
                    </button>
                  </div>
                ))}
                <button className="add-btn" onClick={addObjective}>
                  + 목표 추가
                </button>
              </div>

              <div className="form-section">
                <h3>강의 일정</h3>
                <div className="schedule-table">
                  <div className="schedule-header">
                    <span>주차</span>
                    <span>주제</span>
                    <span>내용</span>
                    <span>액션</span>
                  </div>
                  {syllabusData.schedule.map((item, index) => (
                    <div key={index} className="schedule-row">
                      <input
                        type="number"
                        value={item.week}
                        onChange={(e) => updateScheduleItem(index, "week", Number.parseInt(e.target.value))}
                      />
                      <input
                        type="text"
                        value={item.topic}
                        onChange={(e) => updateScheduleItem(index, "topic", e.target.value)}
                        placeholder="주제"
                      />
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => updateScheduleItem(index, "content", e.target.value)}
                        placeholder="내용"
                      />
                      <button className="remove-btn" onClick={() => removeScheduleItem(index)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button className="add-btn" onClick={addScheduleItem}>
                  + 일정 추가
                </button>
              </div>

              <div className="form-section">
                <h3>평가 방법</h3>
                <textarea
                  value={syllabusData.evaluation}
                  onChange={(e) => setSyllabusData({ ...syllabusData, evaluation: e.target.value })}
                  placeholder="평가 방법을 입력하세요 (예: 중간고사 30%, 기말고사 40%, 과제 30%)"
                  rows="3"
                />
              </div>

              <div className="form-section">
                <h3>교재 및 참고자료</h3>
                {syllabusData.materials.map((material, index) => (
                  <div key={index} className="material-item">
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => updateMaterial(index, e.target.value)}
                      placeholder="교재명 또는 참고자료"
                    />
                    <button className="remove-btn" onClick={() => removeMaterial(index)}>
                      ✕
                    </button>
                  </div>
                ))}
                <button className="add-btn" onClick={addMaterial}>
                  + 자료 추가
                </button>
              </div>
            </div>
          ) : (
            <div className="syllabus-view">
              <div className="view-section">
                <h3>학습 목표</h3>
                <ul>
                  {syllabusData.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="view-section">
                <h3>강의 일정</h3>
                <div className="schedule-table">
                  <div className="schedule-header">
                    <span>주차</span>
                    <span>주제</span>
                    <span>내용</span>
                  </div>
                  {syllabusData.schedule.map((item, index) => (
                    <div key={index} className="schedule-row">
                      <span>{item.week}주차</span>
                      <span>{item.topic}</span>
                      <span>{item.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="view-section">
                <h3>평가 방법</h3>
                <p>{syllabusData.evaluation}</p>
              </div>

              <div className="view-section">
                <h3>교재 및 참고자료</h3>
                <ul>
                  {syllabusData.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                저장
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                취소
              </button>
            </div>
          ) : (
            <div className="view-actions">
              <button className="edit-btn" onClick={handleEdit}>
                수정
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SyllabusModal
