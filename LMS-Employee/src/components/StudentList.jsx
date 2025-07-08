"use client"
import { useState } from "react"
import "../styles/StudentList.css"

const StudentList = ({ onStudentSelect }) => {
  // 샘플 학생 데이터
  const [students] = useState([
    {
      id: 1,
      name: "김학생",
      studentId: "2024001",
      course: "웹개발 과정",
      grade: "A",
      phone: "010-1111-2222",
      email: "kim.student@email.com",
      enrollDate: "2024-01-15",
      status: "재학",
      photo: "👨‍🎓",
    },
    {
      id: 2,
      name: "이학생",
      studentId: "2024002",
      course: "데이터분석 과정",
      grade: "B+",
      phone: "010-2222-3333",
      email: "lee.student@email.com",
      enrollDate: "2024-01-20",
      status: "재학",
      photo: "👩‍🎓",
    },
    {
      id: 3,
      name: "박학생",
      studentId: "2024003",
      course: "웹개발 과정",
      grade: "A-",
      phone: "010-3333-4444",
      email: "park.student@email.com",
      enrollDate: "2024-02-01",
      status: "휴학",
      photo: "👨‍🎓",
    },
    {
      id: 4,
      name: "최학생",
      studentId: "2024004",
      course: "모바일앱 과정",
      grade: "B",
      phone: "010-4444-5555",
      email: "choi.student@email.com",
      enrollDate: "2024-02-15",
      status: "재학",
      photo: "👩‍🎓",
    },
    {
      id: 5,
      name: "정학생",
      studentId: "2024005",
      course: "데이터분석 과정",
      grade: "A+",
      phone: "010-5555-6666",
      email: "jung.student@email.com",
      enrollDate: "2024-03-01",
      status: "수료",
      photo: "👨‍🎓",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCourse, setFilterCourse] = useState("전체")
  const [filterStatus, setFilterStatus] = useState("전체")

  const courses = ["전체", "웹개발 과정", "데이터분석 과정", "모바일앱 과정"]
  const statuses = ["전체", "재학", "휴학", "수료"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = filterCourse === "전체" || student.course === filterCourse
    const matchesStatus = filterStatus === "전체" || student.status === filterStatus
    return matchesSearch && matchesCourse && matchesStatus
  })

  return (
    <div className="student-list">
      <div className="student-list-header">
        <h2>학생 목록</h2>
        <p>전체 학생 정보를 관리할 수 있습니다.</p>
      </div>

      <div className="student-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="학생 이름, 학번, 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="course-filter">
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="status-filter">
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="student-stats">
        <div className="stat-item">
          <span className="stat-number">{students.length}</span>
          <span className="stat-label">전체 학생</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{students.filter((s) => s.status === "재학").length}</span>
          <span className="stat-label">재학생</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{students.filter((s) => s.status === "휴학").length}</span>
          <span className="stat-label">휴학생</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{students.filter((s) => s.status === "수료").length}</span>
          <span className="stat-label">수료생</span>
        </div>
      </div>

      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>학번</th>
              <th>이름</th>
              <th>과정</th>
              <th>성적</th>
              <th>연락처</th>
              <th>입학일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="student-row" onClick={() => onStudentSelect(student)}>
                <td className="student-id">{student.studentId}</td>
                <td className="student-name">{student.name}</td>
                <td>{student.course}</td>
                <td>
                  <span className={`grade grade-${student.grade.replace("+", "plus").replace("-", "minus")}`}>
                    {student.grade}
                  </span>
                </td>
                <td>{student.phone}</td>
                <td>{student.enrollDate}</td>
                <td>
                  <span className={`status ${student.status}`}>{student.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <p>검색 조건에 맞는 학생이 ��습니다.</p>
        </div>
      )}
    </div>
  )
}

export default StudentList
