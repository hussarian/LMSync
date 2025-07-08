"use client"
import "../styles/AssignmentStatisticsModal.css"

const AssignmentStatisticsModal = ({ assignment, onClose }) => {
  // 통계 계산
  const submissionRate = Math.round((assignment.submittedCount / assignment.totalStudents) * 100)
  const gradedSubmissions = assignment.submissions.filter((s) => s.score !== null)
  const averageScore =
    gradedSubmissions.length > 0
      ? Math.round(gradedSubmissions.reduce((sum, s) => sum + s.score, 0) / gradedSubmissions.length)
      : 0

  // 점수 분포 계산
  const scoreDistribution = {
    "90-100": gradedSubmissions.filter((s) => s.score >= 90).length,
    "80-89": gradedSubmissions.filter((s) => s.score >= 80 && s.score < 90).length,
    "70-79": gradedSubmissions.filter((s) => s.score >= 70 && s.score < 80).length,
    "60-69": gradedSubmissions.filter((s) => s.score >= 60 && s.score < 70).length,
    "0-59": gradedSubmissions.filter((s) => s.score < 60).length,
  }

  return (
    <div className="assignment-statistics-overlay" onClick={onClose}>
      <div className="assignment-statistics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{assignment.title} - 통계</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="statistics-overview">
            <div className="stat-card">
              <h3>제출률</h3>
              <div className="stat-value">{submissionRate}%</div>
              <div className="stat-detail">
                {assignment.submittedCount}/{assignment.totalStudents} 명
              </div>
            </div>
            <div className="stat-card">
              <h3>평균 점수</h3>
              <div className="stat-value">{averageScore}점</div>
              <div className="stat-detail">{gradedSubmissions.length}명 채점 완료</div>
            </div>
            <div className="stat-card">
              <h3>최고 점수</h3>
              <div className="stat-value">
                {gradedSubmissions.length > 0 ? Math.max(...gradedSubmissions.map((s) => s.score)) : 0}점
              </div>
            </div>
            <div className="stat-card">
              <h3>최저 점수</h3>
              <div className="stat-value">
                {gradedSubmissions.length > 0 ? Math.min(...gradedSubmissions.map((s) => s.score)) : 0}점
              </div>
            </div>
          </div>

          <div className="statistics-charts">
            <div className="chart-section">
              <h3>제출 현황</h3>
              <div className="submission-chart">
                <div className="chart-bar">
                  <div className="bar-label">제출 완료</div>
                  <div className="bar-container">
                    <div className="bar-fill submitted" style={{ width: `${submissionRate}%` }}></div>
                  </div>
                  <div className="bar-value">{assignment.submittedCount}명</div>
                </div>
                <div className="chart-bar">
                  <div className="bar-label">미제출</div>
                  <div className="bar-container">
                    <div className="bar-fill not-submitted" style={{ width: `${100 - submissionRate}%` }}></div>
                  </div>
                  <div className="bar-value">{assignment.totalStudents - assignment.submittedCount}명</div>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <h3>점수 분포</h3>
              <div className="score-distribution">
                {Object.entries(scoreDistribution).map(([range, count]) => (
                  <div key={range} className="distribution-bar">
                    <div className="range-label">{range}점</div>
                    <div className="bar-container">
                      <div
                        className="bar-fill score-range"
                        style={{
                          width: `${gradedSubmissions.length > 0 ? (count / gradedSubmissions.length) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <div className="count-value">{count}명</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="student-ranking">
            <h3>학생 순위</h3>
            <div className="ranking-table">
              <div className="table-header">
                <span>순위</span>
                <span>학생명</span>
                <span>점수</span>
                <span>제출일</span>
              </div>
              {gradedSubmissions
                .sort((a, b) => b.score - a.score)
                .map((submission, index) => (
                  <div key={submission.studentId} className="table-row">
                    <span className="rank">{index + 1}</span>
                    <span>{submission.studentName}</span>
                    <span className="score">{submission.score}점</span>
                    <span>{submission.submittedAt}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssignmentStatisticsModal
