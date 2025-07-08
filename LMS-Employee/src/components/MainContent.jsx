"use client"

import "../styles/MainContent.css"
import PermissionManagement from "./PermissionManagement"
import StudentList from "./StudentList"
import StudentDetail from "./StudentDetail"
import AttendanceManagement from "./AttendanceManagement"
import { useState } from "react"
import AccountRegistration from "./AccountRegistration"
import EvaluationManagement from "./EvaluationManagement"
import ClassroomManagement from "./ClassroomManagement"
import CourseManagement from "./CourseManagement"
import ExamManagement from "./ExamManagement"

const MainContent = ({ activeMenu, activeSubMenu, currentUser }) => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [view, setView] = useState("list") // "list", "detail"

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setView("detail")
  }

  const handleBackToList = () => {
    setSelectedStudent(null)
    setView("list")
  }

  const renderContent = () => {
    if (!activeMenu) {
      return (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>LMSync에 오신 것을 환영합니다!</h1>
            <p>{currentUser.name}님, 좋은 하루 되세요.</p>
            <div className="quick-stats">
              <div className="stat-card">
                <h3>오늘의 일정</h3>
                <p>3개의 강의</p>
              </div>
              <div className="stat-card">
                <h3>새로운 알림</h3>
                <p>5개의 메시지</p>
              </div>
              <div className="stat-card">
                <h3>진행 중인 과제</h3>
                <p>2개의 과제</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // 권한 관리 메뉴 처리
    if (activeMenu === "권한 관리") {
      return <PermissionManagement currentUser={currentUser} />
    }

    // 학적부 메뉴 처리
    if (activeMenu === "학적부") {
      if (activeSubMenu === "학생 목록") {
        if (view === "detail" && selectedStudent) {
          return <StudentDetail student={selectedStudent} onBack={handleBackToList} />
        }
        return <StudentList onStudentSelect={handleStudentSelect} />
      }
      if (activeSubMenu === "학생 출/결처리") {
        return <AttendanceManagement />
      }
    }

    // 계정 등록 메뉴 처리 추가
    if (activeMenu === "계정 등록") {
      return <AccountRegistration activeSubMenu={activeSubMenu} />
    }

    // 설문 평가 관리 메뉴 처리 추가
    if (activeMenu === "설문 평가 관리") {
      return <EvaluationManagement activeSubMenu={activeSubMenu} />
    }

    // 강의실 관리 메뉴 처리 추가
    if (activeMenu === "강의실 관리") {
      return <ClassroomManagement activeSubMenu={activeSubMenu} />
    }

    // 과정 관리 메뉴 처리 추가
    if (activeMenu === "과정 관리") {
      return <CourseManagement activeSubMenu={activeSubMenu} />
    }

    // 시험 및 성적 메뉴 처리 추가
    if (activeMenu === "시험 및 성적") {
      return <ExamManagement activeSubMenu={activeSubMenu} />
    }

    if (!activeSubMenu) {
      return (
        <div className="menu-overview">
          <h2>{activeMenu}</h2>
          <p>좌측 사이드바에서 세부 메뉴를 선택해주세요.</p>
        </div>
      )
    }

    return (
      <div className="content-area">
        <div className="content-header">
          <h2>{activeSubMenu}</h2>
          <div className="breadcrumb">
            <span>{activeMenu}</span>
            <span className="separator">{">"}</span>
            <span>{activeSubMenu}</span>
          </div>
        </div>
        <div className="content-body">
          <div className="placeholder-content">
            <h3>{activeSubMenu} 화면</h3>
            <p>이곳에 {activeSubMenu} 관련 내용이 표시됩니다.</p>
            <div className="sample-table">
              <table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>샘플 데이터 1</td>
                    <td>홍길동</td>
                    <td>2024-01-15</td>
                    <td>
                      <span className="status active">활성</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>샘플 데이터 2</td>
                    <td>김철수</td>
                    <td>2024-01-14</td>
                    <td>
                      <span className="status inactive">비활성</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <main className="main-content">{renderContent()}</main>
}

export default MainContent
