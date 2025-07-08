"use client"
import { useState } from "react"
import "../styles/StaffList.css"

const StaffList = ({ onStaffSelect }) => {
  // 샘플 직원 데이터
  const [staffList] = useState([
    {
      id: 1,
      name: "김직원",
      position: "일반직원",
      department: "교무팀",
      email: "kim@lmsync.com",
      phone: "010-1234-5678",
      joinDate: "2023-03-15",
      status: "활성",
    },
    {
      id: 2,
      name: "이직원",
      position: "일반직원",
      department: "행정팀",
      email: "lee@lmsync.com",
      phone: "010-2345-6789",
      joinDate: "2023-05-20",
      status: "활성",
    },
    {
      id: 3,
      name: "박직원",
      position: "일반직원",
      department: "교무팀",
      email: "park@lmsync.com",
      phone: "010-3456-7890",
      joinDate: "2023-07-10",
      status: "비활성",
    },
    {
      id: 4,
      name: "최직원",
      position: "일반직원",
      department: "행정팀",
      email: "choi@lmsync.com",
      phone: "010-4567-8901",
      joinDate: "2023-09-05",
      status: "활성",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("전체")

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "전체" || staff.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="staff-list">
      <div className="staff-list-header">
        <h2>직원 권한 관리</h2>
        <p>직원을 선택하여 권한을 관리하세요.</p>
      </div>

      <div className="staff-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="직원 이름 또는 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="department-filter"
        >
          <option value="전체">전체 부서</option>
          <option value="교무팀">교무팀</option>
          <option value="행정팀">행정팀</option>
        </select>
      </div>

      <div className="staff-grid">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className={`staff-card ${staff.status === "비활성" ? "inactive" : ""}`}
            onClick={() => onStaffSelect(staff)}
          >
            <div className="staff-avatar">👤</div>
            <div className="staff-info">
              <h3 className="staff-name">{staff.name}</h3>
              <p className="staff-position">{staff.position}</p>
              <p className="staff-department">{staff.department}</p>
              <p className="staff-email">{staff.email}</p>
              <div className="staff-meta">
                <span className="join-date">입사: {staff.joinDate}</span>
                <span className={`status ${staff.status === "활성" ? "active" : "inactive"}`}>{staff.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="no-results">
          <p>검색 조건에 맞는 직원이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default StaffList
