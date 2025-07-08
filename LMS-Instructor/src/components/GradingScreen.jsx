"use client"
import { useState } from "react"
import "../styles/GradingScreen.css"

const GradingScreen = ({ assignment, onClose }) => {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [feedbacks, setFeedbacks] = useState({})

  const ungradedSubmissions = assignment.submissions.filter((s) => !s.isGraded)
  const currentSubmission = ungradedSubmissions[currentStudentIndex]

  const handleScoreChange = (studentId, score) => {
    setScores({ ...scores, [studentId]: score })
  }

  const handleFeedbackChange = (studentId, feedback) => {
    setFeedbacks({ ...feedbacks, [studentId]: feedback })
  }

  const handleNextStudent = () => {
    if (currentStudentIndex < ungradedSubmissions.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1)
    }
  }

  const handlePrevStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1)
    }
  }

  const handleSaveGrade = () => {
    const studentId = currentSubmission.studentId
    const score = scores[studentId]
    const feedback = feedbacks[studentId] || ""

    if (!score || score < 0 || score > 100) {
      alert("0-100 사이의 점수를 입력해주세요.")
      return
    }

    // 실제로는 서버에 저장
    console.log("점수 저장:", { studentId, score, feedback })
    alert(`${currentSubmission.studentName} 학생의 점수가 저장되었습니다.`)

    // 다음 학생으로 이동
    if (currentStudentIndex < ungradedSubmissions.length - 1) {
      handleNextStudent()
    } else {
      alert("모든 학생의 채점이 완료되었습니다.")
      onClose()
    }
  }

  const handleDownloadFile = () => {
    // 실제로는 파일 다운로드 로직
    console.log("파일 다운로드:", currentSubmission.fileName)
    alert(`${currentSubmission.fileName} 다운로드를 시작합니다.`)
  }

  if (!currentSubmission) {
    return (
      <div className="grading-screen">
        <div className="grading-header">
          <h2>{assignment.title} - 채점 완료</h2>
          <button className="close-btn" onClick={onClose}>
            돌아가기
          </button>
        </div>
        <div className="grading-complete">
          <div className="complete-icon">✅</div>
          <h3>모든 학생의 채점이 완료되었습니다!</h3>
          <p>채점 결과를 확인하고 학생들에게 피드백을 전달하세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grading-screen">
      <div className="grading-header">
        <div className="header-info">
          <h2>{assignment.title} - 채점</h2>
          <div className="progress-info">
            <span>
              진행률: {currentStudentIndex + 1}/{ungradedSubmissions.length}
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentStudentIndex + 1) / ungradedSubmissions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          돌아가기
        </button>
      </div>

      <div className="grading-content">
        <div className="student-info-panel">
          <div className="student-header">
            <h3>{currentSubmission.studentName}</h3>
            <span className="submission-date">제출일: {currentSubmission.submittedAt}</span>
          </div>

          <div className="file-info">
            <div className="file-item">
              <span className="file-name">📎 {currentSubmission.fileName}</span>
              <button className="download-btn" onClick={handleDownloadFile}>
                다운로드
              </button>
            </div>
          </div>

          <div className="grading-form">
            <div className="score-input">
              <label>점수 (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={scores[currentSubmission.studentId] || ""}
                onChange={(e) => handleScoreChange(currentSubmission.studentId, Number.parseInt(e.target.value))}
                placeholder="점수 입력"
              />
            </div>

            <div className="feedback-input">
              <label>피드백</label>
              <textarea
                value={feedbacks[currentSubmission.studentId] || ""}
                onChange={(e) => handleFeedbackChange(currentSubmission.studentId, e.target.value)}
                placeholder="학생에게 전달할 피드백을 입력하세요"
                rows="4"
              />
            </div>

            <div className="quick-scores">
              <label>빠른 점수 선택</label>
              <div className="score-buttons">
                {[100, 95, 90, 85, 80, 75, 70, 65, 60].map((score) => (
                  <button
                    key={score}
                    className="score-btn"
                    onClick={() => handleScoreChange(currentSubmission.studentId, score)}
                  >
                    {score}점
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grading-preview">
          <div className="preview-header">
            <h4>제출물 미리보기</h4>
            <span className="preview-note">실제 파일을 다운로드하여 확인하세요</span>
          </div>
          <div className="preview-content">
            <div className="file-preview">
              <div className="preview-placeholder">
                <div className="placeholder-icon">📄</div>
                <p>파일 미리보기</p>
                <p className="file-name">{currentSubmission.fileName}</p>
                <button className="preview-download-btn" onClick={handleDownloadFile}>
                  파일 다운로드하여 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grading-footer">
        <div className="navigation-buttons">
          <button className="prev-btn" onClick={handlePrevStudent} disabled={currentStudentIndex === 0}>
            ← 이전 학생
          </button>
          <button
            className="next-btn"
            onClick={handleNextStudent}
            disabled={currentStudentIndex === ungradedSubmissions.length - 1}
          >
            다음 학생 →
          </button>
        </div>

        <div className="action-buttons">
          <button className="save-btn" onClick={handleSaveGrade}>
            점수 저장
          </button>
          <button className="save-next-btn" onClick={handleSaveGrade}>
            저장 후 다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default GradingScreen
