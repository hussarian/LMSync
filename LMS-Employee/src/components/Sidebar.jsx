"use client"
import "../styles/Sidebar.css"

const Sidebar = ({ activeMenu, activeSubMenu, onSubMenuClick }) => {
  // 각 메뉴별 하위 메뉴 정의
  const getSubMenus = (menu) => {
    const subMenus = {
      "계정 등록": ["개별 등록", "일괄 등록"],
      학적부: ["학생 목록", "학생 출/결처리"],
      "과정 관리": ["과정 리스트", "과정 등록", "과목 리스트", "과목 등록"],
      "강의실 관리": ["강의실 목록", "강의실 등록"],
      "설문 평가 관리": ["평가 항목", "강의 리스트", "템플릿 목록"],
      "시험 및 성적": ["과정 리스트", "과목 문제 리스트"],
      "권한 관리": [],
      "교육 과정": ["내 강의", "강의 계획서", "수업 자료", "진도 관리"],
      시험: ["시험 출제", "시험 관리", "채점", "성적 입력"],
      과제: ["과제 출제", "과제 관리", "제출 현황", "평가"],
      설문평가: ["설문 참여", "평가 결과 조회"],
      "강의 계획서": ["수강 과목", "강의 일정", "학습 목표", "평가 기준"],
      출석: ["출석 현황", "출석 체크", "결석 사유"],
      "기관 추가": ["기관 등록", "기관 목록", "기관 승인", "기관 통계"],
    }

    return subMenus[menu] || []
  }

  const subMenus = getSubMenus(activeMenu)

  if (!activeMenu || subMenus.length === 0) {
    return <aside className="sidebar empty"></aside>
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>{activeMenu}</h3>
      </div>
      <nav className="sidebar-nav">
        {subMenus.map((subMenu) => (
          <button
            key={subMenu}
            className={`sidebar-item ${activeSubMenu === subMenu ? "active" : ""}`}
            onClick={() => onSubMenuClick(subMenu)}
          >
            {subMenu}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
