"use client"
import { useEffect } from "react"
import "../styles/ProfileDropdown.css"

const ProfileDropdown = ({ currentUser, onLogout, onClose }) => {
  // 드롭다운 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown") && !event.target.closest(".profile-btn")) {
        onClose()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [onClose])

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "관리자"
      case "staff":
        return "직원"
      case "instructor":
        return "강사"
      case "student":
        return "학생"
      default:
        return role
    }
  }

  return (
    <div className="profile-dropdown">
      <div className="profile-info">
        <div className="profile-avatar-large">👤</div>
        <div className="profile-details">
          <div className="profile-name-large">{currentUser.name}</div>
          <div className="profile-role-text">{getRoleText(currentUser.role)}</div>
          {currentUser.position && <div className="profile-position">{currentUser.position}</div>}
        </div>
      </div>

      <div className="profile-menu">
        <button className="profile-menu-item">
          <span className="menu-icon">👤</span>내 정보
        </button>
        <button className="profile-menu-item">
          <span className="menu-icon">⚙️</span>
          설정
        </button>
        <button className="profile-menu-item">
          <span className="menu-icon">❓</span>
          도움말
        </button>
        <div className="menu-divider"></div>
        <button className="profile-menu-item logout" onClick={onLogout}>
          <span className="menu-icon">🚪</span>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown
