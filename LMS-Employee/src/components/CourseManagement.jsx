"use client"
import { useState } from "react"
import CourseList from "./CourseList"
import CourseRegistration from "./CourseRegistration"
import SubjectList from "./SubjectList"
import SubjectRegistration from "./SubjectRegistration"
import "../styles/CourseManagement.css"

const CourseManagement = ({ activeSubMenu }) => {
  // 샘플 데이터
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "웹 개발 기초 과정",
      instructor: "김개발",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      classroom: "A101",
      schedule: "월,수,금 14:00-17:00",
      maxStudents: 20,
      minStudents: 5,
      currentStudents: 15,
      status: "진행중",
      subjects: ["HTML/CSS", "JavaScript", "React"],
    },
    {
      id: 2,
      name: "데이터베이스 관리 과정",
      instructor: "박데이터",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      classroom: "B201",
      schedule: "화,목 10:00-13:00",
      maxStudents: 15,
      minStudents: 3,
      currentStudents: 12,
      status: "진행중",
      subjects: ["SQL 기초", "데이터 모델링"],
    },
  ])

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "HTML/CSS",
      category: "웹 개발",
      difficulty: "초급",
      duration: "40시간",
      description: "웹 페이지의 구조와 스타일링을 학습합니다.",
      prerequisites: [],
      objectives: ["HTML 태그의 올바른 사용법 이해", "CSS를 활용한 스타일링 기법 습득", "반응형 웹 디자인 구현"],
      details: [
        { id: 1, title: "HTML 기초", content: "HTML 태그와 구조" },
        { id: 2, title: "CSS 기초", content: "CSS 선택자와 속성" },
        { id: 3, title: "레이아웃", content: "Flexbox와 Grid" },
      ],
    },
    {
      id: 2,
      name: "JavaScript",
      category: "웹 개발",
      difficulty: "중급",
      duration: "60시간",
      description: "동적인 웹 페이지 구현을 위한 JavaScript를 학습합니다.",
      prerequisites: ["HTML/CSS"],
      objectives: ["JavaScript 기본 문법 이해", "DOM 조작 기법 습득", "비동기 프로그래밍 이해"],
      details: [
        { id: 1, title: "변수와 함수", content: "기본 문법과 함수" },
        { id: 2, title: "DOM 조작", content: "요소 선택과 이벤트" },
        { id: 3, title: "비동기 처리", content: "Promise와 async/await" },
      ],
    },
  ])

  const renderContent = () => {
    switch (activeSubMenu) {
      case "과정 리스트":
        return <CourseList courses={courses} setCourses={setCourses} />
      case "과정 등록":
        return <CourseRegistration courses={courses} setCourses={setCourses} subjects={subjects} />
      case "과목 리스트":
        return <SubjectList subjects={subjects} setSubjects={setSubjects} />
      case "과목 등록":
        return <SubjectRegistration subjects={subjects} setSubjects={setSubjects} />
      default:
        return (
          <div className="course-overview">
            <h2>과정 관리</h2>
            <p>좌측 사이드바에서 메뉴를 선택해주세요.</p>
            <div className="overview-stats">
              <div className="stat-card">
                <h3>전체 과정</h3>
                <p>{courses.length}개</p>
              </div>
              <div className="stat-card">
                <h3>전체 과목</h3>
                <p>{subjects.length}개</p>
              </div>
              <div className="stat-card">
                <h3>총 수강생</h3>
                <p>{courses.reduce((sum, c) => sum + c.currentStudents, 0)}명</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return <div className="course-management">{renderContent()}</div>
}

export default CourseManagement
