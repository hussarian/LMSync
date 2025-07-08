"use client"
import "../styles/Header.css"

const Header = ({
  currentUser,
  activeMenu,
  onMenuClick,
  onLogoClick,
  onNotificationClick,
  onChatClick,
  onProfileClick,
  showProfileDropdown,
}) => {
  // 계정별 메뉴 정의
  const getMenusByRole = (role) => {
    switch (role) {
      case "admin":
        return ["기관 추가"]
      case "staff":
        return ["계정 등록", "학적부", "과정 관리", "강의실 관리", "설문 평가 관리", "시험 및 성적", "권한 관리"]
      case "instructor":
        return ["교육 과정", "학적부", "시험", "과제", "설문평가"]
      case "student":
        return ["강의 계획서", "출석", "과제", "시험", "설문 평가"]
      default:
        return []
    }
  }

  const menus = getMenusByRole(currentUser.role)

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <button className="logo-btn" onClick={onLogoClick}>
            <h1>LMSync</h1>
          </button>
        </div>
        <nav className="main-nav">
          {menus.map((menu) => (
            <button
              key={menu}
              className={`nav-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => onMenuClick(menu)}
            >
              {menu}
            </button>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <button className="icon-btn" title="알람" onClick={onNotificationClick}>
          🔔
        </button>
        <button className="icon-btn" title="채팅" onClick={onChatClick}>
          💬
        </button>
        <div className="profile">
          <button className={`profile-btn ${showProfileDropdown ? "active" : ""}`} onClick={onProfileClick}>
            <span className="profile-icon">👤</span>
            <div className="profile-text">
              <span className="profile-name">{currentUser.name}</span>
              <span className="profile-role">{currentUser.position || currentUser.role}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
