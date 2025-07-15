import { useState, useEffect, useCallback, useRef } from 'react'

const SOCKET_URL = 'ws://localhost:3001'

export const useMockChatRoom = (roomId, currentUserId, currentUserName) => {
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState(null)
  const typingTimeoutRef = useRef(null)

  // WebSocket 연결
  useEffect(() => {
    if (!roomId || !currentUserId) return

    const ws = new WebSocket(`${SOCKET_URL}?roomId=${roomId}&userId=${currentUserId}&userName=${currentUserName}`)

    ws.onopen = () => {
      console.log('WebSocket 연결됨')
      setIsConnected(true)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        switch (data.type) {
          case 'message':
            setMessages(prev => [...prev, data.message])
            break
          case 'typing':
            if (data.userId !== currentUserId) {
              setTypingUsers(prev => {
                if (data.isTyping) {
                  return [...prev.filter(user => user.userId !== data.userId), {
                    userId: data.userId,
                    userName: data.userName
                  }]
                } else {
                  return prev.filter(user => user.userId !== data.userId)
                }
              })
            }
            break
          case 'user_joined':
            setMessages(prev => [...prev, {
              id: `system_${Date.now()}`,
              type: 'system',
              content: `${data.userName}님이 참여했습니다.`,
              time: new Date().toISOString()
            }])
            break
          case 'user_left':
            setMessages(prev => [...prev, {
              id: `system_${Date.now()}`,
              type: 'system',
              content: `${data.userName}님이 나갔습니다.`,
              time: new Date().toISOString()
            }])
            break
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket 연결 해제됨')
      setIsConnected(false)
    }

    ws.onerror = (error) => {
      console.error('WebSocket 오류:', error)
      setIsConnected(false)
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [roomId, currentUserId, currentUserName])

  // 타이핑 상태 전송
  const handleTyping = useCallback(() => {
    if (!socket || !isConnected) return

    // 타이핑 시작 알림
    socket.send(JSON.stringify({
      type: 'typing',
      roomId,
      userId: currentUserId,
      userName: currentUserName,
      isTyping: true
    }))

    // 타이핑 중지 타이머 리셋
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (socket && isConnected) {
        socket.send(JSON.stringify({
          type: 'typing',
          roomId,
          userId: currentUserId,
          userName: currentUserName,
          isTyping: false
        }))
      }
    }, 1000)
  }, [socket, isConnected, roomId, currentUserId, currentUserName])

  // 메시지 전송
  const sendMessage = useCallback((content) => {
    if (!socket || !isConnected || !content.trim()) return

    const message = {
      id: Date.now(),
      content: content.trim(),
      sender: { id: currentUserId, name: currentUserName },
      time: new Date().toISOString(),
      isMe: true,
      type: 'message'
    }

    // 메시지 전송
    socket.send(JSON.stringify({
      type: 'message',
      roomId,
      message
    }))

    // 로컬 메시지 목록에 추가
    setMessages(prev => [...prev, message])

    // 타이핑 상태 제거
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    socket.send(JSON.stringify({
      type: 'typing',
      roomId,
      userId: currentUserId,
      userName: currentUserName,
      isTyping: false
    }))
  }, [socket, isConnected, roomId, currentUserId, currentUserName])

  return {
    messages,
    typingUsers,
    sendMessage,
    handleTyping,
    isConnected
  }
} 