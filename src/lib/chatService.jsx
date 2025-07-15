// 채팅 서비스 - 실제 백엔드 API 호출

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// API 호출 헬퍼 함수
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      // TODO: JWT 토큰 추가
      // 'Authorization': `Bearer ${getToken()}`
    },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API 호출 실패');
    }
    
    return data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

// 실제 백엔드 API 호출 함수들
export const chatService = {
  // 채팅방 목록 조회
  async getChatRooms() {
    return await apiCall('/chat/rooms');
  },

  // 채팅방 메시지 조회
  async getMessages(roomId, page = 1, limit = 50) {
    return await apiCall(`/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`);
  },

  // 메시지 전송
  async sendMessage(roomId, content, type = 'text') {
    return await apiCall(`/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, type })
    });
  },

  // 사용자 검색
  async searchUsers(query, type = 'all', page = 1, limit = 20) {
    const params = new URLSearchParams({
      query,
      type,
      page: page.toString(),
      limit: limit.toString()
    });
    
    return await apiCall(`/chat/users/search?${params}`);
  },

  // 채팅방 생성
  async createChatRoom(type, name, participantIds) {
    return await apiCall('/chat/rooms', {
      method: 'POST',
      body: JSON.stringify({ type, name, participantIds })
    });
  },

  // 채팅방 정보 조회
  async getChatRoom(roomId) {
    return await apiCall(`/chat/rooms/${roomId}`);
  },

  // 읽지 않은 메시지 수 조회
  async getUnreadCount() {
    return await apiCall('/chat/unread/count');
  },

  // 메시지 읽음 처리
  async markAsRead(roomId) {
    return await apiCall(`/chat/rooms/${roomId}/read`, {
      method: 'PUT'
    });
  },

  // 파일 업로드
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return await apiCall('/chat/upload', {
      method: 'POST',
      headers: {
        // Content-Type은 자동으로 설정됨
      },
      body: formData
    });
  }
};

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