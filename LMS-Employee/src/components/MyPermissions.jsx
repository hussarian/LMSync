"use client"
import { useState } from "react"
import "../styles/MyPermissions.css"

const MyPermissions = ({ currentUser }) => {
  // 현재 사용자의 권한 (샘플 데이터)
  const [myPermissions] = useState({
    접수: { 보기: true, 만들기: true, 수정: false, 삭제: false },
    학적부: { 보기: true, 만들기: false, 수정: false, 삭제: false },
    과정: { 보기: false, 만들기: false, 수정: false, 삭제: false },
    강의실: { 보기: true, 만들기: false, 수정: false, 삭제: false },
    "설문 평가": { 보기: true, 만들기: false, 수정: false, 삭제: false },
  })

  const permissionSections = {
    접수: "접수 관리",
    학적부: "학적부 관리",
    과정: "과정 관리",
    강의실: "강의실 관리",
    "설문 평가": "설문 평가 관리",
  }

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case "보기":
        return "👁️"
      case "만들기":
        return "➕"
      case "수정":
        return "✏️"
      case "삭제":
        return "🗑️"
      default:
        return "📋"
    }
  }

  return (
    <div className="my-permissions">
      <div className="my-permissions-header">
        <h2>내 권한 조회</h2>
        <p>현재 계정에 부여된 권한을 확인할 수 있습니다.</p>
      </div>

      <div className="permission-request-section">
        <button className="request-permission-btn" onClick={() => alert("권한 요청이 전송되었습니다.")}>
          권한 요청하기
        </button>
      </div>

      <div className="user-info-card">
        <div className="user-avatar">👤</div>
        <div className="user-details">
          <h3>{currentUser.name}</h3>
          <p>{currentUser.position}</p>
          <span className="user-role">일반직원</span>
        </div>
      </div>

      <div className="permissions-grid">
        {Object.entries(myPermissions).map(([section, permissions]) => {
          const activePermissions = Object.entries(permissions).filter(([, isActive]) => isActive)

          return (
            <div key={section} className="permission-card">
              <div className="permission-card-header">
                <h3>{permissionSections[section]}</h3>
                <span className="permission-count">{activePermissions.length}/4</span>
              </div>

              <div className="permission-list">
                {Object.entries(permissions).map(([permission, isActive]) => (
                  <div key={permission} className={`permission-badge ${isActive ? "active" : "inactive"}`}>
                    <span className="permission-icon">{getPermissionIcon(permission)}</span>
                    <span className="permission-text">{permission}</span>
                    {isActive ? (
                      <span className="status-icon granted">✓</span>
                    ) : (
                      <span className="status-icon denied">✕</span>
                    )}
                  </div>
                ))}
              </div>

              {activePermissions.length === 0 && (
                <div className="no-permissions">
                  <p>이 섹션에 대한 권한이 없습니다.</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="permission-help">
        <h3>권한 안내</h3>
        <div className="help-content">
          <div className="help-item">
            <span className="help-icon">👁️</span>
            <div>
              <strong>보기</strong>
              <p>해당 섹션의 데이터를 조회할 수 있습니다.</p>
            </div>
          </div>
          <div className="help-item">
            <span className="help-icon">➕</span>
            <div>
              <strong>만들기</strong>
              <p>새로운 데이터를 생성할 수 있습니다.</p>
            </div>
          </div>
          <div className="help-item">
            <span className="help-icon">✏️</span>
            <div>
              <strong>수정</strong>
              <p>기존 데이터를 편집할 수 있습니다.</p>
            </div>
          </div>
          <div className="help-item">
            <span className="help-icon">🗑️</span>
            <div>
              <strong>삭제</strong>
              <p>데이터를 삭제할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPermissions
