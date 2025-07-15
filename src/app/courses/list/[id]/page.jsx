"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Users, Calendar, Clock, DollarSign, User, Edit, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/ui/page-layout"
import Sidebar from "@/components/layout/sidebar"
import Link from "next/link"

export default function CourseDetailPage({ params }) {
  const { id } = params

  const sidebarMenuItems = [
    { href: "/courses/list", label: "과정 리스트", key: "course-list" },
    { href: "/courses/register", label: "과정 등록", key: "course-register" },
    { href: "/courses/subjects", label: "과목 리스트", key: "subject-list" },
    { href: "/courses/subjects/register", label: "과목 등록", key: "subject-register" },
    { href: "/courses/detail", label: "세부 과목 목록", key: "subject-detail" },
  ]

  // 더미 과정 상세 데이터 (실제로는 API에서 가져올 데이터)
  const courseData = {
    C001: {
      id: "C001",
      name: "웹 개발 풀스택 과정",
      category: "프로그래밍",
      instructor: "김강사",
      duration: "6개월",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      students: 25,
      maxStudents: 30,
      status: "진행중",
      description:
        "HTML, CSS, JavaScript, React, Node.js를 활용한 풀스택 웹 개발 과정입니다. 실무 중심의 프로젝트를 통해 실제 웹 애플리케이션을 개발할 수 있는 능력을 기릅니다.",
      price: "1,200,000원",
      schedule: "월, 수, 금 19:00-22:00",
      location: "강의실 A-101",
      prerequisites: "컴퓨터 기초 지식",
      objectives: [
        "HTML/CSS를 활용한 웹 페이지 제작",
        "JavaScript 프로그래밍 기초 및 응용",
        "React를 활용한 프론트엔드 개발",
        "Node.js를 활용한 백엔드 개발",
        "데이터베이스 연동 및 API 개발",
        "실무 프로젝트 완성",
      ],
      curriculum: [
        { week: "1-2주", topic: "HTML/CSS 기초", description: "웹 표준과 시맨틱 마크업" },
        { week: "3-4주", topic: "JavaScript 기초", description: "변수, 함수, 객체, DOM 조작" },
        { week: "5-8주", topic: "JavaScript 심화", description: "비동기 처리, ES6+, 모듈 시스템" },
        { week: "9-12주", topic: "React 기초", description: "컴포넌트, 상태관리, 라이프사이클" },
        { week: "13-16주", topic: "React 심화", description: "라우팅, 상태관리 라이브러리" },
        { week: "17-20주", topic: "Node.js & Express", description: "서버 개발, API 구축" },
        { week: "21-24주", topic: "데이터베이스 & 프로젝트", description: "MongoDB 연동, 최종 프로젝트" },
      ],
      enrolledStudents: [
        { id: "20240001", name: "김학생", department: "컴퓨터공학과", enrollDate: "2024-02-15" },
        { id: "20240002", name: "이학생", department: "경영학과", enrollDate: "2024-02-16" },
        { id: "20240003", name: "박민수", department: "전자공학과", enrollDate: "2024-02-17" },
        { id: "20240004", name: "최지영", department: "디자인학과", enrollDate: "2024-02-18" },
        { id: "20240005", name: "정수현", department: "영어영문학과", enrollDate: "2024-02-19" },
      ],
    },
    C002: {
      id: "C002",
      name: "데이터 분석 기초 과정",
      category: "데이터사이언스",
      instructor: "이교수",
      duration: "3개월",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      students: 18,
      maxStudents: 20,
      status: "진행중",
      description:
        "Python, Pandas, NumPy를 활용한 데이터 분석 기초 과정입니다. 실제 데이터를 활용한 분석 실습을 통해 데이터 사이언티스트로서의 기초 역량을 기릅니다.",
      price: "800,000원",
      schedule: "화, 목 19:00-22:00",
      location: "강의실 B-201",
      prerequisites: "Python 기초 지식",
      objectives: [
        "Python 데이터 분석 라이브러리 활용",
        "데이터 전처리 및 정제",
        "통계 분석 기초",
        "데이터 시각화",
        "실무 데이터 분석 프로젝트",
      ],
      curriculum: [
        { week: "1-2주", topic: "Python 기초 복습", description: "데이터 분석을 위한 Python 기초" },
        { week: "3-4주", topic: "NumPy & Pandas", description: "배열 연산과 데이터프레임 조작" },
        { week: "5-6주", topic: "데이터 전처리", description: "결측치 처리, 이상치 탐지" },
        { week: "7-8주", topic: "통계 분석", description: "기술통계, 가설검정" },
        { week: "9-10주", topic: "데이터 시각화", description: "Matplotlib, Seaborn 활용" },
        { week: "11-12주", topic: "프로젝트", description: "실무 데이터 분석 프로젝트" },
      ],
      enrolledStudents: [
        { id: "20240006", name: "한소영", department: "수학과", enrollDate: "2024-02-10" },
        { id: "20240007", name: "윤태호", department: "물리학과", enrollDate: "2024-02-11" },
        { id: "20240008", name: "강미래", department: "화학과", enrollDate: "2024-02-12" },
      ],
    },
  }

  const course = courseData[id] || {
    id: id,
    name: "과정 정보 없음",
    category: "-",
    instructor: "-",
    duration: "-",
    startDate: "-",
    endDate: "-",
    students: 0,
    maxStudents: 0,
    status: "정보없음",
    description: "해당 과정의 정보를 찾을 수 없습니다.",
    price: "-",
    schedule: "-",
    location: "-",
    prerequisites: "-",
    objectives: [],
    curriculum: [],
    enrolledStudents: [],
  }

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(course)
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [availableSubjects, setAvailableSubjects] = useState([
    { id: "S001", name: "HTML/CSS 기초", description: "웹 표준과 시맨틱 마크업", duration: "2주" },
    { id: "S002", name: "JavaScript 기초", description: "변수, 함수, 객체, DOM 조작", duration: "2주" },
    { id: "S003", name: "JavaScript 심화", description: "비동기 처리, ES6+, 모듈 시스템", duration: "4주" },
    { id: "S004", name: "React 기초", description: "컴포넌트, 상태관리, 라이프사이클", duration: "4주" },
    { id: "S005", name: "React 심화", description: "라우팅, 상태관리 라이브러리", duration: "4주" },
    { id: "S006", name: "Node.js & Express", description: "서버 개발, API 구축", duration: "4주" },
    { id: "S007", name: "데이터베이스 연동", description: "MongoDB 연동, 최종 프로젝트", duration: "4주" },
    { id: "S008", name: "Python 기초", description: "데이터 분석을 위한 Python 기초", duration: "2주" },
    { id: "S009", name: "NumPy & Pandas", description: "배열 연산과 데이터프레임 조작", duration: "2주" },
    { id: "S010", name: "데이터 시각화", description: "Matplotlib, Seaborn 활용", duration: "2주" },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "#1ABC9C"
      case "모집중":
        return "#3498db"
      case "마감":
        return "#f39c12"
      case "완료":
        return "#95A5A6"
      default:
        return "#95A5A6"
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(course)
  }

  const handleSave = () => {
    console.log("저장된 데이터:", formData)
    alert(`${formData.name} 과정 정보가 수정되었습니다.`)
    setIsEditing(false)
    // 실제로는 여기서 API 호출하여 데이터 저장
  }

  const handleCancel = () => {
    setFormData(course)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddStudent = () => {
    console.log("수강생 추가")
    alert("수강생 추가 기능을 구현합니다.")
  }

  const handleOpenSubjectModal = () => {
    setIsSubjectModalOpen(true)
  }

  const handleCloseSubjectModal = () => {
    setIsSubjectModalOpen(false)
  }

  const handleSelectSubject = (subject) => {
    const newCurriculumItem = {
      week: subject.duration,
      topic: subject.name,
      description: subject.description,
    }
    const newCurriculum = [...formData.curriculum, newCurriculumItem]
    handleInputChange("curriculum", newCurriculum)
    setIsSubjectModalOpen(false)
  }

  return (
    <PageLayout currentPage="courses">
      <div className="flex">
        <Sidebar title="과정 관리" menuItems={sidebarMenuItems} currentPath="/courses/list" />

        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link href="/courses/list">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>목록으로</span>
                    </Button>
                  </Link>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
                      과정 상세 정보
                    </h1>
                    <p className="text-lg" style={{ color: "#95A5A6" }}>
                      {course.name} 과정의 상세 정보입니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                        style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                      >
                        <span>취소</span>
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="text-white font-medium flex items-center space-x-2"
                        style={{ backgroundColor: "#1ABC9C" }}
                      >
                        <span>저장</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleAddStudent}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                        style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>수강생 추가</span>
                      </Button>
                      <Button
                        onClick={handleEdit}
                        className="text-white font-medium flex items-center space-x-2"
                        style={{ backgroundColor: "#1ABC9C" }}
                      >
                        <Edit className="w-4 h-4" />
                        <span>정보 수정</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 기본 정보 카드 */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                      style={{ backgroundColor: "#1ABC9C" }}
                    >
                      <BookOpen className="w-8 h-8" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="text-xl font-bold text-center bg-transparent border-b-2 border-emerald-500 focus:outline-none mb-2"
                        style={{ color: "#2C3E50" }}
                      />
                    ) : (
                      <h3 className="text-xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                        {formData.name}
                      </h3>
                    )}
                    <p className="text-sm mb-2" style={{ color: "#95A5A6" }}>
                      {course.id}
                    </p>
                    <Badge className="text-white" style={{ backgroundColor: getStatusColor(course.status) }}>
                      {course.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          카테고리
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {course.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          담당 강사
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          과정 기간
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {course.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          수업 일정
                        </p>
                        <p className="text-sm" style={{ color: "#95A5A6" }}>
                          {course.schedule}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-4 h-4" style={{ color: "#95A5A6" }} />
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                          수강료
                        </p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            className="text-sm font-bold bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none"
                            style={{ color: "#1ABC9C" }}
                          />
                        ) : (
                          <p className="text-sm font-bold" style={{ color: "#1ABC9C" }}>
                            {formData.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 과정 설명 및 목표 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>과정 소개</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#2C3E50" }}>
                      과정 설명
                    </h4>
                    {isEditing ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full text-sm leading-relaxed bg-transparent border border-gray-300 rounded focus:border-emerald-500 focus:outline-none p-3 resize-none"
                        style={{ color: "#95A5A6" }}
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed" style={{ color: "#95A5A6" }}>
                        {formData.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: "#2C3E50" }}>
                      학습 목표
                    </h4>
                    {isEditing ? (
                      <div className="space-y-2">
                        {formData.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-sm mt-2" style={{ color: "#1ABC9C" }}>
                              •
                            </span>
                            <input
                              type="text"
                              value={objective}
                              onChange={(e) => {
                                const newObjectives = [...formData.objectives]
                                newObjectives[index] = e.target.value
                                handleInputChange("objectives", newObjectives)
                              }}
                              className="flex-1 text-sm bg-transparent border-b border-gray-300 focus:border-emerald-500 focus:outline-none py-1"
                              style={{ color: "#95A5A6" }}
                            />
                            <button
                              onClick={() => {
                                const newObjectives = formData.objectives.filter((_, i) => i !== index)
                                handleInputChange("objectives", newObjectives)
                              }}
                              className="text-red-500 hover:text-red-700 text-sm px-2"
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newObjectives = [...formData.objectives, "새로운 학습 목표를 입력하세요"]
                            handleInputChange("objectives", newObjectives)
                          }}
                          className="text-sm px-2 py-1 border border-dashed border-gray-300 rounded hover:border-emerald-500 transition-colors"
                          style={{ color: "#1ABC9C" }}
                        >
                          + 학습 목표 추가
                        </button>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {formData.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-sm mt-1" style={{ color: "#1ABC9C" }}>
                              •
                            </span>
                            <span className="text-sm" style={{ color: "#95A5A6" }}>
                              {objective}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: "#1ABC9C" }}>
                        {course.students}
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        현재 수강생
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                        {course.maxStudents}
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        최대 수강생
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: "#1ABC9C" }}>
                        {Math.round((course.students / course.maxStudents) * 100)}%
                      </div>
                      <div className="text-sm" style={{ color: "#95A5A6" }}>
                        수강률
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 커리큘럼 */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle style={{ color: "#2C3E50" }}>커리큘럼</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      {formData.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-lg border"
                          style={{ backgroundColor: "#f8f9fa", borderColor: "#e0e0e0" }}
                        >
                          <div className="flex-shrink-0">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ backgroundColor: "#1ABC9C" }}
                            >
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.week}
                                onChange={(e) => {
                                  const newCurriculum = [...formData.curriculum]
                                  newCurriculum[index] = { ...item, week: e.target.value }
                                  handleInputChange("curriculum", newCurriculum)
                                }}
                                className="px-2 py-1 text-sm border rounded focus:border-emerald-500 focus:outline-none"
                                style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                                placeholder="주차"
                              />
                              <input
                                type="text"
                                value={item.topic}
                                onChange={(e) => {
                                  const newCurriculum = [...formData.curriculum]
                                  newCurriculum[index] = { ...item, topic: e.target.value }
                                  handleInputChange("curriculum", newCurriculum)
                                }}
                                className="flex-1 px-2 py-1 text-sm font-semibold border rounded focus:border-emerald-500 focus:outline-none"
                                style={{ borderColor: "#95A5A6", color: "#2C3E50" }}
                                placeholder="주제"
                              />
                              <button
                                onClick={() => {
                                  const newCurriculum = formData.curriculum.filter((_, i) => i !== index)
                                  handleInputChange("curriculum", newCurriculum)
                                }}
                                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded hover:border-red-500 transition-colors"
                              >
                                삭제
                              </button>
                            </div>
                            <textarea
                              value={item.description}
                              onChange={(e) => {
                                const newCurriculum = [...formData.curriculum]
                                newCurriculum[index] = { ...item, description: e.target.value }
                                handleInputChange("curriculum", newCurriculum)
                              }}
                              className="w-full text-sm border rounded focus:border-emerald-500 focus:outline-none p-2 resize-none"
                              style={{ borderColor: "#95A5A6", color: "#95A5A6" }}
                              placeholder="설명"
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={handleOpenSubjectModal}
                        className="w-full text-sm px-4 py-3 border-2 border-dashed border-gray-300 rounded hover:border-emerald-500 transition-colors"
                        style={{ color: "#1ABC9C" }}
                      >
                        + 등록된 과목에서 선택하여 추가
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-lg"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <div className="flex-shrink-0">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ backgroundColor: "#1ABC9C" }}
                            >
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold" style={{ color: "#2C3E50" }}>
                                {item.topic}
                              </h5>
                              <Badge variant="outline" style={{ borderColor: "#95A5A6", color: "#95A5A6" }}>
                                {item.week}
                              </Badge>
                            </div>
                            <p className="text-sm" style={{ color: "#95A5A6" }}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 수강생 목록 */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle style={{ color: "#2C3E50" }}>수강생 목록 ({course.enrolledStudents.length}명)</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      style={{ borderColor: "#1ABC9C", color: "#1ABC9C" }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      전체 보기
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b" style={{ borderColor: "#95A5A6" }}>
                          <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            학번
                          </th>
                          <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            이름
                          </th>
                          <th className="text-left py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            학과
                          </th>
                          <th className="text-center py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                            등록일
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.enrolledStudents.slice(0, 5).map((student) => (
                          <tr key={student.id} className="border-b hover:bg-gray-50" style={{ borderColor: "#f1f2f6" }}>
                            <td className="py-3 px-4 font-mono text-sm" style={{ color: "#2C3E50" }}>
                              {student.id}
                            </td>
                            <td className="py-3 px-4 font-medium" style={{ color: "#2C3E50" }}>
                              {student.name}
                            </td>
                            <td className="py-3 px-4" style={{ color: "#95A5A6" }}>
                              {student.department}
                            </td>
                            <td className="py-3 px-4 text-center text-sm" style={{ color: "#95A5A6" }}>
                              {student.enrollDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {course.enrolledStudents.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="w-16 h-16 mx-auto mb-4" style={{ color: "#95A5A6" }} />
                        <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
                          등록된 수강생이 없습니다
                        </h3>
                        <p style={{ color: "#95A5A6" }}>수강생을 추가해보세요.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      {/* 과목 선택 모달 */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#2C3E50" }}>등록된 과목에서 선택</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseSubjectModal} style={{ color: "#95A5A6" }}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="p-4 border rounded-lg hover:border-emerald-500 cursor-pointer transition-colors"
                    style={{ borderColor: "#e0e0e0" }}
                    onClick={() => handleSelectSubject(subject)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold" style={{ color: "#2C3E50" }}>
                        {subject.name}
                      </h4>
                      <Badge variant="outline" style={{ borderColor: "#95A5A6", color: "#95A5A6" }}>
                        {subject.duration}
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: "#95A5A6" }}>
                      {subject.description}
                    </p>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        className="text-white"
                        style={{ backgroundColor: "#1ABC9C" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectSubject(subject)
                        }}
                      >
                        선택
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {availableSubjects.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "#95A5A6" }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
                    등록된 과목이 없습니다
                  </h3>
                  <p style={{ color: "#95A5A6" }}>먼저 과목을 등록해주세요.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
