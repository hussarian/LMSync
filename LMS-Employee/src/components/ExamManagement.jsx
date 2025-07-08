"use client"
import { useState } from "react"
import ExamCourseList from "./ExamCourseList"
import SubjectQuestionList from "./SubjectQuestionList"
import "../styles/ExamManagement.css"

const ExamManagement = ({ activeSubMenu }) => {
  // 샘플 데이터
  const [courses] = useState([
    {
      id: 1,
      name: "웹 개발 기초 과정",
      instructor: "김개발",
      period: "2024-01-15 ~ 2024-03-15",
      status: "진행중",
      totalExams: 5,
      subjects: [
        { id: 1, name: "HTML/CSS", averageScore: 85.5, examCount: 2 },
        { id: 2, name: "JavaScript", averageScore: 78.2, examCount: 2 },
        { id: 3, name: "React", averageScore: 82.1, examCount: 1 },
      ],
      students: [
        { id: 1, name: "홍길동", scores: { "HTML/CSS": 88, JavaScript: 75, React: 85 } },
        { id: 2, name: "김철수", scores: { "HTML/CSS": 92, JavaScript: 82, React: 78 } },
        { id: 3, name: "이영희", scores: { "HTML/CSS": 76, JavaScript: 77, React: 84 } },
      ],
    },
    {
      id: 2,
      name: "데이터베이스 관리 과정",
      instructor: "박데이터",
      period: "2024-02-01 ~ 2024-04-01",
      status: "진행중",
      totalExams: 3,
      subjects: [
        { id: 4, name: "SQL 기초", averageScore: 90.3, examCount: 2 },
        { id: 5, name: "데이터 모델링", averageScore: 87.8, examCount: 1 },
      ],
      students: [
        { id: 4, name: "최민수", scores: { "SQL 기초": 95, "데이터 모델링": 89 } },
        { id: 5, name: "정수진", scores: { "SQL 기초": 88, "데이터 모델링": 91 } },
      ],
    },
  ])

  const [subjects] = useState([
    {
      id: 1,
      name: "HTML/CSS",
      instructor: "김개발",
      category: "웹 개발",
      difficulty: "초급",
      questions: [
        { id: 1, title: "HTML 태그의 기본 구조", type: "객관식", difficulty: "초급", points: 10 },
        { id: 2, title: "CSS 선택자 활용", type: "주관식", difficulty: "중급", points: 15 },
        { id: 3, title: "반응형 웹 디자인", type: "서술형", difficulty: "고급", points: 20 },
      ],
    },
    {
      id: 2,
      name: "JavaScript",
      instructor: "김개발",
      category: "웹 개발",
      difficulty: "중급",
      questions: [
        { id: 4, title: "변수와 데이터 타입", type: "객관식", difficulty: "초급", points: 10 },
        { id: 5, title: "함수와 스코프", type: "주관식", difficulty: "중급", points: 15 },
        { id: 6, title: "비동기 프로그래밍", type: "코딩", difficulty: "고급", points: 25 },
      ],
    },
    {
      id: 3,
      name: "SQL 기초",
      instructor: "박데이터",
      category: "데이터베이스",
      difficulty: "초급",
      questions: [
        { id: 7, title: "SELECT 문 기초", type: "객관식", difficulty: "초급", points: 10 },
        { id: 8, title: "JOIN 연산", type: "주관식", difficulty: "중급", points: 15 },
        { id: 9, title: "서브쿼리 활용", type: "서술형", difficulty: "고급", points: 20 },
      ],
    },
  ])

  const renderContent = () => {
    switch (activeSubMenu) {
      case "과정 리스트":
        return <ExamCourseList courses={courses} />
      case "과목 문제 리스트":
        return <SubjectQuestionList subjects={subjects} />
      default:
        return (
          <div className="exam-overview">
            <h2>시험 및 성적 관리</h2>
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
                <h3>총 문제 수</h3>
                <p>{subjects.reduce((sum, subject) => sum + subject.questions.length, 0)}개</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return <div className="exam-management">{renderContent()}</div>
}

export default ExamManagement
