"use client"
import { useState, useEffect } from "react"
import "../styles/ClassroomDetailModal.css"

const ClassroomDetailModal = ({ classroom, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    roomNumber: "",
    name: "",
    capacity: 0,
    isActive: true,
    currentCourse: "",
    availableHours: "",
    equipment: [],
    features: [],
    location: "",
  })

  useEffect(() => {
    if (classroom) {
      setFormData({
        roomNumber: classroom.roomNumber,
        name: classroom.name,
        capacity: classroom.capacity,
        isActive: classroom.isActive,
        currentCourse: classroom.currentCourse || "",
        availableHours: classroom.availableHours,
        equipment: [...classroom.equipment],
        features: [...classroom.features],
        location: classroom.location,
      })
    }
  }, [classroom])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEquipmentChange = (index, field, value) => {
    const newEquipment = [...formData.equipment]
    newEquipment[index] = { ...newEquipment[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      equipment: newEquipment,
    }))
  }

  const handleAddEquipment = () => {
    setFormData((prev) => ({
      ...prev,
      equipment: [...prev.equipment, { name: "", quantity: 1, description: "" }],
    }))
  }

  const handleRemoveEquipment = (index) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index),
    }))
  }

  const handleFeaturesChange = (value) => {
    const featuresArray = value
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)
    setFormData((prev) => ({
      ...prev,
      features: featuresArray,
    }))
  }

  const handleSave = () => {
    const updatedClassroom = {
      ...classroom,
      ...formData,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    onUpdate(updatedClassroom)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("정말로 이 강의실을 삭제하시겠습니까?")) {
      onDelete(classroom.id)
    }
  }

  const handleToggleActive = () => {
    const updatedClassroom = {
      ...classroom,
      isActive: !classroom.isActive,
      currentCourse: !classroom.isActive ? classroom.currentCourse : null,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    onUpdate(updatedClassroom)
  }

  const getStatusColor = () => {
    if (!classroom.isActive) return "inactive"
    if (classroom.currentCourse) return "in-use"
    return "available"
  }

  const getStatusText = () => {
    if (!classroom.isActive) return "비활성"
    if (classroom.currentCourse) return "사용중"
    return "사용가능"
  }

  return (
    <div className="classroom-detail-overlay" onClick={onClose}>
      <div className="classroom-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-info">
            <h2>
              {classroom.roomNumber} - {classroom.name}
            </h2>
            <span className={`status-badge ${getStatusColor()}`}>{getStatusText()}</span>
          </div>
          <div className="header-actions">
            <button
              className={`toggle-active-btn ${classroom.isActive ? "active" : "inactive"}`}
              onClick={handleToggleActive}
            >
              {classroom.isActive ? "비활성화" : "활성화"}
            </button>
            {!isEditing ? (
              <>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  수정
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  삭제
                </button>
              </>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave}>
                  저장
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  취소
                </button>
              </>
            )}
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-content">
          <div className="detail-section">
            <h3>기본 정보</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>강의실 호수</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                  />
                ) : (
                  <span>{classroom.roomNumber}</span>
                )}
              </div>
              <div className="detail-item">
                <label>강의실 이름</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <span>{classroom.name}</span>
                )}
              </div>
              <div className="detail-item">
                <label>수용인원</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", Number.parseInt(e.target.value))}
                  />
                ) : (
                  <span>{classroom.capacity}명</span>
                )}
              </div>
              <div className="detail-item">
                <label>위치</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                ) : (
                  <span>{classroom.location}</span>
                )}
              </div>
              <div className="detail-item">
                <label>사용 가능 시간</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.availableHours}
                    onChange={(e) => handleInputChange("availableHours", e.target.value)}
                    placeholder="예: 09:00 - 18:00"
                  />
                ) : (
                  <span>{classroom.availableHours}</span>
                )}
              </div>
              <div className="detail-item">
                <label>현재 사용 중인 강의</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.currentCourse}
                    onChange={(e) => handleInputChange("currentCourse", e.target.value)}
                    placeholder="강의명 입력 (없으면 비워두세요)"
                  />
                ) : (
                  <span>{classroom.currentCourse || "없음"}</span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h3>구비 장비</h3>
              {isEditing && (
                <button className="add-equipment-btn" onClick={handleAddEquipment}>
                  + 장비 추가
                </button>
              )}
            </div>
            <div className="equipment-list">
              {(isEditing ? formData.equipment : classroom.equipment).map((equipment, index) => (
                <div key={index} className="equipment-item">
                  {isEditing ? (
                    <div className="equipment-form">
                      <input
                        type="text"
                        placeholder="장비명"
                        value={equipment.name}
                        onChange={(e) => handleEquipmentChange(index, "name", e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="수량"
                        value={equipment.quantity}
                        onChange={(e) => handleEquipmentChange(index, "quantity", Number.parseInt(e.target.value))}
                      />
                      <input
                        type="text"
                        placeholder="설명"
                        value={equipment.description}
                        onChange={(e) => handleEquipmentChange(index, "description", e.target.value)}
                      />
                      <button className="remove-equipment-btn" onClick={() => handleRemoveEquipment(index)}>
                        삭제
                      </button>
                    </div>
                  ) : (
                    <div className="equipment-info">
                      <div className="equipment-header">
                        <span className="equipment-name">{equipment.name}</span>
                        <span className="equipment-quantity">{equipment.quantity}개</span>
                      </div>
                      <div className="equipment-description">{equipment.description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>부가 기능</h3>
            <div className="features-section">
              {isEditing ? (
                <div className="features-edit">
                  <input
                    type="text"
                    value={formData.features.join(", ")}
                    onChange={(e) => handleFeaturesChange(e.target.value)}
                    placeholder="기능들을 쉼표로 구분하여 입력하세요 (예: WiFi, 에어컨, 프로젝터)"
                  />
                  <p className="features-help">쉼표(,)로 구분하여 여러 기능을 입력할 수 있습니다.</p>
                </div>
              ) : (
                <div className="features-list">
                  {classroom.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3>관리 정보</h3>
            <div className="management-info">
              <div className="info-item">
                <span className="label">등록일:</span>
                <span className="value">{classroom.createdAt}</span>
              </div>
              <div className="info-item">
                <span className="label">최종 수정일:</span>
                <span className="value">{classroom.lastUpdated}</span>
              </div>
              <div className="info-item">
                <span className="label">상태:</span>
                <span className={`value status ${classroom.isActive ? "active" : "inactive"}`}>
                  {classroom.isActive ? "활성" : "비활성"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassroomDetailModal
