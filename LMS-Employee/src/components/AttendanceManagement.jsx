"use client"
import { useState } from "react"
import "../styles/AttendanceManagement.css"

const AttendanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const [editingRecord, setEditingRecord] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({
    date: "",
    status: "",
    time: "",
    note: "",
    reason: "",
    attachedFile: null,
  })

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  })

  // 샘플 학생 데이터
  const students = [
    { id: 1, name: "김학생", studentId: "2024001", course: "웹개발 과정", photo: "👨‍🎓" },
    { id: 2, name: "이학생", studentId: "2024002", course: "데이터분석 과정", photo: "👩‍🎓" },
    { id: 3, name: "박학생", studentId: "2024003", course: "웹개발 과정", photo: "👨‍🎓" },
    { id: 4, name: "최학생", studentId: "2024004", course: "모바일앱 과정", photo: "👩‍🎓" },
  ]

  // 샘플 출석 데이터
  const attendanceData = {
    1: {
      student: students[0],
      records: [
        { date: "2024-01-15", status: "출석", time: "09:00", note: "" },
        { date: "2024-01-16", status: "출석", time: "09:05", note: "지각" },
        { date: "2024-01-17", status: "결석", time: "", note: "병가" },
        { date: "2024-01-18", status: "출석", time: "08:55", note: "" },
        { date: "2024-01-19", status: "출석", time: "09:00", note: "" },
        { date: "2024-01-22", status: "출석", time: "09:10", note: "지각" },
        { date: "2024-01-23", status: "출석", time: "08:58", note: "" },
        { date: "2024-01-24", status: "결석", time: "", note: "개인사정" },
      ],
    },
    2: {
      student: students[1],
      records: [
        { date: "2024-01-15", status: "출석", time: "09:00", note: "" },
        { date: "2024-01-16", status: "출석", time: "08:55", note: "" },
        { date: "2024-01-17", status: "출석", time: "09:00", note: "" },
        { date: "2024-01-18", status: "출석", time: "09:02", note: "" },
        { date: "2024-01-19", status: "출석", time: "08:58", note: "" },
      ],
    },
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    if (value.length > 0) {
      const results = students.filter(
        (student) =>
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.studentId.includes(value) ||
          student.course.toLowerCase().includes(value.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const getFilteredRecords = (records) => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
      return records
    }

    return records.filter((record) => {
      const recordDate = new Date(record.date)
      const startDate = dateFilter.startDate ? new Date(dateFilter.startDate) : null
      const endDate = dateFilter.endDate ? new Date(dateFilter.endDate) : null

      if (startDate && endDate) {
        return recordDate >= startDate && recordDate <= endDate
      } else if (startDate) {
        return recordDate >= startDate
      } else if (endDate) {
        return recordDate <= endDate
      }

      return true
    })
  }

  const generateCSV = () => {
    if (!selectedStudent || !attendanceData[selectedStudent.id]) {
      alert("학생을 선택해주세요.")
      return
    }

    const records = getFilteredRecords(attendanceData[selectedStudent.id].records)

    if (records.length === 0) {
      alert("선택한 날짜 범위에 출석 기록이 없습니다.")
      return
    }

    // CSV 헤더
    const headers = ["날짜", "출석상태", "시간", "비고"]

    // CSV 데이터
    const csvData = records.map((record) => [record.date, record.status, record.time || "", record.note || ""])

    // CSV 문자열 생성
    const csvContent = [
      `학생명: ${selectedStudent.name}`,
      `학번: ${selectedStudent.studentId}`,
      `과정: ${selectedStudent.course}`,
      `출력일: ${new Date().toLocaleDateString()}`,
      "",
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n")

    // 파일 다운로드
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${selectedStudent.name}_출석부_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
    setSearchResults([])
    setSearchTerm("")
  }

  const getAttendanceStats = (records) => {
    const total = records.length
    const attended = records.filter((r) => r.status === "출석").length
    const absent = records.filter((r) => r.status === "결석").length
    const late = records.filter((r) => r.note === "지각").length
    const rate = total > 0 ? ((attended / total) * 100).toFixed(1) : 0

    return { total, attended, absent, late, rate }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "출석":
        return "present"
      case "결석":
        return "absent"
      case "지각":
        return "late"
      default:
        return ""
    }
  }

  const handleEditRecord = (record, index) => {
    setEditingRecord({ ...record, index })
    setEditFormData({
      date: record.date,
      status: record.status,
      time: record.time,
      note: record.note,
      reason: "",
      attachedFile: null,
    })
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    // 실제로는 서버에 수정 요청
    alert("출석 기록이 수정되었습니다.")
    setShowEditModal(false)
    setEditingRecord(null)
  }

  const handleFileAttach = (e) => {
    const file = e.target.files[0]
    setEditFormData((prev) => ({
      ...prev,
      attachedFile: file,
    }))
  }

  return (
    <div className="attendance-management">
      <div className="attendance-header">
        <h2>학생 출/결 처리</h2>
        <p>학생을 검색하여 출석부를 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="학생 이름, 학번, 과정명으로 검색..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="student-search-input"
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((student) => (
                <div key={student.id} className="search-result-item" onClick={() => handleStudentSelect(student)}>
                  <div className="result-photo">{student.photo}</div>
                  <div className="result-info">
                    <div className="result-name">{student.name}</div>
                    <div className="result-details">
                      {student.studentId} | {student.course}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedStudent ? (
        <div className="attendance-content">
          <div className="student-info-card">
            <div className="student-photo">{selectedStudent.photo}</div>
            <div className="student-details">
              <h3>{selectedStudent.name}</h3>
              <p>학번: {selectedStudent.studentId}</p>
              <p>과정: {selectedStudent.course}</p>
            </div>
            <button className="change-student-btn" onClick={() => setSelectedStudent(null)}>
              다른 학생 선택
            </button>
          </div>

          {attendanceData[selectedStudent.id] && (
            <>
              <div className="attendance-stats">
                {(() => {
                  const stats = getAttendanceStats(attendanceData[selectedStudent.id].records)
                  return (
                    <>
                      <div className="stat-card">
                        <span className="stat-number">{stats.rate}%</span>
                        <span className="stat-label">출석률</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">{stats.attended}</span>
                        <span className="stat-label">출석</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">{stats.absent}</span>
                        <span className="stat-label">결석</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">{stats.late}</span>
                        <span className="stat-label">지각</span>
                      </div>
                    </>
                  )
                })()}
              </div>

              <div className="attendance-table-container">
                <div className="table-header">
                  <h3>출석부</h3>
                  <div className="table-controls">
                    <div className="date-filter">
                      <input
                        type="date"
                        value={dateFilter.startDate}
                        onChange={(e) => setDateFilter((prev) => ({ ...prev, startDate: e.target.value }))}
                        placeholder="시작일"
                      />
                      <span>~</span>
                      <input
                        type="date"
                        value={dateFilter.endDate}
                        onChange={(e) => setDateFilter((prev) => ({ ...prev, endDate: e.target.value }))}
                        placeholder="종료일"
                      />
                    </div>
                    <button className="export-btn" onClick={generateCSV}>
                      출석부 출력
                    </button>
                  </div>
                </div>
                <div className="table-wrapper">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>출석상태</th>
                        <th>시간</th>
                        <th>비고</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredRecords(attendanceData[selectedStudent.id].records).map((record, index) => (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>
                            <span className={`attendance-status ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td>{record.time}</td>
                          <td>{record.note}</td>
                          <td>
                            <button className="edit-record-btn" onClick={() => handleEditRecord(record, index)}>
                              수정
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>학생을 검색해주세요</h3>
          <p>위의 검색창에서 학생 이름, 학번, 또는 과정명으로 검색하여 출석부를 확인할 수 있습니다.</p>
        </div>
      )}

      {showEditModal && (
        <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>출석 기록 수정</h3>
              <button onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-content">
              <div className="edit-form">
                <div className="form-group">
                  <label>날짜</label>
                  <input
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>출석 상태</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="출석">출석</option>
                    <option value="지각">지각</option>
                    <option value="조퇴">조퇴</option>
                    <option value="결석">결석</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>시간</label>
                  <input
                    type="time"
                    value={editFormData.time}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label>기존 비고</label>
                  <input
                    type="text"
                    value={editFormData.note}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="기존 비고 내용"
                  />
                </div>

                <div className="form-group">
                  <label>수정 사유</label>
                  <textarea
                    value={editFormData.reason}
                    onChange={(e) => setEditFormData((prev) => ({ ...prev, reason: e.target.value }))}
                    placeholder="출석 상태 변경 사유를 입력하세요"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>첨부 서류</label>
                  <div className="file-upload-section">
                    <input
                      type="file"
                      id="attachFile"
                      onChange={handleFileAttach}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="attachFile" className="file-upload-btn">
                      📎 파일 선택
                    </label>
                    {editFormData.attachedFile && <span className="file-name">{editFormData.attachedFile.name}</span>}
                    <p className="file-help">진단서, 증명서 등의 서류를 첨부하세요 (PDF, 이미지, 문서 파일)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                취소
              </button>
              <button className="save-btn" onClick={handleSaveEdit}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceManagement
