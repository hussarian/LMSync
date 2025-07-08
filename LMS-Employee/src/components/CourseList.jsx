"use client"
import { useState } from "react"
import CourseDetail from "./CourseDetail"
import "../styles/CourseList.css"

const CourseList = ({ courses, setCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("전체")

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedCourse(null)
  }

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)))
    setSelectedCourse(updatedCourse)
  }

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId))
    handleCloseDetail()
  }

  const getFilteredCourses = () => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "전체" || course.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "진행중":
        return "active"
      case "모집중":
        return "recruiting"
      case "완료":
        return "completed"
      case "대기":
        return "waiting"
      default:
        return ""
    }
  }

  const filteredCourses = getFilteredCourses()

  return (
    <div className="course-list">
      <div className="course-list-header">
        <h2>과정 리스트</h2>
        <p>등록된 모든 과정을 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="course-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="과정명 또는 강사명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>상태</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="전체">전체</option>
            <option value="모집중">모집중</option>
            <option value="진행중">진행중</option>
            <option value="완료">완료</option>
            <option value="대기">대기</option>
          </select>
        </div>
      </div>

      <div className="course-stats">
        <div className="stat-item">
          <span className="stat-number">{courses.length}</span>
          <span className="stat-label">전체 과정</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.filter((c) => c.status === "진행중").length}</span>
          <span className="stat-label">진행중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.filter((c) => c.status === "모집중").length}</span>
          <span className="stat-label">모집중</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{courses.reduce((sum, c) => sum + c.currentStudents, 0)}</span>
          <span className="stat-label">총 수강생</span>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => {
          const subjectsArr = Array.isArray(course.subjects) ? course.subjects : []

          return (
            <div key={course.id} className="course-card" onClick={() => handleCourseClick(course)}>
              <div className="course-header">
                <h3>{course.name}</h3>
                <span className={`course-status ${getStatusColor(course.status)}`}>{course.status}</span>
              </div>

              <div className="course-info">
                <div className="info-row">
                  <span className="label">강사:</span>
                  <span className="value">{course.instructor}</span>
                </div>
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
                  <span className="value">
                    {course.currentStudents}/{course.maxStudents}명
                  </span>
                </div>
              </div>

              <div className="course-subjects">
                <span className="subjects-label">과목:</span>
                <div className="subjects-list">
                  {subjectsArr.slice(0, 2).map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                  {subjectsArr.length > 2 && <span className="subject-more">+{subjectsArr.length - 2}</span>}
                </div>
              </div>

              <div className="course-progress">
                <div className="progress-info">
                  <span>수강생 모집률</span>
                  <span>{Math.round((course.currentStudents / course.maxStudents) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(course.currentStudents / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>조건에 맞는 과정이 없습니다</h3>
          <p>검색 조건을 변경하거나 새로운 과정을 등록해보세요.</p>
        </div>
      )}

      {showDetail && selectedCourse && (
        <CourseDetail
          course={selectedCourse}
          onClose={handleCloseDetail}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
        />
      )}
    </div>
  )
}

export default CourseList
