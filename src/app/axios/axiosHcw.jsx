import axios from 'axios'

// ====================================
// Axios 기본 설정
// ====================================

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
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
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ====================================
// 📋 직원용 학적부 관리 API (/academic)
// ====================================

// 전체 학생 목록 조회 (검색, 필터링 포함)
export const fetchStudents = async (params = {}) => {
  try {
    const response = await api.get('/academic/students', { params })
    return response.data
  } catch (error) {
    console.error('학생 목록 조회 실패:', error)
    throw error
  }
}

// 학생 상세정보 조회
export const fetchStudentById = async (studentId) => {
  try {
    const response = await api.get(`/academic/students/${studentId}`)
    return response.data
  } catch (error) {
    console.error('학생 상세정보 조회 실패:', error)
    throw error
  }
}

// 학생 정보 수정
export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await api.put(`/academic/students/${studentId}`, studentData)
    return response.data
  } catch (error) {
    console.error('학생 정보 수정 실패:', error)
    throw error
  }
}

// 학생 데이터 엑셀 다운로드
export const downloadStudentsExcel = async (params = {}) => {
  try {
    const response = await api.get('/academic/students/export', {
      params,
      responseType: 'blob',
    })
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `학생목록_${new Date().toISOString().split('T')[0]}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    return response.data
  } catch (error) {
    console.error('학생 데이터 다운로드 실패:', error)
    throw error
  }
}

// ====================================
// 🎓 강사용 학적부 관리 API (/instructor/academic)
// ====================================

// 강사별 담당 학생 목록 조회
export const fetchInstructorStudents = async (instructorId, params = {}) => {
  try {
    const response = await api.get(`/instructor/academic/students`, { params })
    return response.data
  } catch (error) {
    console.error('강사별 담당 학생 조회 실패:', error)
    throw error
  }
}

// 강사별 담당 강의 정보 조회
export const fetchInstructorCourses = async (instructorId) => {
  try {
    const response = await api.get(`/instructor/academic/courses`)
    return response.data
  } catch (error) {
    console.error('강사별 담당 강의 조회 실패:', error)
    throw error
  }
}

// 강사 관점에서 학생 상세정보 조회
export const fetchInstructorStudentDetail = async (studentId) => {
  try {
    const response = await api.get(`/instructor/academic/students/${studentId}`)
    return response.data
  } catch (error) {
    console.error('강사 관점 학생 상세정보 조회 실패:', error)
    throw error
  }
}

// ====================================
// 🎒 학생용 출석 관리 API (/student/my-courses)
// ====================================

// 학생 개인 출석 통계 조회
export const fetchStudentAttendanceStats = async () => {
  try {
    const response = await api.get('/student/attendance/stats')
    return response.data
  } catch (error) {
    console.error('학생 출석 통계 조회 실패:', error)
    throw error
  }
}

// 학생 최근 출석 기록 조회
export const fetchStudentRecentAttendance = async (limit = 10) => {
  try {
    const response = await api.get('/student/attendance/recent', {
      params: { limit }
    })
    return response.data
  } catch (error) {
    console.error('학생 최근 출석 기록 조회 실패:', error)
    throw error
  }
}

// 학생 오늘의 강의 일정 조회
export const fetchStudentTodaySchedule = async () => {
  try {
    const response = await api.get('/student/courses/today')
    return response.data
  } catch (error) {
    console.error('학생 오늘 강의 일정 조회 실패:', error)
    throw error
  }
}

// 학생 현재 진행중인 강의 조회
export const fetchStudentCurrentClass = async () => {
  try {
    const response = await api.get('/student/courses/current')
    return response.data
  } catch (error) {
    console.error('현재 진행중인 강의 조회 실패:', error)
    throw error
  }
}


// 학생 QR 코드로 출석 체크인
export const submitStudentQRAttendance = async (qrData) => {
  try {
    const response = await api.post('/student/attendance/qr-checkin', {
      qrData
    })
    return response.data
  } catch (error) {
    console.error('QR 출석 체크인 실패:', error)
    throw error
  }
}

// 학생 출석 기록 조회 (필터링 포함)
export const fetchStudentAttendanceHistory = async (params = {}) => {
  try {
    const response = await api.get('/student/attendance/history', { params })
    return response.data
  } catch (error) {
    console.error('학생 출석 기록 조회 실패:', error)
    throw error
  }
}

// 학생 수강 과목 목록 조회
export const fetchStudentSubjects = async () => {
  try {
    const response = await api.get('/student/courses/subjects')
    return response.data
  } catch (error) {
    console.error('학생 수강 과목 조회 실패:', error)
    throw error
  }
}

// 학생 출석 기록 CSV 내보내기
export const exportStudentAttendanceCSV = async (params = {}) => {
  try {
    const response = await api.get('/student/attendance/export', {
      params,
      responseType: 'blob',
    })
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `내출석기록_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    return response.data
  } catch (error) {
    console.error('학생 출석 기록 내보내기 실패:', error)
    throw error
  }
}


// 학생 강의별 출석 현황 조회
export const fetchStudentCourseAttendance = async (courseId) => {
  try {
    const response = await api.get(`/student/courses/${courseId}/attendance`)
    return response.data
  } catch (error) {
    console.error('강의별 출석 현황 조회 실패:', error)
    throw error
  }
}



// ====================================
// 📊 직원용 출결 관리 API (/academic/attendance)
// ====================================

// 전체 출석 데이터 조회 (날짜별, 상태별 필터링 포함)
export const fetchAttendanceData = async (params = {}) => {
  try {
    const response = await api.get('/academic/attendance', { params })
    return response.data
  } catch (error) {
    console.error('출석 데이터 조회 실패:', error)
    throw error
  }
}

// 출석 상태 변경
export const updateAttendanceStatus = async (attendanceId, status) => {
  try {
    const response = await api.patch(`/academic/attendance/${attendanceId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('출석 상태 변경 실패:', error)
    throw error
  }
}

// 출석 정보 상세 수정 (시간, 메모 등)
export const updateAttendanceDetails = async (attendanceId, attendanceData) => {
  try {
    const response = await api.put(`/academic/attendance/${attendanceId}`, attendanceData)
    return response.data
  } catch (error) {
    console.error('출석 정보 수정 실패:', error)
    throw error
  }
}

// 출석 통계 조회
export const fetchAttendanceStats = async (params = {}) => {
  try {
    const response = await api.get('/academic/attendance/stats', { params })
    return response.data
  } catch (error) {
    console.error('출석 통계 조회 실패:', error)
    throw error
  }
}

// ====================================
// 🎯 강사용 출결 관리 API (/instructor/academic/attendance)
// ====================================

// 강사별 담당 강의 출석 현황 조회
export const fetchInstructorAttendance = async (params = {}) => {
  try {
    const response = await api.get(`/instructor/academic/attendance`, { params })
    return response.data
  } catch (error) {
    console.error('강사별 출석 현황 조회 실패:', error)
    throw error
  }
}

// 강의별 출석 현황 조회
export const fetchLectureAttendance = async (lectureId, params = {}) => {
  try {
    const response = await api.get(`/instructor/academic/lectures/${lectureId}/attendance`, { params })
    return response.data
  } catch (error) {
    console.error('강의별 출석 현황 조회 실패:', error)
    throw error
  }
}

// 출석 상태 일괄 변경 (강사용)
export const updateInstructorBulkAttendance = async (attendanceUpdates) => {
  try {
    const response = await api.patch('/instructor/academic/attendance/bulk-update', { updates: attendanceUpdates })
    return response.data
  } catch (error) {
    console.error('강사 출석 상태 일괄 변경 실패:', error)
    throw error
  }
}

// 강사용 QR 출석 코드 생성
export const generateQRAttendanceCode = async (lectureId, settings = {}) => {
  try {
    const response = await api.post(`/instructor/academic/qr/generate`, {
      lectureId,
      ...settings
    })
    return response.data
  } catch (error) {
    console.error('QR 출석 코드 생성 실패:', error)
    throw error
  }
}

// QR 출석 현황 조회
export const fetchQRAttendanceStatus = async (qrCodeId) => {
  try {
    const response = await api.get(`/instructor/academic/qr/${qrCodeId}/status`)
    return response.data
  } catch (error) {
    console.error('QR 출석 현황 조회 실패:', error)
    throw error
  }
}

// QR 출석 세션 종료
export const closeQRAttendanceSession = async (qrCodeId) => {
  try {
    const response = await api.post(`/instructor/academic/qr/${qrCodeId}/close`)
    return response.data
  } catch (error) {
    console.error('QR 출석 세션 종료 실패:', error)
    throw error
  }
}

// ====================================
// 🏫 강의실 관리 API (/classroom)
// ====================================

// 강의실 목록 조회 (검색, 필터링 포함)
export const fetchRooms = async (params = {}) => {
  try {
    const response = await api.get('/classroom/rooms', { params })
    return response.data
  } catch (error) {
    console.error('강의실 목록 조회 실패:', error)
    throw error
  }
}

// 강의실 상세정보 조회
export const fetchRoomById = async (roomId) => {
  try {
    const response = await api.get(`/classroom/rooms/${roomId}`)
    return response.data
  } catch (error) {
    console.error('강의실 상세정보 조회 실패:', error)
    throw error
  }
}

// 새 강의실 등록
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/classroom/rooms', roomData)
    return response.data
  } catch (error) {
    console.error('강의실 등록 실패:', error)
    throw error
  }
}

// 강의실 정보 수정
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/classroom/rooms/${roomId}`, roomData)
    return response.data
  } catch (error) {
    console.error('강의실 정보 수정 실패:', error)
    throw error
  }
}

// 강의실 삭제
export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/classroom/rooms/${roomId}`)
    return response.data
  } catch (error) {
    console.error('강의실 삭제 실패:', error)
    throw error
  }
}

// 실시간 강의실 현황 조회
export const fetchRoomStatus = async () => {
  try {
    const response = await api.get('/classroom/rooms/status')
    return response.data
  } catch (error) {
    console.error('강의실 현황 조회 실패:', error)
    throw error
  }
}

// 강의실 상태 변경
export const updateRoomStatus = async (roomId, status) => {
  try {
    const response = await api.patch(`/classroom/rooms/${roomId}/status`, { status })
    return response.data
  } catch (error) {
    console.error('강의실 상태 변경 실패:', error)
    throw error
  }
}

// 강의실 엑셀 일괄 등록
export const uploadRoomsExcel = async (file, onUploadProgress) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/classroom/rooms/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onUploadProgress(percentCompleted)
        }
      },
    })
    return response.data
  } catch (error) {
    console.error('강의실 엑셀 업로드 실패:', error)
    throw error
  }
}

// 강의실 등록 템플릿 다운로드
export const downloadRoomsTemplate = async () => {
  try {
    const response = await api.get('/classroom/rooms/template', {
      responseType: 'blob',
    })
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', '강의실등록_템플릿.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    return response.data
  } catch (error) {
    console.error('강의실 템플릿 다운로드 실패:', error)
    throw error
  }
}

// 강의실 데이터 엑셀 다운로드
export const downloadRoomsExcel = async (params = {}) => {
  try {
    const response = await api.get('/classroom/rooms/export', {
      params,
      responseType: 'blob',
    })
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `강의실목록_${new Date().toISOString().split('T')[0]}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    return response.data
  } catch (error) {
    console.error('강의실 데이터 다운로드 실패:', error)
    throw error
  }
}

// ====================================
// 🏫 강의실 장비 관리 API
// ====================================

// 사용 가능한 장비 목록 조회
export const fetchEquipmentOptions = async () => {
  try {
    const response = await api.get('/classroom/equipment/options')
    return response.data
  } catch (error) {
    console.error('장비 목록 조회 실패:', error)
    throw error
  }
}

// 강의실 장비 정보 수정
export const updateRoomEquipment = async (roomId, equipmentList) => {
  try {
    const response = await api.put(`/classroom/rooms/${roomId}/equipment`, { equipment: equipmentList })
    return response.data
  } catch (error) {
    console.error('강의실 장비 정보 수정 실패:', error)
    throw error
  }
}

// 장비별 강의실 조회
export const fetchRoomsByEquipment = async (equipmentId) => {
  try {
    const response = await api.get(`/classroom/equipment/${equipmentId}/rooms`)
    return response.data
  } catch (error) {
    console.error('장비별 강의실 조회 실패:', error)
    throw error
  }
}

// ====================================
// 📊 강의실 사용률 및 통계 API
// ====================================

// 건물별 강의실 현황 조회
export const fetchRoomsByBuilding = async (building) => {
  try {
    const response = await api.get(`/classroom/buildings/${building}/rooms`)
    return response.data
  } catch (error) {
    console.error('건물별 강의실 현황 조회 실패:', error)
    throw error
  }
}

export default api
