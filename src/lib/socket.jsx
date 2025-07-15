import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // 프론트엔드 주소로 맞추세요!
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('클라이언트 연결됨:', socket.id);

    // 사용자 인증 및 채팅방 참여
    socket.on('join_room', (data) => {
      const { roomId, userId, userName } = data;
      
      socket.join(roomId);
      console.log(`사용자 ${userName} (${userId})이 채팅방 ${roomId}에 참여했습니다.`);
      
      // 다른 참여자들에게 참여 알림
      socket.to(roomId).emit('user_joined', {
        userId,
        userName,
        time: new Date().toISOString()
      });
    });

    // 채팅방 나가기
    socket.on('leave_room', (data) => {
      const { roomId, userId, userName } = data;
      
      socket.leave(roomId);
      console.log(`사용자 ${userName} (${userId})이 채팅방 ${roomId}에서 나갔습니다.`);
      
      // 다른 참여자들에게 나감 알림
      socket.to(roomId).emit('user_left', {
        userId,
        userName,
        time: new Date().toISOString()
      });
    });

    // 메시지 전송
    socket.on('send_message', (data) => {
      const { roomId, message } = data;
      
      console.log(`채팅방 ${roomId}에 메시지 전송:`, message);
      
      // 같은 채팅방의 다른 사용자들에게 메시지 전송
      socket.to(roomId).emit('new_message', {
        roomId,
        message
      });
    });

    // 타이핑 상태 전송
    socket.on('typing', (data) => {
      const { roomId, userId, userName, isTyping } = data;
      
      socket.to(roomId).emit('user_typing', {
        userId,
        userName,
        isTyping,
        time: new Date().toISOString()
      });
    });

    // 연결 해제
    socket.on('disconnect', () => {
      console.log('클라이언트 연결 해제:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io가 초기화되지 않았습니다.');
  }
  return io;
}; 