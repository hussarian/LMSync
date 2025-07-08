"use client"
import { useState } from "react"
import CourseDetailModal from "./CourseDetailModal"
import "../styles/InstructorCourseList.css"

const InstructorCourseList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("전체")
  const [searchTerm, setSearchTerm] = useState("")

  // 샘플 강의 데이터
  const [courses] = useState([
    {
      id: 1,
      name: "웹 개발 기초 과정",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      classroom: "A101",
      schedule: "월,수,금 14:00-17:00",
      students: 15,
      status: "진행중",
      subjects: ["HTML/CSS", "JavaScript", "React"],
      description: "웹 개발의 기초부터 실무까지 배우는 종합 과정입니다.",
      syllabus: {
        objectives: ["HTML/CSS 기초 이해", "JavaScript 활용", "React 컴포넌트 개발"],
        schedule: [
          { week: 1, topic: "HTML 기초", content: "HTML 태그와 구조" },
          { week: 2, topic: "CSS 기초", content: "CSS 선택자와 스타일링" },
          { week: 3, topic: "JavaScript 기초", content: "변수, 함수, 조건문" },
        ],
        evaluation: "중간고사 30%, 기말고사 40%, 과제 30%",
        materials: ["HTML&CSS 완벽가이드", "모던 JavaScript 튜토리얼"],
      },
    },
    {
      id: 2,
      name: "데이터베이스 관리 과정",
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      classroom: "B201",
      schedule: "화,목 10:00-13:00",
      students: 12,
      status: "완료",
      subjects: ["SQL 기초", "데이터 모델링"],
      description: "데이터베이스 설계와 관리를 학습하는 과정입니다.",
      syllabus: null,
    },
    {
      id: 3,
      name: "모바일 앱 개발",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      classroom: "C301",
      schedule: "월,화,수 19:00-22:00",
      students: 8,
      status: "예정",
      subjects: ["Flutter", "React Native"],
      description: "크로스 플랫폼 모바일 앱 개발 과정입니다.",
      syllabus: null,
    },
  ])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedCourse(null)
  }

  const getFilteredCourses = () => {
    return courses.filter((course) => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "전체" || course.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "active"
      case "완료":
        return "completed"
      case "예정":
        return "scheduled"
      default:
        return ""
    }
  }

  const filteredCourses = getFilteredCourses()

  return (
    <div className="instructor-course-list">
      <div className="course-list-header">
        <h2>담당 강의</h2>
        <p>현재 담당하고 있는 강의와 과거 강의 목록입니다.</p>
      </div>

      <div className="course-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="강의명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>상태</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="전체">전체</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
            <option value="예정">예정</option>
          </select>
        </div>
      </div>

      <div className="course-stats">
        <div className="stat-item">
          <span className="stat-number">{courses.length}</span>
          <span className="stat-label">전체 강의</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.filter((c) => c.status === "진행중").length}</span>
          <span className="stat-label">진행중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.filter((c) => c.status === "완료").length}</span>
          <span className="stat-label">완료</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.reduce((sum, c) => sum + c.students, 0)}</span>
          <span className="stat-label">총 수강생</span>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card" onClick={() => handleCourseClick(course)}>
            <div className="course-header">
              <h3>{course.name}</h3>
              <span className={`course-status ${getStatusColor(course.status)}`}>{course.status}</span>
            </div>

            <div className="course-info">
              <div className="info-row">
                <span className="label">기간:</span>
                <span className="value">
                  {course.startDate} ~ {course.endDate}
                </span>
              </div>
              <div className="info-row">
                <span className="label">강의실:</span>
                <span className="value">{course.classroom}</span>
              </div>
              <div className="info-row">
                <span className="label">수강생:</span>
                <span className="value">{course.students}명</span>
              </div>
              <div className="info-row">
                <span className="label">시간:</span>
                <span className="value">{course.schedule}</span>
              </div>
            </div>

            <div className="course-subjects">
              <span className="subjects-label">과목:</span>
              <div className="subjects-list">
                {course.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>조건에 맞는 강의가 없습니다</h3>
          <p>검색 조건을 변경해보세요.</p>
        </div>
      )}

      {showDetailModal && selectedCourse && <CourseDetailModal course={selectedCourse} onClose={handleCloseModal} />}
    </div>
  )
}

export default InstructorCourseList
