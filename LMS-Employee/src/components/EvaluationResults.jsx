"use client"
import { useState } from "react"
import "../styles/EvaluationResults.css"

const EvaluationResults = ({ course, onBack }) => {
  // 샘플 평가 결과 데이터
  const [evaluationData] = useState({
    summary: {
      totalResponses: 23,
      totalStudents: 25,
      responseRate: 92,
      averageRating: 4.2,
      completedAt: "2024-01-25",
    },
    questions: [
      {
        id: 1,
        question: "강의 내용이 이해하기 쉬웠나요?",
        type: "rating",
        category: "강의 내용",
        responses: [
          { rating: 5, count: 12 },
          { rating: 4, count: 8 },
          { rating: 3, count: 2 },
          { rating: 2, count: 1 },
          { rating: 1, count: 0 },
        ],
        average: 4.3,
      },
      {
        id: 2,
        question: "강사의 설명이 명확했나요?",
        type: "rating",
        category: "강사",
        responses: [
          { rating: 5, count: 10 },
          { rating: 4, count: 9 },
          { rating: 3, count: 3 },
          { rating: 2, count: 1 },
          { rating: 1, count: 0 },
        ],
        average: 4.2,
      },
      {
        id: 3,
        question: "강의 진행 속도는 적절했나요?",
        type: "rating",
        category: "강의 진행",
        responses: [
          { rating: 5, count: 8 },
          { rating: 4, count: 11 },
          { rating: 3, count: 3 },
          { rating: 2, count: 1 },
          { rating: 1, count: 0 },
        ],
        average: 4.1,
      },
      {
        id: 6,
        question: "추가로 개선했으면 하는 점이 있다면 자유롭게 작성해주세요.",
        type: "text",
        category: "기타",
        responses: [
          "실습 시간을 더 늘려주세요.",
          "예제를 더 다양하게 해주시면 좋겠습니다.",
          "질문 시간을 더 많이 가져주세요.",
          "과제 피드백을 더 자세히 해주세요.",
          "전반적으로 만족합니다.",
        ],
      },
    ],
  })

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "excellent"
    if (rating >= 4.0) return "good"
    if (rating >= 3.5) return "average"
    if (rating >= 3.0) return "below-average"
    return "poor"
  }

  const getProgressWidth = (count, total) => {
    return (count / total) * 100
  }

  return (
    <div className="evaluation-results">
      <div className="results-header">
        <button className="back-btn" onClick={onBack}>
          ← 강의 목록으로
        </button>
        <div className="course-info">
          <h2>{course.name} - 평가 결과</h2>
          <p>
            강사: {course.instructor} | 평가 완료일: {evaluationData.summary.completedAt}
          </p>
        </div>
      </div>

      <div className="results-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>응답률</h3>
              <div className="card-value">{evaluationData.summary.responseRate}%</div>
              <div className="card-detail">
                {evaluationData.summary.totalResponses}/{evaluationData.summary.totalStudents} 명 응답
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">⭐</div>
            <div className="card-content">
              <h3>전체 평균</h3>
              <div className={`card-value rating ${getRatingColor(evaluationData.summary.averageRating)}`}>
                {evaluationData.summary.averageRating}
              </div>
              <div className="card-detail">5점 만점</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">✅</div>
            <div className="card-content">
              <h3>완료 상태</h3>
              <div className="card-value">완료</div>
              <div className="card-detail">평가 종료</div>
            </div>
          </div>
        </div>
      </div>

      <div className="results-content">
        <h3>질문별 상세 결과</h3>
        <div className="questions-results">
          {evaluationData.questions.map((question) => (
            <div key={question.id} className="question-result">
              <div className="question-header">
                <div className="question-info">
                  <span className="question-category">{question.category}</span>
                  <h4>{question.question}</h4>
                </div>
                {question.type === "rating" && (
                  <div className={`question-average rating ${getRatingColor(question.average)}`}>
                    평균 {question.average}
                  </div>
                )}
              </div>

              <div className="question-responses">
                {question.type === "rating" ? (
                  <div className="rating-responses">
                    {question.responses.map((response) => (
                      <div key={response.rating} className="rating-bar">
                        <div className="rating-label">{response.rating}점</div>
                        <div className="rating-progress">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${getProgressWidth(response.count, evaluationData.summary.totalResponses)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="rating-count">{response.count}명</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-responses">
                    {question.responses.map((response, index) => (
                      <div key={index} className="text-response">
                        <div className="response-number">{index + 1}</div>
                        <div className="response-text">{response}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="export-btn">📊 결과 내보내기</button>
        <button className="print-btn">🖨️ 인쇄</button>
      </div>
    </div>
  )
}

export default EvaluationResults
