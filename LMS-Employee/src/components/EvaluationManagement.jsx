"use client"
import { useState } from "react"
import EvaluationItems from "./EvaluationItems"
import TemplateList from "./TemplateList"
import CourseList from "./CourseList"
import "../styles/EvaluationManagement.css"

const EvaluationManagement = ({ activeSubMenu }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "강의 내용이 이해하기 쉬웠나요?",
      type: "rating",
      category: "강의 내용",
      required: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      question: "강사의 설명이 명확했나요?",
      type: "rating",
      category: "강사",
      required: true,
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      question: "강의 진행 속도는 적절했나요?",
      type: "rating",
      category: "강의 진행",
      required: true,
      createdAt: "2024-01-16",
    },
    {
      id: 4,
      question: "실습 시간이 충분했나요?",
      type: "rating",
      category: "실습",
      required: false,
      createdAt: "2024-01-16",
    },
    {
      id: 5,
      question: "강의실 환경은 어떠셨나요?",
      type: "rating",
      category: "환경",
      required: false,
      createdAt: "2024-01-17",
    },
    {
      id: 6,
      question: "추가로 개선했으면 하는 점이 있다면 자유롭게 작성해주세요.",
      type: "text",
      category: "기타",
      required: false,
      createdAt: "2024-01-17",
    },
  ])

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "기본 강의 평가",
      description: "일반적인 강의 평가를 위한 기본 템플릿",
      questionIds: [1, 2, 3],
      usedInCourses: ["웹개발 기초", "데이터베이스 설계"],
      createdAt: "2024-01-18",
      isActive: true,
    },
    {
      id: 2,
      name: "실습 중심 평가",
      description: "실습이 많은 강의를 위한 평가 템플릿",
      questionIds: [1, 2, 4, 5],
      usedInCourses: ["React 프로젝트"],
      createdAt: "2024-01-19",
      isActive: true,
    },
  ])

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "웹개발 기초",
      instructor: "김강사",
      period: "2024-01-15 ~ 2024-03-15",
      students: 25,
      templateId: 1,
      templateName: "기본 강의 평가",
      evaluationStatus: "완료",
      completedEvaluations: 23,
      totalStudents: 25,
    },
    {
      id: 2,
      name: "데이터베이스 설계",
      instructor: "이강사",
      period: "2024-02-01 ~ 2024-04-01",
      students: 20,
      templateId: 1,
      templateName: "기본 강의 평가",
      evaluationStatus: "진행중",
      completedEvaluations: 15,
      totalStudents: 20,
    },
    {
      id: 3,
      name: "React 프로젝트",
      instructor: "박강사",
      period: "2024-01-20 ~ 2024-03-20",
      students: 18,
      templateId: 2,
      templateName: "실습 중심 평가",
      evaluationStatus: "미시작",
      completedEvaluations: 0,
      totalStudents: 18,
    },
    {
      id: 4,
      name: "Python 기초",
      instructor: "최강사",
      period: "2024-02-15 ~ 2024-04-15",
      students: 22,
      templateId: null,
      templateName: null,
      evaluationStatus: "미설정",
      completedEvaluations: 0,
      totalStudents: 22,
    },
  ])

  const renderContent = () => {
    switch (activeSubMenu) {
      case "평가 항목":
        return (
          <EvaluationItems
            questions={questions}
            setQuestions={setQuestions}
            templates={templates}
            setTemplates={setTemplates}
          />
        )
      case "템플릿 목록":
        return (
          <TemplateList templates={templates} setTemplates={setTemplates} questions={questions} courses={courses} />
        )
      case "강의 리스트":
        return <CourseList courses={courses} setCourses={setCourses} templates={templates} />
      default:
        return (
          <div className="evaluation-overview">
            <h2>설문 평가 관리</h2>
            <p>좌측 사이드바에서 메뉴를 선택해주세요.</p>
          </div>
        )
    }
  }

  return <div className="evaluation-management">{renderContent()}</div>
}

export default EvaluationManagement
