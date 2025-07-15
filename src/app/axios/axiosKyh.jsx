import axios from 'axios'

// Axios 인스턴스 생성
const axiosKyh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosKyh.interceptors.request.use(
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
axiosKyh.interceptors.response.use(
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
// ===== 권한 관리 시스템 API 함수들 (PERMISSION MANAGEMENT) =====
// ==================================================================================

// ===== 직원 관리 API 함수들 =====

// 직원 목록 조회 (검색, 필터링 포함)
export const getStaffList = async (params = {}) => {
  try {
    const { search, role, department, status, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) queryParams.append('search', search)
    if (role && role !== 'all') queryParams.append('role', role)
    if (department && department !== 'all') queryParams.append('department', department)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosKyh.get(`/permission/staff?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('직원 목록 조회 실패:', error)
    throw error
  }
}

// 직원 상세 조회
export const getStaffDetail = async (staffId) => {
  try {
    const response = await axiosKyh.get(`/permission/staff/${staffId}`)
    return response.data
  } catch (error) {
    console.error('직원 상세 조회 실패:', error)
    throw error
  }
}

// 직원 생성
export const createStaff = async (staffData) => {
  try {
    const response = await axiosKyh.post('/permission/staff', staffData)
    return response.data
  } catch (error) {
    console.error('직원 생성 실패:', error)
    throw error
  }
}

// 직원 정보 수정
export const updateStaff = async (staffId, staffData) => {
  try {
    const response = await axiosKyh.put(`/permission/staff/${staffId}`, staffData)
    return response.data
  } catch (error) {
    console.error('직원 정보 수정 실패:', error)
    throw error
  }
}

// 직원 삭제
export const deleteStaff = async (staffId) => {
  try {
    const response = await axiosKyh.delete(`/permission/staff/${staffId}`)
    return response.data
  } catch (error) {
    console.error('직원 삭제 실패:', error)
    throw error
  }
}

// 직원 상태 변경 (활성/비활성)
export const updateStaffStatus = async (staffId, status) => {
  try {
    const response = await axiosKyh.patch(`/permission/staff/${staffId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('직원 상태 변경 실패:', error)
    throw error
  }
}

// ===== 권한 관리 API 함수들 =====

// 직원 권한 조회
export const getStaffPermissions = async (staffId) => {
  try {
    const response = await axiosKyh.get(`/permission/staff/${staffId}/permissions`)
    return response.data
  } catch (error) {
    console.error('직원 권한 조회 실패:', error)
    throw error
  }
}

// 직원 권한 수정
export const updateStaffPermissions = async (staffId, permissions) => {
  try {
    const response = await axiosKyh.put(`/permission/staff/${staffId}/permissions`, {
      permissions,
    })
    return response.data
  } catch (error) {
    console.error('직원 권한 수정 실패:', error)
    throw error
  }
}

// 현재 사용자 권한 조회
export const getCurrentUserPermissions = async () => {
  try {
    const response = await axiosKyh.get('/permission/my-permissions')
    return response.data
  } catch (error) {
    console.error('현재 사용자 권한 조회 실패:', error)
    throw error
  }
}

// 권한 카테고리 목록 조회
export const getPermissionCategories = async () => {
  try {
    const response = await axiosKyh.get('/permission/categories')
    return response.data
  } catch (error) {
    console.error('권한 카테고리 조회 실패:', error)
    throw error
  }
}

// ===== 역할 관리 API 함수들 =====

// 직원 역할 변경
export const updateStaffRole = async (staffId, role) => {
  try {
    const response = await axiosKyh.patch(`/permission/staff/${staffId}/role`, { role })
    return response.data
  } catch (error) {
    console.error('직원 역할 변경 실패:', error)
    throw error
  }
}

// 역할별 기본 권한 조회
export const getRoleDefaultPermissions = async (role) => {
  try {
    const response = await axiosKyh.get(`/permission/roles/${role}/default-permissions`)
    return response.data
  } catch (error) {
    console.error('역할별 기본 권한 조회 실패:', error)
    throw error
  }
}

// 사용 가능한 역할 목록 조회
export const getAvailableRoles = async () => {
  try {
    const response = await axiosKyh.get('/permission/roles')
    return response.data
  } catch (error) {
    console.error('역할 목록 조회 실패:', error)
    throw error
  }
}

// ===== 부서 관리 API 함수들 =====

// 부서 목록 조회
export const getDepartments = async () => {
  try {
    const response = await axiosKyh.get('/permission/departments')
    return response.data
  } catch (error) {
    console.error('부서 목록 조회 실패:', error)
    throw error
  }
}

// 부서별 직원 목록 조회
export const getStaffByDepartment = async (departmentId, params = {}) => {
  try {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosKyh.get(`/permission/departments/${departmentId}/staff?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('부서별 직원 목록 조회 실패:', error)
    throw error
  }
}

// ===== 일괄 작업 API 함수들 =====

// 일괄 권한 업데이트
export const bulkUpdatePermissions = async (staffIds, permissions) => {
  try {
    const response = await axiosKyh.post('/permission/bulk/permissions', {
      staffIds,
      permissions,
    })
    return response.data
  } catch (error) {
    console.error('일괄 권한 업데이트 실패:', error)
    throw error
  }
}

// 일괄 역할 변경
export const bulkUpdateRoles = async (staffIds, role) => {
  try {
    const response = await axiosKyh.post('/permission/bulk/roles', {
      staffIds,
      role,
    })
    return response.data
  } catch (error) {
    console.error('일괄 역할 변경 실패:', error)
    throw error
  }
}

// 일괄 상태 변경
export const bulkUpdateStatus = async (staffIds, status) => {
  try {
    const response = await axiosKyh.post('/permission/bulk/status', {
      staffIds,
      status,
    })
    return response.data
  } catch (error) {
    console.error('일괄 상태 변경 실패:', error)
    throw error
  }
}

// ===== 검색 및 필터링 API 함수들 =====

// 직원 검색
export const searchStaff = async (query, filters = {}) => {
  try {
    const { role, department, status, page = 1, limit = 10 } = filters
    const queryParams = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (role && role !== 'all') queryParams.append('role', role)
    if (department && department !== 'all') queryParams.append('department', department)
    if (status && status !== 'all') queryParams.append('status', status)
    
    const response = await axiosKyh.get(`/permission/search/staff?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('직원 검색 실패:', error)
    throw error
  }
}

// 권한별 직원 검색
export const getStaffByPermission = async (permissionKey, params = {}) => {
  try {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosKyh.get(`/permission/search/by-permission/${permissionKey}?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('권한별 직원 검색 실패:', error)
    throw error
  }
}

// ===== 권한 이력 관리 API 함수들 =====

// 직원 권한 변경 이력 조회
export const getStaffPermissionHistory = async (staffId, params = {}) => {
  try {
    const { page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    const response = await axiosKyh.get(`/permission/staff/${staffId}/history?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('권한 변경 이력 조회 실패:', error)
    throw error
  }
}

// 전체 권한 변경 이력 조회
export const getPermissionHistory = async (params = {}) => {
  try {
    const { staffId, action, page = 1, limit = 10 } = params
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (staffId) queryParams.append('staffId', staffId)
    if (action) queryParams.append('action', action)
    
    const response = await axiosKyh.get(`/permission/history?${queryParams}`)
    return response.data
  } catch (error) {
    console.error('권한 이력 조회 실패:', error)
    throw error
  }
}

export default axiosKyh
