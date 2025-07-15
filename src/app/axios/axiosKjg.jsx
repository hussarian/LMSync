import axios from 'axios'

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
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
api.interceptors.response.use(
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
// 🏢 기관(학원) 관리 API
// ====================================

// 기관 등록
export const registerInstitution = async (institutionData) => {
  try {
    const response = await api.post('/institutions/register', institutionData)
    return response.data
  } catch (error) {
    console.error('기관 등록 실패:', error)
    throw error
  }
}

// 기관 목록 조회
export const fetchInstitutions = async (params = {}) => {
  try {
    const response = await api.get('/institutions', { params })
    return response.data
  } catch (error) {
    console.error('기관 목록 조회 실패:', error)
    throw error
  }
}

// 기관 정보 수정
export const updateInstitution = async (institutionId, institutionData) => {
  try {
    const response = await api.put(`/institutions/${institutionId}`, institutionData)
    return response.data
  } catch (error) {
    console.error('기관 정보 수정 실패:', error)
    throw error
  }
}

// 기관 삭제
export const deleteInstitution = async (institutionId) => {
  try {
    const response = await api.delete(`/institutions/${institutionId}`)
    return response.data
  } catch (error) {
    console.error('기관 삭제 실패:', error)
    throw error
  }
}

// 주소 검색 (다음/카카오 주소 API)
export const searchAddress = async (query) => {
  try {
    const response = await api.get('/common/address/search', {
      params: { query }
    })
    return response.data
  } catch (error) {
    console.error('주소 검색 실패:', error)
    throw error
  }
}

// 우편번호로 주소 조회
export const getAddressByPostcode = async (postcode) => {
  try {
    const response = await api.get(`/common/address/postcode/${postcode}`)
    return response.data
  } catch (error) {
    console.error('우편번호 주소 조회 실패:', error)
    throw error
  }
}

// 기관 상태 변경 (활성/비활성)
export const toggleInstitutionStatus = async (institutionId, isActive) => {
  try {
    const response = await api.put(`/institutions/${institutionId}/status`, {
      isActive
    })
    return response.data
  } catch (error) {
    console.error('기관 상태 변경 실패:', error)
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

