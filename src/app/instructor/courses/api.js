// 강사용 과정관리 API 연동 함수들

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// 강사의 담당 강의 목록 조회
export const fetchInstructorLectures = async (memberId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gemjjok/course/instructor/${memberId}/lectures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}` // JWT 토큰이 필요한 경우
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 목록 조회 실패:', error)
    throw error
  }
}

// 강의 상세 정보 조회
export const fetchLectureDetail = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gemjjok/course/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 상세 정보 조회 실패:', error)
    throw error
  }
}

// 강의 출석 현황 조회
export const fetchAttendanceStatus = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/attendance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('출석 현황 조회 실패:', error)
    throw error
  }
}

// 강의 자료 목록 조회
export const fetchLectureMaterials = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/materials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 자료 조회 실패:', error)
    throw error
  }
}

// 강의 과제 목록 조회
export const fetchLectureAssignments = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/assignments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 과제 조회 실패:', error)
    throw error
  }
}

// 강의 계획서 조회
export const fetchLectureSyllabus = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/syllabus`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 계획서 조회 실패:', error)
    throw error
  }
}

// 강의 계획서 저장/수정
export const saveLectureSyllabus = async (courseId, syllabus) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/syllabus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ syllabus }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 계획서 저장 실패:', error)
    throw error
  }
}

// 강의 자료 업로드
export const uploadLectureMaterial = async (courseId, file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/materials/upload`, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${token}`
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 자료 업로드 실패:', error)
    throw error
  }
}

// 강의 상태 업데이트
export const updateLectureStatus = async (courseId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 상태 업데이트 실패:', error)
    throw error
  }
}

// 강의 통계 조회
export const fetchLectureStatistics = async (memberId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gemjjok/course/instructor/${memberId}/active-lectures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('강의 통계 조회 실패:', error)
    throw error
  }
}

// 에러 처리 유틸리티 함수
export const handleApiError = (error) => {
  if (error.response) {
    // 서버에서 응답이 왔지만 에러 상태인 경우
    console.error('API Error:', error.response.data)
    return error.response.data.message || '서버 오류가 발생했습니다.'
  } else if (error.request) {
    // 요청은 보냈지만 응답을 받지 못한 경우
    console.error('Network Error:', error.request)
    return '네트워크 연결을 확인해주세요.'
  } else {
    // 요청 자체를 보내지 못한 경우
    console.error('Request Error:', error.message)
    return '요청을 처리할 수 없습니다.'
  }
}

// API 응답 데이터 변환 함수 (백엔드 데이터를 프론트엔드 형식으로 변환)
export const transformLectureData = (apiData) => {
  return apiData.map(course => ({
    courseId: course.courseId,
    lectureTitle: course.courseName, // 무조건 courseName 사용
    date: course.date || (course.courseStartDay ? new Date(course.courseStartDay).toLocaleDateString('ko-KR') : ""),
    time: course.time || (course.startTime && course.endTime
      ? `${new Date(course.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}-${new Date(course.endTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
      : ""),
    classroom: course.classroom || course.classId || "",
    attendees: null, // 출석현황(임시)
    materials: null, // 강의자료(임시)
    homework: null, // 과제(임시)
    status: course.status || (course.courseActive === 1 ? "진행중" : "예정"),
  }))
} 