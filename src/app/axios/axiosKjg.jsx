import axios from 'axios'

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log('API 요청:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API 에러:', error.response?.status, error.config?.url, error.message)
    
    // 401 에러 처리 (인증 실패)
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    
    // 403 에러 처리 (권한 없음)
    if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다.')
    }
    
    // 500 에러 처리 (서버 에러)
    if (error.response?.status >= 500) {
      console.error('서버 내부 오류가 발생했습니다.')
    }
    
    return Promise.reject(error)
  }
)

export default api

// ====================================
// 🔐 인증 관련 API
// ====================================

// 로그인
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error)
    throw error
  }
}

// 로그아웃
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout')
    return response.data
  } catch (error) {
    console.error('로그아웃 실패:', error)
    throw error
  }
}

// 토큰 갱신
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await api.post('/auth/refresh', {
      refreshToken
    })
    return response.data
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    throw error
  }
}

// 사용자 정보 조회
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile')
    return response.data
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

// ====================================
// 🏠 대시보드 관련 API
// ====================================

// 대시보드 통계 조회
export const fetchDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats')
    return response.data
  } catch (error) {
    console.error('대시보드 통계 조회 실패:', error)
    throw error
  }
}

// 최근 활동 조회
export const fetchRecentActivities = async (limit = 10) => {
  try {
    const response = await api.get(`/dashboard/activities?limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('최근 활동 조회 실패:', error)
    throw error
  }
}

// ====================================
// 📝 공통 유틸리티 함수
// ====================================

// 파일 업로드
export const uploadFile = async (file, uploadPath = '/upload') => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post(uploadPath, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('파일 업로드 실패:', error)
    throw error
  }
}

// 파일 다운로드
export const downloadFile = async (fileId, filename) => {
  try {
    const response = await api.get(`/files/${fileId}`, {
      responseType: 'blob',
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('파일 다운로드 실패:', error)
    throw error
  }
}

// ====================================
// 👥 계정 관리 API
// ====================================

// 개별 계정 등록
export const registerAccount = async (accountData) => {
  try {
    const response = await api.post('/accounts/register', accountData)
    return response.data
  } catch (error) {
    console.error('계정 등록 실패:', error)
    throw error
  }
}

// 일괄 계정 등록 (CSV 데이터)
export const registerAccountsBulk = async (csvData) => {
  try {
    const response = await api.post('/accounts/register/bulk', {
      csvData
    })
    return response.data
  } catch (error) {
    console.error('일괄 계정 등록 실패:', error)
    throw error
  }
}

// 일괄 계정 등록 (파일 업로드)
export const registerAccountsFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/accounts/register/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('파일 일괄 계정 등록 실패:', error)
    throw error
  }
}

// 계정 목록 조회
export const fetchAccounts = async (params = {}) => {
  try {
    const response = await api.get('/accounts', { params })
    return response.data
  } catch (error) {
    console.error('계정 목록 조회 실패:', error)
    throw error
  }
}

// 특정 계정 조회
export const fetchAccount = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}`)
    return response.data
  } catch (error) {
    console.error('계정 조회 실패:', error)
    throw error
  }
}

// 계정 정보 수정
export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await api.put(`/accounts/${accountId}`, accountData)
    return response.data
  } catch (error) {
    console.error('계정 정보 수정 실패:', error)
    throw error
  }
}

// 계정 삭제
export const deleteAccount = async (accountId) => {
  try {
    const response = await api.delete(`/accounts/${accountId}`)
    return response.data
  } catch (error) {
    console.error('계정 삭제 실패:', error)
    throw error
  }
}

// 계정 활성화/비활성화
export const toggleAccountStatus = async (accountId, isActive) => {
  try {
    const response = await api.put(`/accounts/${accountId}/status`, {
      isActive
    })
    return response.data
  } catch (error) {
    console.error('계정 상태 변경 실패:', error)
    throw error
  }
}

// 아이디 중복 체크
export const checkUserIdDuplicate = async (userId) => {
  try {
    const response = await api.get(`/accounts/check-duplicate/${userId}`)
    return response.data
  } catch (error) {
    console.error('아이디 중복 체크 실패:', error)
    throw error
  }
}

// 비밀번호 초기화
export const resetPassword = async (accountId, newPassword) => {
  try {
    const response = await api.put(`/accounts/${accountId}/reset-password`, {
      newPassword
    })
    return response.data
  } catch (error) {
    console.error('비밀번호 초기화 실패:', error)
    throw error
  }
}

// 사용자 유형별 계정 조회
export const fetchAccountsByUserType = async (userType, params = {}) => {
  try {
    const response = await api.get(`/accounts/by-type/${userType}`, { params })
    return response.data
  } catch (error) {
    console.error('사용자 유형별 계정 조회 실패:', error)
    throw error
  }
}

// ====================================
// 📋 계정 등록 템플릿 및 도구 API
// ====================================

// CSV 등록 템플릿 다운로드
export const downloadAccountTemplate = async () => {
  try {
    const response = await api.get('/accounts/template/csv', {
      responseType: 'blob',
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', '계정등록_템플릿.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('템플릿 다운로드 실패:', error)
    throw error
  }
}

// 일괄 등록 결과 조회
export const fetchBulkRegistrationResult = async (batchId) => {
  try {
    const response = await api.get(`/accounts/bulk-result/${batchId}`)
    return response.data
  } catch (error) {
    console.error('일괄 등록 결과 조회 실패:', error)
    throw error
  }
}

// 계정 등록 통계
export const fetchAccountStats = async () => {
  try {
    const response = await api.get('/accounts/stats')
    return response.data
  } catch (error) {
    console.error('계정 통계 조회 실패:', error)
    throw error
  }
}

// ====================================
// 🏢 조직 정보 관리 API
// ====================================

// 부서 목록 조회
export const fetchDepartments = async () => {
  try {
    const response = await api.get('/organization/departments')
    return response.data
  } catch (error) {
    console.error('부서 목록 조회 실패:', error)
    throw error
  }
}

// 직책 목록 조회
export const fetchPositions = async () => {
  try {
    const response = await api.get('/organization/positions')
    return response.data
  } catch (error) {
    console.error('직책 목록 조회 실패:', error)
    throw error
  }
}

// 과목 목록 조회 (강사용)
export const fetchSubjects = async () => {
  try {
    const response = await api.get('/organization/subjects')
    return response.data
  } catch (error) {
    console.error('과목 목록 조회 실패:', error)
    throw error
  }
}

// 학과 목록 조회 (학생용)
export const fetchMajors = async () => {
  try {
    const response = await api.get('/organization/majors')
    return response.data
  } catch (error) {
    console.error('학과 목록 조회 실패:', error)
    throw error
  }
}

// 학년 목록 조회 (학생용)
export const fetchGrades = async () => {
  try {
    const response = await api.get('/organization/grades')
    return response.data
  } catch (error) {
    console.error('학년 목록 조회 실패:', error)
    throw error
  }
}

// ====================================
// 🔐 계정 권한 관리 API
// ====================================

// 계정 권한 조회
export const fetchAccountPermissions = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/permissions`)
    return response.data
  } catch (error) {
    console.error('계정 권한 조회 실패:', error)
    throw error
  }
}

// 계정 권한 수정
export const updateAccountPermissions = async (accountId, permissions) => {
  try {
    const response = await api.put(`/accounts/${accountId}/permissions`, {
      permissions
    })
    return response.data
  } catch (error) {
    console.error('계정 권한 수정 실패:', error)
    throw error
  }
}

// 사용자 유형별 기본 권한 조회
export const fetchDefaultPermissions = async (userType) => {
  try {
    const response = await api.get(`/accounts/permissions/default/${userType}`)
    return response.data
  } catch (error) {
    console.error('기본 권한 조회 실패:', error)
    throw error
  }
}
