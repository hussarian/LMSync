import axios from 'axios'

// Axios 인스턴스 생성
const axiosLsh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosLsh.interceptors.request.use(
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
axiosLsh.interceptors.response.use(
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
// ===== 과정 관리 시스템 API 함수들 (COURSE MANAGEMENT) =====
// ==================================================================================

// ===== 과정 관리 API 함수들 =====

// 과정 목록 조회 (검색, 필터링 포함)
export const getCourseList = async (params = {}) => {
  try {
    const { search, status, category, instructor, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (category && category !== 'all') queryParams.append('category', category)
    if (instructor && instructor !== 'all') queryParams.append('instructor', instructor)
    
    const response = await axiosLsh.get(`/courses?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('과정 목록 조회 실패:', error)
    throw error
  }
}

// 과정 상세 조회
export const getCourseDetail = async (courseId) => {
  try {
    const response = await axiosLsh.get(`/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error('과정 상세 조회 실패:', error)
    throw error
  }
}

// 과정 생성
export const createCourse = async (courseData) => {
  try {
    const response = await axiosLsh.post('/courses', courseData)
    return response.data
  } catch (error) {
    console.error('과정 생성 실패:', error)
    throw error
  }
}

// 과정 수정
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axiosLsh.put(`/courses/${courseId}`, courseData)
    return response.data
  } catch (error) {
    console.error('과정 수정 실패:', error)
    throw error
  }
}

// 과정 삭제
export const deleteCourse = async (courseId) => {
  try {
    const response = await axiosLsh.delete(`/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error('과정 삭제 실패:', error)
    throw error
  }
}

// 과정 상태 변경
export const updateCourseStatus = async (courseId, status) => {
  try {
    const response = await axiosLsh.patch(`/courses/${courseId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('과정 상태 변경 실패:', error)
    throw error
  }
}

// ===== 과목 관리 API 함수들 =====

// 과목 목록 조회 (검색, 필터링 포함)
export const getSubjectList = async (params = {}) => {
  try {
    const { search, category, difficulty, status, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (category && category !== 'all') queryParams.append('category', category)
    if (difficulty && difficulty !== 'all') queryParams.append('difficulty', difficulty)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosLsh.get(`/subjects?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('과목 목록 조회 실패:', error)
    throw error
  }
}

// 과목 상세 조회
export const getSubjectDetail = async (subjectId) => {
  try {
    const response = await axiosLsh.get(`/subjects/${subjectId}`)
    return response.data
  } catch (error) {
    console.error('과목 상세 조회 실패:', error)
    throw error
  }
}

// 과목 생성
export const createSubject = async (subjectData) => {
  try {
    const response = await axiosLsh.post('/subjects', subjectData)
    return response.data
  } catch (error) {
    console.error('과목 생성 실패:', error)
    throw error
  }
}

// 과목 수정
export const updateSubject = async (subjectId, subjectData) => {
  try {
    const response = await axiosLsh.put(`/subjects/${subjectId}`, subjectData)
    return response.data
  } catch (error) {
    console.error('과목 수정 실패:', error)
    throw error
  }
}

// 과목 삭제
export const deleteSubject = async (subjectId) => {
  try {
    const response = await axiosLsh.delete(`/subjects/${subjectId}`)
    return response.data
  } catch (error) {
    console.error('과목 삭제 실패:', error)
    throw error
  }
}

// 과목 상태 변경
export const updateSubjectStatus = async (subjectId, status) => {
  try {
    const response = await axiosLsh.patch(`/subjects/${subjectId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('과목 상태 변경 실패:', error)
    throw error
  }
}

// ===== 커리큘럼 관리 API 함수들 =====

// 과정 커리큘럼 조회
export const getCourseCurriculum = async (courseId) => {
  try {
    const response = await axiosLsh.get(`/courses/${courseId}/curriculum`)
    return response.data
  } catch (error) {
    console.error('과정 커리큘럼 조회 실패:', error)
    throw error
  }
}

// 과정 커리큘럼 수정
export const updateCourseCurriculum = async (courseId, curriculum) => {
  try {
    const response = await axiosLsh.put(`/courses/${courseId}/curriculum`, { curriculum })
    return response.data
  } catch (error) {
    console.error('과정 커리큘럼 수정 실패:', error)
    throw error
  }
}

// 과정에 과목 추가
export const addSubjectToCourse = async (courseId, subjectId, order = 1) => {
  try {
    const response = await axiosLsh.post(`/courses/${courseId}/subjects`, {
      subjectId,
      order,
    })
    return response.data
  } catch (error) {
    console.error('과정에 과목 추가 실패:', error)
    throw error
  }
}

// 과정에서 과목 제거
export const removeSubjectFromCourse = async (courseId, subjectId) => {
  try {
    const response = await axiosLsh.delete(`/courses/${courseId}/subjects/${subjectId}`)
    return response.data
  } catch (error) {
    console.error('과정에서 과목 제거 실패:', error)
    throw error
  }
}


// ===== 수강 관리 API 함수들 =====

// 과정 수강생 목록 조회
export const getCourseStudents = async (courseId, params = {}) => {
  try {
    const { page = 1, limit = 10, search } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    
    const response = await axiosLsh.get(`/courses/${courseId}/students?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('과정 수강생 목록 조회 실패:', error)
    throw error
  }
}

// ===== 강사 관리 API 함수들 =====

// 강사 목록 조회
export const getInstructorList = async (params = {}) => {
  try {
    const { search, department, status, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (department && department !== 'all') queryParams.append('department', department)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosLsh.get(`/instructors?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강사 목록 조회 실패:', error)
    throw error
  }
}

// 강사 상세 조회
export const getInstructorDetail = async (instructorId) => {
  try {
    const response = await axiosLsh.get(`/instructors/${instructorId}`)
    return response.data
  } catch (error) {
    console.error('강사 상세 조회 실패:', error)
    throw error
  }
}

// 강사가 담당하는 과정 목록 조회
export const getInstructorCourses = async (instructorId, params = {}) => {
  try {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosLsh.get(`/instructors/${instructorId}/courses?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강사 담당 과정 목록 조회 실패:', error)
    throw error
  }
}

// ===== 카테고리 및 메타데이터 API 함수들 =====

// 과정 카테고리 목록 조회
export const getCourseCategories = async () => {
  try {
    const response = await axiosLsh.get('/courses/categories')
    return response.data
  } catch (error) {
    console.error('과정 카테고리 목록 조회 실패:', error)
    throw error
  }
}

// 과목 카테고리 목록 조회
export const getSubjectCategories = async () => {
  try {
    const response = await axiosLsh.get('/subjects/categories')
    return response.data
  } catch (error) {
    console.error('과목 카테고리 목록 조회 실패:', error)
    throw error
  }
}


// ===== 검색 및 필터링 API 함수들 =====

// 통합 검색 (과정 + 과목)
export const searchCoursesAndSubjects = async (query, params = {}) => {
  try {
    const { type = 'all', page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      q: query,
      type,
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosLsh.get(`/search?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('통합 검색 실패:', error)
    throw error
  }
}


// 과정 정보 엑셀 다운로드
export const downloadCourseExcel = async (params = {}) => {
  try {
    const { category, status } = params
    const queryParams = new URLSearchParams()
    
    if (category && category !== 'all') queryParams.append('category', category)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosLsh.get(`/courses/export/excel?${queryParams}`, {
      responseType: 'blob',
    })
    return response.data
  } catch (error) {
    console.error('과정 정보 엑셀 다운로드 실패:', error)
    throw error
  }
}

// 수강생 목록 엑셀 다운로드
export const downloadStudentListExcel = async (courseId) => {
  try {
    const response = await axiosLsh.get(`/courses/${courseId}/students/export/excel`, {
      responseType: 'blob',
    })
    return response.data
  } catch (error) {
    console.error('수강생 목록 엑셀 다운로드 실패:', error)
    throw error
  }
}

export default axiosLsh

// ==================================================================================
// ===== 강사 과정 관리 시스템 API 함수들 (INSTRUCTOR COURSE MANAGEMENT) =====
// ==================================================================================

// ===== 강의 관리 API 함수들 =====

// 과정별 강의 목록 조회
export const getCourseLectures = async (courseId, params = {}) => {
  try {
    const { page = 1, limit = 10, search, status, date } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (date) queryParams.append('date', date)
    
    const response = await axiosLsh.get(`/courses/${courseId}/lectures?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('과정별 강의 목록 조회 실패:', error)
    throw error
  }
}

// 강의 상세 조회
export const getLectureDetail = async (lectureId) => {
  try {
    const response = await axiosLsh.get(`/lectures/${lectureId}`)
    return response.data
  } catch (error) {
    console.error('강의 상세 조회 실패:', error)
    throw error
  }
}

// 강의 생성
export const createLecture = async (courseId, lectureData) => {
  try {
    const response = await axiosLsh.post(`/courses/${courseId}/lectures`, lectureData)
    return response.data
  } catch (error) {
    console.error('강의 생성 실패:', error)
    throw error
  }
}

// 강의 수정
export const updateLecture = async (lectureId, lectureData) => {
  try {
    const response = await axiosLsh.put(`/lectures/${lectureId}`, lectureData)
    return response.data
  } catch (error) {
    console.error('강의 수정 실패:', error)
    throw error
  }
}

// 강의 삭제
export const deleteLecture = async (lectureId) => {
  try {
    const response = await axiosLsh.delete(`/lectures/${lectureId}`)
    return response.data
  } catch (error) {
    console.error('강의 삭제 실패:', error)
    throw error
  }
}

// 강의 상태 변경
export const updateLectureStatus = async (lectureId, status) => {
  try {
    const response = await axiosLsh.patch(`/lectures/${lectureId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('강의 상태 변경 실패:', error)
    throw error
  }
}

// ===== 강의 자료 관리 API 함수들 =====

// 강의 자료 목록 조회
export const getLectureMaterials = async (lectureId) => {
  try {
    const response = await axiosLsh.get(`/lectures/${lectureId}/materials`)
    return response.data
  } catch (error) {
    console.error('강의 자료 목록 조회 실패:', error)
    throw error
  }
}

// 강의 자료 삭제
export const deleteLectureMaterial = async (lectureId, materialId) => {
  try {
    const response = await axiosLsh.delete(`/lectures/${lectureId}/materials/${materialId}`)
    return response.data
  } catch (error) {
    console.error('강의 자료 삭제 실패:', error)
    throw error
  }
}


// ==================================================================================
// ===== 강사 설문조사 시스템 API 함수들 (INSTRUCTOR SURVEY MANAGEMENT) =====
// ==================================================================================

// 강의별 설문 결과 상세 조회
export const getLectureSurveyDetail = async (lectureId) => {
  try {
    const response = await axiosLsh.get(`/lectures/${lectureId}/survey`)
    return response.data
  } catch (error) {
    console.error('강의별 설문 상세 조회 실패:', error)
    throw error
  }
}


// 전체 설문 결과 분석 조회
export const getSurveyAnalysis = async (lectureId, params = {}) => {
  try {
    const { analysisType = 'summary' } = params
    const queryParams = new URLSearchParams({ analysisType })
    
    const response = await axiosLsh.get(`/lectures/${lectureId}/survey/analysis?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('전체 설문 결과 분석 조회 실패:', error)
    throw error
  }
}

// ==================================================================================
// ===== 학생 설문조사 시스템 API 함수들 (STUDENT SURVEY SYSTEM) =====
// ==================================================================================

// ===== 학생 설문 조회 API 함수들 =====

// 학생 수강 강의 목록 조회 (설문 가능한 강의들)
export const getStudentEnrolledCourses = async (studentId, params = {}) => {
  try {
    const { page = 1, limit = 10, status = 'all', period = 'current' } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      period,
    })
    
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosLsh.get(`/students/${studentId}/courses?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('학생 수강 강의 목록 조회 실패:', error)
    throw error
  }
}

// 설문 시작
export const startStudentSurvey = async (lectureId, studentId) => {
  try {
    const response = await axiosLsh.post(`/lectures/${lectureId}/survey/start`, {
      studentId,
      startedAt: new Date().toISOString(),
    })
    return response.data
  } catch (error) {
    console.error('설문 시작 실패:', error)
    throw error
  }
}

// 설문 응답 제출
export const submitStudentSurvey = async (lectureId, studentId, surveyData) => {
  try {
    const response = await axiosLsh.post(`/lectures/${lectureId}/survey/submit`, {
      studentId,
      responses: surveyData.responses,
      feedback: surveyData.feedback,
      submittedAt: new Date().toISOString(),
    })
    return response.data
  } catch (error) {
    console.error('설문 응답 제출 실패:', error)
    throw error
  }
}

// ==================================================================================
// ===== 직원 설문 관리 시스템 API 함수들 (STAFF SURVEY MANAGEMENT) =====
// ==================================================================================

// ===== 설문 대시보드 API 함수들 (/survey/page.jsx) =====

// 설문 통계 데이터 조회
export const getSurveyStats = async () => {
  try {
    const response = await axiosLsh.get('/survey/stats')
    return response.data
  } catch (error) {
    console.error('설문 통계 데이터 조회 실패:', error)
    throw error
  }
}

// 최근 설문 현황 조회
export const getRecentSurveys = async (params = {}) => {
  try {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosLsh.get(`/survey/recent?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('최근 설문 현황 조회 실패:', error)
    throw error
  }
}

// ===== 평가 항목 관리 API 함수들 (/survey/items/page.jsx) =====

// 평가 항목 목록 조회
export const getSurveyItems = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search, category, type } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (category && category !== '전체') queryParams.append('category', category)
    if (type && type !== '전체') queryParams.append('type', type)
    
    const response = await axiosLsh.get(`/survey/items?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('평가 항목 목록 조회 실패:', error)
    throw error
  }
}

// 평가 항목 통계 조회
export const getSurveyItemStats = async () => {
  try {
    const response = await axiosLsh.get('/survey/items/stats')
    return response.data
  } catch (error) {
    console.error('평가 항목 통계 조회 실패:', error)
    throw error
  }
}

// 평가 항목 생성
export const createSurveyItem = async (itemData) => {
  try {
    const response = await axiosLsh.post('/survey/items', itemData)
    return response.data
  } catch (error) {
    console.error('평가 항목 생성 실패:', error)
    throw error
  }
}

// 평가 항목 수정
export const updateSurveyItem = async (itemId, itemData) => {
  try {
    const response = await axiosLsh.put(`/survey/items/${itemId}`, itemData)
    return response.data
  } catch (error) {
    console.error('평가 항목 수정 실패:', error)
    throw error
  }
}

// 평가 항목 삭제
export const deleteSurveyItem = async (itemId) => {
  try {
    const response = await axiosLsh.delete(`/survey/items/${itemId}`)
    return response.data
  } catch (error) {
    console.error('평가 항목 삭제 실패:', error)
    throw error
  }
}

// ===== 설문 템플릿 관리 API 함수들 (/survey/templates/page.jsx) =====

// 설문 템플릿 목록 조회
export const getSurveyTemplates = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search, category } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (category && category !== 'all') queryParams.append('category', category)
    
    const response = await axiosLsh.get(`/survey/templates?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('설문 템플릿 목록 조회 실패:', error)
    throw error
  }
}

// 설문 템플릿 생성
export const createSurveyTemplate = async (templateData) => {
  try {
    const response = await axiosLsh.post('/survey/templates', templateData)
    return response.data
  } catch (error) {
    console.error('설문 템플릿 생성 실패:', error)
    throw error
  }
}

// 설문 템플릿 수정
export const updateSurveyTemplate = async (templateId, templateData) => {
  try {
    const response = await axiosLsh.put(`/survey/templates/${templateId}`, templateData)
    return response.data
  } catch (error) {
    console.error('설문 템플릿 수정 실패:', error)
    throw error
  }
}

// 설문 템플릿 삭제
export const deleteSurveyTemplate = async (templateId) => {
  try {
    const response = await axiosLsh.delete(`/survey/templates/${templateId}`)
    return response.data
  } catch (error) {
    console.error('설문 템플릿 삭제 실패:', error)
    throw error
  }
}

// 템플릿용 사용 가능한 질문 목록 조회
export const getAvailableQuestions = async () => {
  try {
    const response = await axiosLsh.get('/survey/questions/available')
    return response.data
  } catch (error) {
    console.error('사용 가능한 질문 목록 조회 실패:', error)
    throw error
  }
}

// ===== 강의별 설문 관리 API 함수들 (/survey/lectures/page.jsx) =====

// 강의 설문 현황 목록 조회
export const getLectureSurveys = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search, status, category } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (status && status !== 'all') queryParams.append('status', status)
    if (category && category !== 'all') queryParams.append('category', category)
    
    const response = await axiosLsh.get(`/survey/lectures?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('강의 설문 현황 목록 조회 실패:', error)
    throw error
  }
}

// 강의별 설문 활성화/비활성화
export const toggleLectureSurvey = async (lectureId, isActive) => {
  try {
    const response = await axiosLsh.patch(`/survey/lectures/${lectureId}/toggle`, {
      isActive,
    })
    return response.data
  } catch (error) {
    console.error('강의별 설문 활성화/비활성화 실패:', error)
    throw error
  }
}

// 강의에 설문 템플릿 적용
export const applyTemplateToLecture = async (lectureId, templateId) => {
  try {
    const response = await axiosLsh.post(`/survey/lectures/${lectureId}/apply-template`, {
      templateId,
    })
    return response.data
  } catch (error) {
    console.error('강의에 설문 템플릿 적용 실패:', error)
    throw error
  }
}

