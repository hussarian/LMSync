// 채팅 관련 API 서비스
const API_BASE_URL = 'http://localhost:3001/api'

export const chatService = {
  // 채팅방 목록 가져오기
  async getChatRooms() {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '채팅방 목록을 가져오는데 실패했습니다.')
      }
      
      return { success: true, data: data.rooms }
    } catch (error) {
      console.error('채팅방 목록 가져오기 오류:', error)
      return { success: false, error: error.message }
    }
  },

  // 사용자 검색
  async searchUsers(query, type = 'all') {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/users/search?q=${encodeURIComponent(query)}&type=${type}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '사용자 검색에 실패했습니다.')
      }
      
      return { success: true, data }
    } catch (error) {
      console.error('사용자 검색 오류:', error)
      return { success: false, error: error.message }
    }
  },

  // 채팅방 생성
  async createChatRoom(type, name, participantIds) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          name,
          participantIds
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '채팅방 생성에 실패했습니다.')
      }
      
      return { success: true, data: data.room }
    } catch (error) {
      console.error('채팅방 생성 오류:', error)
      return { success: false, error: error.message }
    }
  },

  // 채팅방 메시지 가져오기
  async getMessages(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms/${roomId}/messages`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '메시지를 가져오는데 실패했습니다.')
      }
      
      return { success: true, data: data.messages }
    } catch (error) {
      console.error('메시지 가져오기 오류:', error)
      return { success: false, error: error.message }
    }
  },

  // 메시지 전송
  async sendMessage(roomId, content) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '메시지 전송에 실패했습니다.')
      }
      
      return { success: true, data: data.message }
    } catch (error) {
      console.error('메시지 전송 오류:', error)
      return { success: false, error: error.message }
    }
  }
}

// WebSocket 연결을 위한 함수
export const connectWebSocket = (token) => {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';
  return new WebSocket(`${wsUrl}?token=${token}`);
};

// 에러 처리 헬퍼
export const handleApiError = (error) => {
  if (error.message.includes('401')) {
    // 인증 오류 - 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  } else if (error.message.includes('403')) {
    // 권한 오류
    alert('접근 권한이 없습니다.');
  } else if (error.message.includes('500')) {
    // 서버 오류
    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  } else {
    // 기타 오류
    alert(error.message || '오류가 발생했습니다.');
  }
}; 