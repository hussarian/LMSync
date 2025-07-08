"use client"
import "../styles/SubjectScoreModal.css"

const SubjectScoreModal = ({ course, subject, onClose }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "excellent"
    if (score >= 80) return "good"
    if (score >= 70) return "average"
    return "poor"
  }

  const getGrade = (score) => {
    if (score >= 95) return "A+"
    if (score >= 90) return "A"
    if (score >= 85) return "B+"
    if (score >= 80) return "B"
    if (score >= 75) return "C+"
    if (score >= 70) return "C"
    if (score >= 65) return "D+"
    if (score >= 60) return "D"
    return "F"
  }

  const studentScores = course.students
    .map((student) => ({
      ...student,
      score: student.scores[subject.name] || 0,
    }))
    .sort((a, b) => b.score - a.score)

  const maxScore = Math.max(...studentScores.map((s) => s.score))
  const minScore = Math.min(...studentScores.map((s) => s.score))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="subject-score-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h3>{subject.name} 성적 현황</h3>
            <p>{course.name}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="score-summary">
            <div className="summary-stats">
              <div className="stat-card">
                <span className="stat-label">평균 점수</span>
                <span className="stat-value">{subject.averageScore}점</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">최고 점수</span>
                <span className="stat-value">{maxScore}점</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">최저 점수</span>
                <span className="stat-value">{minScore}점</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">응시 인원</span>
                <span className="stat-value">{studentScores.length}명</span>
              </div>
            </div>

            <div className="score-distribution">
              <h4>점수 분포</h4>
              <div className="distribution-chart">
                {[
                  { range: "90-100", count: studentScores.filter((s) => s.score >= 90).length },
                  { range: "80-89", count: studentScores.filter((s) => s.score >= 80 && s.score < 90).length },
                  { range: "70-79", count: studentScores.filter((s) => s.score >= 70 && s.score < 80).length },
                  { range: "60-69", count: studentScores.filter((s) => s.score >= 60 && s.score < 70).length },
                  { range: "0-59", count: studentScores.filter((s) => s.score < 60).length },
                ].map((item, index) => (
                  <div key={index} className="distribution-item">
                    <span className="range">{item.range}점</span>
                    <div className="bar-container">
                      <div className="bar" style={{ width: `${(item.count / studentScores.length) * 100}%` }}></div>
                    </div>
                    <span className="count">{item.count}명</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="students-scores">
            <h4>학생별 성적</h4>
            <div className="scores-table">
              <div className="table-header">
                <span>순위</span>
                <span>학생명</span>
                <span>점수</span>
                <span>등급</span>
                <span>평균 대비</span>
              </div>
              <div className="table-body">
                {studentScores.map((student, index) => (
                  <div key={student.id} className="table-row">
                    <span className="rank">{index + 1}</span>
                    <span className="name">{student.name}</span>
                    <span className={`score ${getScoreColor(student.score)}`}>{student.score}점</span>
                    <span className={`grade ${getScoreColor(student.score)}`}>{getGrade(student.score)}</span>
                    <span className={`difference ${student.score >= subject.averageScore ? "positive" : "negative"}`}>
                      {student.score >= subject.averageScore ? "+" : ""}
                      {(student.score - subject.averageScore).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            닫기
          </button>
          <button className="btn-primary">성적 수정</button>
          <button className="btn-primary">엑셀 다운로드</button>
        </div>
      </div>
    </div>
  )
}

export default SubjectScoreModal
