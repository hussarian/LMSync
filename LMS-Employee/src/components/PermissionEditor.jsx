"use client"
import { useState } from "react"
import "../styles/PermissionEditor.css"

const PermissionEditor = ({ staff, onBack }) => {
  // 권한 섹션 정의
  const permissionSections = {
    접수: {
      name: "접수 관리",
      permissions: ["보기", "만들기", "수정", "삭제"],
    },
    학적부: {
      name: "학적부 관리",
      permissions: ["보기", "만들기", "수정", "삭제"],
    },
    과정: {
      name: "과정 관리",
      permissions: ["보기", "만들기", "수정", "삭제"],
    },
    강의실: {
      name: "강의실 관리",
      permissions: ["보기", "만들기", "수정", "삭제"],
    },
    "설문 평가": {
      name: "설문 평가 관리",
      permissions: ["보기", "만들기", "수정", "삭제"],
    },
  }

  // 현재 직원의 권한 상태 (샘플 데이터)
  const [currentPermissions, setCurrentPermissions] = useState({
    접수: { 보기: true, 만들기: true, 수정: false, 삭제: false },
    학적부: { 보기: true, 만들기: false, 수정: false, 삭제: false },
    과정: { 보기: false, 만들기: false, 수정: false, 삭제: false },
    강의실: { 보기: true, 만들기: true, 수정: true, 삭제: false },
    "설문 평가": { 보기: true, 만들기: false, 수정: false, 삭제: false },
  })

  // 섹션 토글 상태
  const [expandedSections, setExpandedSections] = useState({
    접수: true,
    학적부: false,
    과정: false,
    강의실: false,
    "설문 평가": false,
  })

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  const handlePermissionChange = (section, permission, checked) => {
    setCurrentPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [permission]: checked,
      },
    }))
  }

  const handleSelectAll = (section, checked) => {
    const newSectionPermissions = {}
    permissionSections[section].permissions.forEach((permission) => {
      newSectionPermissions[permission] = checked
    })

    setCurrentPermissions((prev) => ({
      ...prev,
      [section]: newSectionPermissions,
    }))
  }

  const handleApply = () => {
    // 실제로는 서버에 권한 변경 요청을 보냄
    alert(`${staff.name}님의 권한이 성공적으로 적용되었습니다.`)
    onBack()
  }

  const isAllSelected = (section) => {
    return permissionSections[section].permissions.every((permission) => currentPermissions[section][permission])
  }

  const isSomeSelected = (section) => {
    return permissionSections[section].permissions.some((permission) => currentPermissions[section][permission])
  }

  return (
    <div className="permission-editor">
      <div className="permission-editor-header">
        <button className="back-btn" onClick={onBack}>
          ← 목록으로
        </button>
        <div className="staff-info-header">
          <h2>{staff.name}님의 권한 관리</h2>
          <p>
            {staff.department} · {staff.position}
          </p>
        </div>
        <button className="apply-btn" onClick={handleApply}>
          적용
        </button>
      </div>

      <div className="permission-editor-content">
        <div className="permission-sections">
          {Object.entries(permissionSections).map(([sectionKey, section]) => (
            <div key={sectionKey} className="permission-section">
              <div className="section-header" onClick={() => toggleSection(sectionKey)}>
                <div className="section-title">
                  <span className={`toggle-icon ${expandedSections[sectionKey] ? "expanded" : ""}`}>▶</span>
                  <h3>{section.name}</h3>
                </div>
                <div className="section-controls">
                  <label className="select-all-checkbox">
                    <input
                      type="checkbox"
                      checked={isAllSelected(sectionKey)}
                      ref={(input) => {
                        if (input) input.indeterminate = isSomeSelected(sectionKey) && !isAllSelected(sectionKey)
                      }}
                      onChange={(e) => handleSelectAll(sectionKey, e.target.checked)}
                    />
                    전체 선택
                  </label>
                </div>
              </div>

              {expandedSections[sectionKey] && (
                <div className="section-content">
                  <div className="permission-grid">
                    {section.permissions.map((permission) => (
                      <label key={permission} className="permission-item">
                        <input
                          type="checkbox"
                          checked={currentPermissions[sectionKey][permission]}
                          onChange={(e) => handlePermissionChange(sectionKey, permission, e.target.checked)}
                        />
                        <span className="permission-name">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="permission-summary">
          <h3>권한 요약</h3>
          <div className="summary-content">
            {Object.entries(currentPermissions).map(([section, permissions]) => {
              const activePermissions = Object.entries(permissions)
                .filter(([, isActive]) => isActive)
                .map(([permission]) => permission)

              if (activePermissions.length === 0) return null

              return (
                <div key={section} className="summary-section">
                  <strong>{permissionSections[section].name}:</strong>
                  <span>{activePermissions.join(", ")}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermissionEditor
