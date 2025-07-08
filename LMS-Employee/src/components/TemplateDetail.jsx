"use client"
import "../styles/TemplateDetail.css"

const TemplateDetail = ({ template, questions, courses, onBack }) => {
  const templateQuestions = template.questionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean)
  const usedCourses = courses.filter((course) => course.templateId === template.id)

  const getQuestionTypeText = (type) => {
    switch (type) {
      case "rating":
        return "평점"
      case "text":
        return "서술형"
      case "choice":
        return "선택형"
      default:
        return type
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "completed"
      case "진행중":
        return "in-progress"
      case "미시작":
        return "not-started"
      default:
        return ""
    }
  }

  return (
    <div className="template-detail">
      <div className="template-detail-header">
        <button className="back-btn" onClick={onBack}>
          ← 목록으로
        </button>
        <div className="template-info">
          <h2>{template.name}</h2>
          <p>{template.description}</p>
          <div className="template-meta">
            <span>생성일: {template.createdAt}</span>
            <span className={`status ${template.isActive ? "active" : "inactive"}`}>
              {template.isActive ? "활성" : "비활성"}
            </span>
          </div>
        </div>
      </div>

      <div className="template-detail-content">
        <div className="detail-section">
          <h3>포함된 질문 ({templateQuestions.length}개)</h3>
          <div className="questions-list">
            {templateQuestions.map((question, index) => (
              <div key={question.id} className="question-item">
                <div className="question-number">{index + 1}</div>
                <div className="question-content">
                  <div className="question-header">
                    <span className="question-category">{question.category}</span>
                    <span className={`question-type ${question.type}`}>{getQuestionTypeText(question.type)}</span>
                    {question.required && <span className="required-badge">필수</span>}
                  </div>
                  <div className="question-text">{question.question}</div>
                  {question.options && question.options.length > 0 && (
                    <div className="question-options">
                      <strong>선택 옵션:</strong>
                      <ul>
                        {question.options.map((option, idx) => (
                          <li key={idx}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>사용 중인 강의 ({usedCourses.length}개)</h3>
          {usedCourses.length > 0 ? (
            <div className="courses-list">
              {usedCourses.map((course) => (
                <div key={course.id} className="course-item">
                  <div className="course-info">
                    <h4>{course.name}</h4>
                    <p>강사: {course.instructor}</p>
                    <p>기간: {course.period}</p>
                    <p>수강생: {course.students}명</p>
                  </div>
                  <div className="course-status">
                    <span className={`evaluation-status ${getStatusColor(course.evaluationStatus)}`}>
                      {course.evaluationStatus}
                    </span>
                    {course.evaluationStatus !== "미설정" && (
                      <div className="evaluation-progress">
                        {course.completedEvaluations}/{course.totalStudents} 완료
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <p>현재 이 템플릿을 사용하는 강의가 없습니다.</p>
            </div>
          )}
        </div>

        <div className="detail-section">
          <h3>템플릿 통계</h3>
          <div className="template-stats-grid">
            <div className="stat-item">
              <span className="stat-label">총 질문 수</span>
              <span className="stat-value">{templateQuestions.length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">필수 질문</span>
              <span className="stat-value">{templateQuestions.filter((q) => q.required).length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">평점 질문</span>
              <span className="stat-value">{templateQuestions.filter((q) => q.type === "rating").length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">서술형 질문</span>
              <span className="stat-value">{templateQuestions.filter((q) => q.type === "text").length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">사용 강의</span>
              <span className="stat-value">{usedCourses.length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">완료된 평가</span>
              <span className="stat-value">
                {usedCourses.reduce((sum, course) => sum + course.completedEvaluations, 0)}개
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateDetail
