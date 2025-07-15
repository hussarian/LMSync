import { useEffect, useRef, useState, useCallback } from 'react';

// WebSocket 시뮬레이션을 위한 이벤트 시스템
class MockSocket {
  constructor() {
    this.listeners = {};
    this.connected = false;
    this.roomId = null;
    this.userId = null;
    this.userName = null;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event) {
    this.listeners[event] = [];
  }

  emit(event, data) {
    console.log(`MockSocket emit: ${event}`, data);
    
    // 이벤트 처리
    if (event === 'join_room') {
      this.roomId = data.roomId;
      this.userId = data.userId;
      this.userName = data.userName;
      this.connected = true;
      
      // 연결 이벤트 발생
      this.trigger('connect');
      
      // 다른 사용자들에게 참여 알림 (시뮬레이션)
      setTimeout(() => {
        this.trigger('user_joined', {
          userId: data.userId,
          userName: data.userName,
          time: new Date().toISOString()
        });
      }, 1000);
    }
    
    if (event === 'send_message') {
      // 메시지 전송 시뮬레이션
      setTimeout(() => {
        this.trigger('new_message', {
          roomId: data.roomId,
          message: data.message
        });
      }, 500);
    }
    
    if (event === 'typing') {
      // 타이핑 상태 시뮬레이션
      this.trigger('user_typing', {
        userId: data.userId,
        userName: data.userName,
        isTyping: data.isTyping,
        time: new Date().toISOString()
      });
    }
  }

  trigger(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  disconnect() {
    this.connected = false;
    this.trigger('disconnect');
  }
}

// 전역 MockSocket 인스턴스
let mockSocket = null;

export const useMockSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mockSocket) {
      mockSocket = new MockSocket();
    }

    mockSocket.on('connect', () => {
      console.log('MockSocket 연결됨');
      setIsConnected(true);
      setError(null);
    });

    mockSocket.on('disconnect', () => {
      console.log('MockSocket 연결 해제됨');
      setIsConnected(false);
    });

    mockSocket.on('connect_error', (err) => {
      console.error('MockSocket 연결 오류:', err);
      setError(err.message);
      setIsConnected(false);
    });

    setSocket(mockSocket);

    return () => {
      // 컴포넌트 언마운트 시 정리
    };
  }, []);

  return { socket, isConnected, error };
};

export const useMockChatRoom = (roomId, userId, userName) => {
  const { socket, isConnected } = useMockSocket();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!socket || !roomId || !userId) return;

    // 채팅방 참여
    socket.emit('join_room', { roomId, userId, userName });

    // 새 메시지 수신
    socket.on('new_message', (data) => {
      if (data.roomId === roomId) {
        setMessages(prev => [...prev, data.message]);
      }
    });

    // 사용자 참여 알림
    socket.on('user_joined', (data) => {
      if (data.userId !== userId) {
        setMessages(prev => [...prev, {
          id: `system_${Date.now()}`,
          type: 'system',
          content: `${data.userName}님이 참여했습니다.`,
          time: data.time
        }]);
      }
    });

    // 사용자 나감 알림
    socket.on('user_left', (data) => {
      if (data.userId !== userId) {
        setMessages(prev => [...prev, {
          id: `system_${Date.now()}`,
          type: 'system',
          content: `${data.userName}님이 나갔습니다.`,
          time: data.time
        }]);
      }
    });

    // 타이핑 상태 수신
    socket.on('user_typing', (data) => {
      if (data.userId !== userId) {
        setTypingUsers(prev => {
          if (data.isTyping) {
            return [...prev.filter(user => user.userId !== data.userId), data];
          } else {
            return prev.filter(user => user.userId !== data.userId);
          }
        });
      }
    });

    // 컴포넌트 언마운트 시 채팅방 나가기
    return () => {
      socket.emit('leave_room', { roomId, userId, userName });
      socket.off('new_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('user_typing');
    };
  }, [socket, roomId, userId, userName]);

  const sendMessage = useCallback((content, type = 'text') => {
    if (!socket || !roomId || !content.trim()) return;

    const message = {
      id: `msg_${Date.now()}`,
      sender: {
        id: userId,
        name: userName,
        type: 'teacher' // TODO: 실제 사용자 타입으로 변경
      },
      content: content.trim(),
      time: new Date().toISOString(),
      isMe: true,
      type
    };

    // 메시지 전송
    socket.emit('send_message', { roomId, message });
    
    // 로컬 메시지 목록에 추가
    setMessages(prev => [...prev, message]);
  }, [socket, roomId, userId, userName]);

  const sendTypingStatus = useCallback((isTyping) => {
    if (!socket || !roomId) return;

    socket.emit('typing', { roomId, userId, userName, isTyping });
    setIsTyping(isTyping);
  }, [socket, roomId, userId, userName]);

  const handleTyping = useCallback(() => {
    if (!isTyping) {
      sendTypingStatus(true);
    }

    // 타이핑 중지 타이머 리셋
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 1000);
  }, [isTyping, sendTypingStatus]);

  return {
    messages,
    typingUsers,
    isTyping,
    sendMessage,
    sendTypingStatus,
    handleTyping,
    isConnected
  };
}; 