import axios from 'axios'

// Axios 인스턴스 생성
const axiosKky = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosKky.interceptors.request.use(
  (config) => {
    // 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
axiosKky.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ==================================================================================
// ===== 직원용 API 함수들 (STAFF/ADMIN EXAM MANAGEMENT) =====
// ==================================================================================

// 시험 목록 조회 (검색, 필터링 포함)
export const getExams = async (params = {}) => {
  try {
    const { search, status, category, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (category && category !== 'all') queryParams.append('category', category)
    
    const response = await axiosKky.get(`/exam?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('시험 목록 조회 실패:', error)
    throw error
  }
}


// ==================================================================================
// ===== 강사용 API 함수들 (INSTRUCTOR EXAM MANAGEMENT) =====
// ==================================================================================

// ===== INSTRUCTOR EXAM API 함수들 =====

// 강사 시험 목록 조회 (검색, 필터링 포함)
export const getInstructorExams = async (params = {}) => {
  try {
    const { search, status, course, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (course && course !== 'all') queryParams.append('course', course)
    
    const response = await axiosKky.get(`/instructor/exam/my-exams?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강사 시험 목록 조회 실패:', error)
    throw error
  }
}

// 강사 시험 생성
export const createInstructorExam = async (examData) => {
  try {
    const response = await axiosKky.post('/instructor/exam/my-exams', examData)
    return response.data
  } catch (error) {
    console.error('강사 시험 생성 실패:', error)
    throw error
  }
}

// 강사 시험 수정
export const updateInstructorExam = async (examId, examData) => {
  try {
    const response = await axiosKky.put(`/instructor/exam/my-exams/${examId}`, examData)
    return response.data
  } catch (error) {
    console.error('강사 시험 수정 실패:', error)
    throw error
  }
}

// 강사 시험 삭제
export const deleteInstructorExam = async (examId) => {
  try {
    const response = await axiosKky.delete(`/instructor/exam/my-exams/${examId}`)
    return response.data
  } catch (error) {
    console.error('강사 시험 삭제 실패:', error)
    throw error
  }
}

// 강사 시험 상세 조회
export const getInstructorExamDetail = async (examId) => {
  try {
    const response = await axiosKky.get(`/instructor/exam/my-exams/${examId}`)
    return response.data
  } catch (error) {
    console.error('강사 시험 상세 조회 실패:', error)
    throw error
  }
}

// 강사 시험 상태 변경 (시작/중지/완료)
export const updateInstructorExamStatus = async (examId, status) => {
  try {
    const response = await axiosKky.patch(`/instructor/exam/my-exams/${examId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('강사 시험 상태 변경 실패:', error)
    throw error
  }
}

// ===== INSTRUCTOR QUESTION BANK API 함수들 =====

// 강사 문제 목록 조회 (검색, 필터링 포함)
export const getInstructorQuestions = async (params = {}) => {
  try {
    const { search, subject, type, difficulty, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (subject && subject !== 'all') queryParams.append('subject', subject)
    if (type && type !== 'all') queryParams.append('type', type)
    if (difficulty && difficulty !== 'all') queryParams.append('difficulty', difficulty)
    
    const response = await axiosKky.get(`/instructor/exam/question-bank?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강사 문제 목록 조회 실패:', error)
    throw error
  }
}

// 강사 문제 생성
export const createInstructorQuestion = async (questionData) => {
  try {
    const response = await axiosKky.post('/instructor/exam/question-bank', questionData)
    return response.data
  } catch (error) {
    console.error('강사 문제 생성 실패:', error)
    throw error
  }
}

// 강사 문제 수정
export const updateInstructorQuestion = async (questionId, questionData) => {
  try {
    const response = await axiosKky.put(`/instructor/exam/question-bank/${questionId}`, questionData)
    return response.data
  } catch (error) {
    console.error('강사 문제 수정 실패:', error)
    throw error
  }
}

// 강사 문제 삭제
export const deleteInstructorQuestion = async (questionId) => {
  try {
    const response = await axiosKky.delete(`/instructor/exam/question-bank/${questionId}`)
    return response.data
  } catch (error) {
    console.error('강사 문제 삭제 실패:', error)
    throw error
  }
}

// 강사 문제 상세 조회
export const getInstructorQuestionDetail = async (questionId) => {
  try {
    const response = await axiosKky.get(`/instructor/exam/question-bank/${questionId}`)
    return response.data
  } catch (error) {
    console.error('강사 문제 상세 조회 실패:', error)
    throw error
  }
}

// ===== INSTRUCTOR GRADING API 함수들 =====

// 채점 대기 목록 조회
export const getGradingQueue = async (params = {}) => {
  try {
    const { examId, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (examId) queryParams.append('examId', examId)
    
    const response = await axiosKky.get(`/instructor/exam/grading/queue?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('채점 대기 목록 조회 실패:', error)
    throw error
  }
}

// 제출 답안 목록 조회
export const getExamSubmissions = async (examId, params = {}) => {
  try {
    const { studentId, status, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (studentId) queryParams.append('studentId', studentId)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosKky.get(`/instructor/exam/my-exams/${examId}/submissions?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('제출 답안 목록 조회 실패:', error)
    throw error
  }
}

// 개별 제출 답안 상세 조회
export const getSubmissionDetail = async (examId, submissionId) => {
  try {
    const response = await axiosKky.get(`/instructor/exam/my-exams/${examId}/submissions/${submissionId}`)
    return response.data
  } catch (error) {
    console.error('제출 답안 상세 조회 실패:', error)
    throw error
  }
}

// 채점 제출
export const submitGrade = async (examId, submissionId, gradeData) => {
  try {
    const response = await axiosKky.post(`/instructor/exam/my-exams/${examId}/submissions/${submissionId}/grade`, gradeData)
    return response.data
  } catch (error) {
    console.error('채점 제출 실패:', error)
    throw error
  }
}

// 일괄 채점
export const submitBulkGrade = async (examId, gradeDataList) => {
  try {
    const response = await axiosKky.post(`/instructor/exam/my-exams/${examId}/bulk-grade`, { grades: gradeDataList })
    return response.data
  } catch (error) {
    console.error('일괄 채점 실패:', error)
    throw error
  }
}

// ===== INSTRUCTOR LECTURE HISTORY API 함수들 =====

// 강의 성적 이력 조회
export const getLectureHistory = async (params = {}) => {
  try {
    const { lectureId, semester, year, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (lectureId) queryParams.append('lectureId', lectureId)
    if (semester) queryParams.append('semester', semester)
    if (year) queryParams.append('year', year)
    
    const response = await axiosKky.get(`/instructor/exam/lectures/history?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강의 성적 이력 조회 실패:', error)
    throw error
  }
}

// 특정 강의의 성적 통계 조회
export const getLectureGradeStats = async (lectureId) => {
  try {
    const response = await axiosKky.get(`/instructor/exam/lectures/${lectureId}/stats`)
    return response.data
  } catch (error) {
    console.error('강의 성적 통계 조회 실패:', error)
    throw error
  }
}

// 강의별 학생 성적 조회
export const getLectureStudentGrades = async (lectureId, params = {}) => {
  try {
    const { studentId, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (studentId) queryParams.append('studentId', studentId)
    
    const response = await axiosKky.get(`/instructor/exam/lectures/${lectureId}/grades?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강의별 학생 성적 조회 실패:', error)
    throw error
  }
}

// ==================================================================================
// ===== 학생용 API 함수들 (STUDENT EXAM MANAGEMENT) =====
// ==================================================================================

// ===== STUDENT EXAM API 함수들 =====

// 학생 시험 목록 조회
export const getStudentExams = async (params = {}) => {
  try {
    const { search, status, subject, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (subject && subject !== 'all') queryParams.append('subject', subject)
    
    const response = await axiosKky.get(`/student/exams?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('학생 시험 목록 조회 실패:', error)
    throw error
  }
}


// 시험 시작
export const startStudentExam = async (examId) => {
  try {
    const response = await axiosKky.post(`/student/exams/${examId}/start`)
    return response.data
  } catch (error) {
    console.error('시험 시작 실패:', error)
    throw error
  }
}


// 시험 제출
export const submitStudentExam = async (examId, answers) => {
  try {
    const response = await axiosKky.post(`/student/exams/${examId}/submit`, {
      answers,
    })
    return response.data
  } catch (error) {
    console.error('시험 제출 실패:', error)
    throw error
  }
}

// 시험 결과 조회
export const getStudentExamResult = async (examId) => {
  try {
    const response = await axiosKky.get(`/student/exams/${examId}/result`)
    return response.data
  } catch (error) {
    console.error('시험 결과 조회 실패:', error)
    throw error
  }
}

// ===== STUDENT GRADE API 함수들 =====

// 내 시험 성적 목록 조회
export const getStudentGrades = async (params = {}) => {
  try {
    const { search, subject, semester, year, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (subject && subject !== 'all') queryParams.append('subject', subject)
    if (semester) queryParams.append('semester', semester)
    if (year) queryParams.append('year', year)
    
    const response = await axiosKky.get(`/student/grades?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('학생 성적 목록 조회 실패:', error)
    throw error
  }
}


// 과목별 상세 성적 조회
export const getStudentCourseGrade = async (courseId) => {
  try {
    const response = await axiosKky.get(`/student/grades/course/${courseId}`)
    return response.data
  } catch (error) {
    console.error('과목별 성적 조회 실패:', error)
    throw error
  }
}

// ===== STUDENT UTILITY API 함수들 =====


// 진행 중인 시험 정보 조회 (타이머 등)
export const getExamProgress = async (examId) => {
  try {
    const response = await axiosKky.get(`/student/exams/${examId}/progress`)
    return response.data
  } catch (error) {
    console.error('시험 진행 정보 조회 실패:', error)
    throw error
  }
}

export default axiosKky
