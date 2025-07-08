"use client"
import { useState } from "react"
import "../styles/StudentDetail.css"

const StudentDetail = ({ student, onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedStudent, setEditedStudent] = useState({ ...student })
  const [showAddCertForm, setShowAddCertForm] = useState(false)

  // 학생 상세 정보 (샘플 데이터)
  const [studentDetail] = useState({
    // 인적 사항
    personalInfo: {
      name: student.name,
      studentId: student.studentId,
      birthDate: "1995-03-15",
      gender: "남성",
      phone: student.phone,
      email: student.email,
      address: "서울시 강남구 테헤란로 123",
      emergencyContact: "010-9999-8888",
      emergencyContactName: "김부모",
    },
    // 학적 사항
    academicInfo: {
      course: student.course,
      enrollDate: student.enrollDate,
      expectedGraduation: "2024-12-15",
      status: student.status,
    },
    // 출결 상황
    attendanceInfo: {
      totalDays: 180,
      attendedDays: 165,
      absentDays: 10,
      lateDays: 5,
      attendanceRate: 91.7,
    },
    // 자격증 및 인증 취득 상황
    certifications: [
      { name: "정보처리기사", date: "2024-05-15", issuer: "한국산업인력공단" },
      { name: "SQLD", date: "2024-03-20", issuer: "한국데이터산업진흥원" },
    ],
    // 교과학습 발달 상황
    academicProgress: [
      { subject: "웹프로그래밍", score: 95, grade: "A+", semester: "1학기" },
      { subject: "데이터베이스", score: 88, grade: "B+", semester: "1학기" },
      { subject: "프로젝트관리", score: 92, grade: "A", semester: "2학기" },
    ],
    // 행동 특성 및 종합 의견
    behaviorComment: {
      strengths: "적극적이고 성실한 학습 태도를 보임. 팀 프로젝트에서 리더십을 발휘함.",
      improvements: "시간 관리 능력 향상이 필요함. 발표 능력 개발 권장.",
      overallComment: "전반적으로 우수한 학습 능력을 보이며, 향후 발전 가능성이 높음.",
    },
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // 실제로는 서버에 저장 요청
    setIsEditing(false)
    alert("학생 정보가 저장되었습니다.")
  }

  const handleCancel = () => {
    setEditedStudent({ ...student })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("정말로 이 학생 정보를 삭제하시겠습니까?")) {
      alert("학생 정보가 삭제되었습니다.")
      onBack()
    }
  }

  const handleInputChange = (section, field, value) => {
    setEditedStudent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <div className="student-detail">
      <div className="student-detail-header">
        <button className="back-btn" onClick={onBack}>
          ← 목록으로
        </button>
        <div className="student-info-header">
          <div className="student-photo-large">{student.photo}</div>
          <div>
            <h2>{student.name} 학생 상세정보</h2>
            <p>
              학번: {student.studentId} | {student.course}
            </p>
          </div>
        </div>
        <div className="action-buttons">
          {!isEditing ? (
            <>
              <button className="edit-btn" onClick={handleEdit}>
                수정
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button className="save-btn" onClick={handleSave}>
                저장
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                취소
              </button>
            </>
          )}
        </div>
      </div>

      <div className="student-detail-content">
        {/* 인적 사항 */}
        <div className="detail-section">
          <h3>인적 사항</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>이름</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.name || studentDetail.personalInfo.name}
                  onChange={(e) => handleInputChange("personalInfo", "name", e.target.value)}
                />
              ) : (
                <span>{studentDetail.personalInfo.name}</span>
              )}
            </div>
            <div className="detail-item">
              <label>생년월일</label>
              {isEditing ? (
                <input type="date" value={studentDetail.personalInfo.birthDate} />
              ) : (
                <span>{studentDetail.personalInfo.birthDate}</span>
              )}
            </div>
            <div className="detail-item">
              <label>성별</label>
              <span>{studentDetail.personalInfo.gender}</span>
            </div>
            <div className="detail-item">
              <label>연락처</label>
              {isEditing ? (
                <input type="tel" value={studentDetail.personalInfo.phone} />
              ) : (
                <span>{studentDetail.personalInfo.phone}</span>
              )}
            </div>
            <div className="detail-item">
              <label>이메일</label>
              {isEditing ? (
                <input type="email" value={studentDetail.personalInfo.email} />
              ) : (
                <span>{studentDetail.personalInfo.email}</span>
              )}
            </div>
            <div className="detail-item">
              <label>주소</label>
              {isEditing ? (
                <input type="text" value={studentDetail.personalInfo.address} />
              ) : (
                <span>{studentDetail.personalInfo.address}</span>
              )}
            </div>
          </div>
        </div>

        {/* 학적 사항 */}
        <div className="detail-section">
          <h3>학적 사항</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>과정명</label>
              <span>{studentDetail.academicInfo.course}</span>
            </div>
            <div className="detail-item">
              <label>입학일</label>
              <span>{studentDetail.academicInfo.enrollDate}</span>
            </div>
            <div className="detail-item">
              <label>수료예정일</label>
              <span>{studentDetail.academicInfo.expectedGraduation}</span>
            </div>
            <div className="detail-item">
              <label>학적상태</label>
              {isEditing ? (
                <select defaultValue={studentDetail.academicInfo.status}>
                  <option value="재학">재학</option>
                  <option value="휴학">휴학</option>
                  <option value="수료">수료</option>
                  <option value="중퇴">중퇴</option>
                </select>
              ) : (
                <span className={`status ${studentDetail.academicInfo.status}`}>
                  {studentDetail.academicInfo.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 출결 상황 */}
        <div className="detail-section">
          <h3>출결 상황</h3>
          <div className="attendance-summary">
            <div className="attendance-item">
              <span className="attendance-label">출석률</span>
              <span className="attendance-value">{studentDetail.attendanceInfo.attendanceRate}%</span>
            </div>
            <div className="attendance-item">
              <span className="attendance-label">출석</span>
              <span className="attendance-value">{studentDetail.attendanceInfo.attendedDays}일</span>
            </div>
            <div className="attendance-item">
              <span className="attendance-label">결석</span>
              <span className="attendance-value">{studentDetail.attendanceInfo.absentDays}일</span>
            </div>
            <div className="attendance-item">
              <span className="attendance-label">지각</span>
              <span className="attendance-value">{studentDetail.attendanceInfo.lateDays}일</span>
            </div>
          </div>
        </div>

        {/* 자격증 및 인증 취득 상황 */}
        <div className="detail-section">
          <div className="section-header-with-button">
            <h3>자격증 및 인증 취득 상황</h3>
            {isEditing && (
              <button className="add-certification-btn" onClick={() => setShowAddCertForm(true)}>
                + 자격증 추가
              </button>
            )}
          </div>
          <div className="certification-list">
            {studentDetail.certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <div className="cert-name">{cert.name}</div>
                <div className="cert-details">
                  <span>취득일: {cert.date}</span>
                  <span>발급기관: {cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 교과학습 발달 상황 */}
        <div className="detail-section">
          <h3>교과학습 발달 상황</h3>
          <div className="academic-progress">
            <table className="progress-table">
              <thead>
                <tr>
                  <th>과목명</th>
                  <th>학기</th>
                  <th>점수</th>
                  <th>등급</th>
                </tr>
              </thead>
              <tbody>
                {studentDetail.academicProgress.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subject}</td>
                    <td>{subject.semester}</td>
                    <td>{subject.score}점</td>
                    <td>
                      <span className={`grade grade-${subject.grade.replace("+", "plus")}`}>{subject.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 행동 특성 및 종합 의견 */}
        <div className="detail-section">
          <h3>행동 특성 및 종합 의견</h3>
          <div className="behavior-comments">
            <div className="comment-item">
              <label>장점 및 특기사항</label>
              {isEditing ? (
                <textarea value={studentDetail.behaviorComment.strengths} rows={3} />
              ) : (
                <p>{studentDetail.behaviorComment.strengths}</p>
              )}
            </div>
            <div className="comment-item">
              <label>개선 및 발전 방향</label>
              {isEditing ? (
                <textarea value={studentDetail.behaviorComment.improvements} rows={3} />
              ) : (
                <p>{studentDetail.behaviorComment.improvements}</p>
              )}
            </div>
            <div className="comment-item">
              <label>종합 의견</label>
              {isEditing ? (
                <textarea value={studentDetail.behaviorComment.overallComment} rows={3} />
              ) : (
                <p>{studentDetail.behaviorComment.overallComment}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
