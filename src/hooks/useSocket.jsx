import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Socket.io 클라이언트 초기화
    const socketInstance = io(process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'
      : 'http://localhost:3001'
    );

    // 연결 이벤트
    socketInstance.on('connect', () => {
      console.log('Socket.io 연결됨:', socketInstance.id);
      setIsConnected(true);
      setError(null);
    });

    // 연결 해제 이벤트
    socketInstance.on('disconnect', () => {
      console.log('Socket.io 연결 해제됨');
      setIsConnected(false);
    });

    // 연결 오류 이벤트
    socketInstance.on('connect_error', (err) => {
      console.error('Socket.io 연결 오류:', err);
      setError(err.message);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected, error };
};

export const useChatRoom = (roomId, userId, userName) => {
  const { socket, isConnected } = useSocket();
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

  const sendMessage = (content, type = 'text') => {
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
  };

  const sendTypingStatus = (isTyping) => {
    if (!socket || !roomId) return;

    socket.emit('typing', { roomId, userId, userName, isTyping });
    setIsTyping(isTyping);
  };

  const handleTyping = () => {
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
  };

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