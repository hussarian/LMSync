"use client"
import { useState } from "react"
import ClassroomDetailModal from "./ClassroomDetailModal"
import "../styles/ClassroomList.css"

const ClassroomList = ({ classrooms, setClassrooms }) => {
  const [selectedClassroom, setSelectedClassroom] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("전체") // "전체", "활성", "비활성"
  const [filterUsage, setFilterUsage] = useState("전체") // "전체", "사용중", "미사용"

  const handleClassroomClick = (classroom) => {
    setSelectedClassroom(classroom)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setSelectedClassroom(null)
    setShowDetailModal(false)
  }

  const handleUpdateClassroom = (updatedClassroom) => {
    setClassrooms(classrooms.map((c) => (c.id === updatedClassroom.id ? updatedClassroom : c)))
    setShowDetailModal(false)
  }

  const handleDeleteClassroom = (classroomId) => {
    setClassrooms(classrooms.filter((c) => c.id !== classroomId))
    setShowDetailModal(false)
  }

  const getFilteredClassrooms = () => {
    return classrooms.filter((classroom) => {
      const matchesSearch =
        classroom.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        filterStatus === "전체" ||
        (filterStatus === "활성" && classroom.isActive) ||
        (filterStatus === "비활성" && !classroom.isActive)

      const matchesUsage =
        filterUsage === "전체" ||
        (filterUsage === "사용중" && classroom.currentCourse) ||
        (filterUsage === "미사용" && !classroom.currentCourse)

      return matchesSearch && matchesStatus && matchesUsage
    })
  }

  const getStatusColor = (classroom) => {
    if (!classroom.isActive) return "inactive"
    if (classroom.currentCourse) return "in-use"
    return "available"
  }

  const getStatusText = (classroom) => {
    if (!classroom.isActive) return "비활성"
    if (classroom.currentCourse) return "사용중"
    return "사용가능"
  }

  const filteredClassrooms = getFilteredClassrooms()

  return (
    <div className="classroom-list">
      <div className="classroom-list-header">
        <h2>강의실 목록</h2>
        <p>전체 강의실 정보를 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="classroom-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="강의실 번호, 이름, 위치로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
            <option value="전체">전체 상태</option>
            <option value="활성">활성</option>
            <option value="비활성">비활성</option>
          </select>
          <select value={filterUsage} onChange={(e) => setFilterUsage(e.target.value)} className="filter-select">
            <option value="전체">전체 사용현황</option>
            <option value="사용중">사용중</option>
            <option value="미사용">미사용</option>
          </select>
        </div>
      </div>

      <div className="classroom-stats">
        <div className="stat-item">
          <span className="stat-number">{classrooms.length}</span>
          <span className="stat-label">전체 강의실</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{classrooms.filter((c) => c.isActive).length}</span>
          <span className="stat-label">활성 강의실</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{classrooms.filter((c) => c.currentCourse).length}</span>
          <span className="stat-label">사용중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{classrooms.reduce((sum, c) => sum + c.capacity, 0)}</span>
          <span className="stat-label">총 수용인원</span>
        </div>
      </div>

      <div className="classrooms-grid">
        {filteredClassrooms.map((classroom) => (
          <div
            key={classroom.id}
            className={`classroom-card ${!classroom.isActive ? "inactive" : ""}`}
            onClick={() => handleClassroomClick(classroom)}
          >
            <div className="classroom-header">
              <div className="classroom-info">
                <h3>{classroom.roomNumber}</h3>
                <p className="classroom-name">{classroom.name}</p>
              </div>
              <span className={`status-badge ${getStatusColor(classroom)}`}>{getStatusText(classroom)}</span>
            </div>

            <div className="classroom-details">
              <div className="detail-row">
                <span className="label">위치:</span>
                <span className="value">{classroom.location}</span>
              </div>
              <div className="detail-row">
                <span className="label">수용인원:</span>
                <span className="value">{classroom.capacity}명</span>
              </div>
              <div className="detail-row">
                <span className="label">사용시간:</span>
                <span className="value">{classroom.availableHours}</span>
              </div>
              {classroom.currentCourse && (
                <div className="detail-row">
                  <span className="label">현재 강의:</span>
                  <span className="value current-course">{classroom.currentCourse}</span>
                </div>
              )}
            </div>

            <div className="classroom-equipment">
              <h4>주요 장비</h4>
              <div className="equipment-list">
                {classroom.equipment.slice(0, 3).map((eq, index) => (
                  <span key={index} className="equipment-item">
                    {eq.name} ({eq.quantity})
                  </span>
                ))}
                {classroom.equipment.length > 3 && (
                  <span className="equipment-more">+{classroom.equipment.length - 3}개 더</span>
                )}
              </div>
            </div>

            <div className="classroom-features">
              {classroom.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
              {classroom.features.length > 3 && <span className="feature-more">+{classroom.features.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>

      {filteredClassrooms.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏫</div>
          <h3>조건에 맞는 강의실이 없습니다</h3>
          <p>검색 조건을 변경하거나 새로운 강의실을 등록해보세요.</p>
        </div>
      )}

      {showDetailModal && selectedClassroom && (
        <ClassroomDetailModal
          classroom={selectedClassroom}
          onClose={handleCloseModal}
          onUpdate={handleUpdateClassroom}
          onDelete={handleDeleteClassroom}
        />
      )}
    </div>
  )
}

export default ClassroomList
