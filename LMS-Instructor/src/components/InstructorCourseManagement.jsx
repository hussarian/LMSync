"use client"
import InstructorCourseList from "./InstructorCourseList"
import AssignmentList from "./AssignmentList"
import GradingList from "./GradingList"
import "../styles/InstructorCourseManagement.css"

const InstructorCourseManagement = ({ activeSubMenu }) => {
  const renderContent = () => {
    switch (activeSubMenu) {
      case "담당 강의":
        return <InstructorCourseList />
      case "과제 리스트":
        return <AssignmentList />
      case "채점":
        return <GradingList />
      default:
        return (
          <div className="instructor-course-overview">
            <h2>과정 관리</h2>
            <p>좌측 사이드바에서 메뉴를 선택해주세요.</p>
            <div className="overview-stats">
              <div className="stat-card">
                <h3>담당 강의</h3>
                <p>5개</p>
              </div>
              <div className="stat-card">
                <h3>진행 중인 과제</h3>
                <p>12개</p>
              </div>
              <div className="stat-card">
                <h3>채점 대기</h3>
                <p>8개</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return <div className="instructor-course-management">{renderContent()}</div>
}

export default InstructorCourseManagement
