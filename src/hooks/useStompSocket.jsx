import { useState, useEffect, useCallback, useRef } from 'react'
import { Client } from '@stomp/stompjs'

const STOMP_URL = 'ws://localhost:3001/ws'

export const useStompChatRoom = (roomId, currentUserId, currentUserName) => {
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState(null)
  const typingTimeoutRef = useRef(null)
  const typingPollingRef = useRef(null)
  const onlineUsersPollingRef = useRef(null)
  const isDisconnectingRef = useRef(false)

  // STOMP 클라이언트 연결
  useEffect(() => {
    if (!roomId || !currentUserId) return

    const stompClient = new Client({
      brokerURL: STOMP_URL,
      connectHeaders: {
        'roomId': roomId,
        'userId': currentUserId,
        'userName': currentUserName
      },
      debug: function (str) {
        console.log('STOMP Debug:', str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    })

    stompClient.onConnect = (frame) => {
      console.log('STOMP WebSocket 연결됨:', frame)
      setIsConnected(true)
      isDisconnectingRef.current = false

      // 채팅방 메시지 구독
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        try {
          const data = JSON.parse(message.body)
          
          if (data.type === 'message') {
            setMessages(prev => [...prev, data.message])
          }
        } catch (error) {
          console.error('STOMP 메시지 파싱 오류:', error)
        }
      })

      // 타이핑 상태 구독
      stompClient.subscribe(`/topic/room/${roomId}/typing`, (message) => {
        try {
          const data = JSON.parse(message.body)
          
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
        } catch (error) {
          console.error('STOMP 타이핑 메시지 파싱 오류:', error)
        }
      })

      // 사용자 상태 구독 (백엔드 WebSocketEventListener와 연동)
      stompClient.subscribe(`/topic/room/${roomId}/status`, (message) => {
        try {
          const data = JSON.parse(message.body)
          
          if (data.type === 'user_joined') {
            setMessages(prev => [...prev, {
              id: `system_${Date.now()}`,
              type: 'system',
              content: `${data.userName}님이 참여했습니다.`,
              time: new Date().toISOString()
            }])
            
            // 온라인 사용자 목록 업데이트
            setOnlineUsers(prev => {
              const existingUser = prev.find(user => user.userId === data.userId)
              if (!existingUser) {
                return [...prev, { userId: data.userId, userName: data.userName }]
              }
              return prev
            })
          } else if (data.type === 'user_left') {
            setMessages(prev => [...prev, {
              id: `system_${Date.now()}`,
              type: 'system',
              content: `${data.userName}님이 나갔습니다.`,
              time: new Date().toISOString()
            }])
            
            // 온라인 사용자 목록에서 제거
            setOnlineUsers(prev => prev.filter(user => user.userId !== data.userId))
            
            // 타이핑 상태에서도 제거
            setTypingUsers(prev => prev.filter(user => user.userId !== data.userId))
          }
        } catch (error) {
          console.error('STOMP 상태 메시지 파싱 오류:', error)
        }
      })

      // 사용자 추가 (채팅방 참여) - 백엔드 WebSocketController와 연동
      stompClient.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({
          roomId: roomId,
          userId: currentUserId,
          userName: currentUserName
        })
      })

      // 타이핑 상태 폴링 시작
      startTypingPolling(roomId)
      
      // 온라인 사용자 폴링 시작
      startOnlineUsersPolling(roomId)
    }

    stompClient.onStompError = (frame) => {
      console.error('STOMP 오류:', frame)
      setIsConnected(false)
    }

    stompClient.onWebSocketError = (error) => {
      console.warn('STOMP WebSocket 연결 실패 - 백엔드 서버가 실행되지 않았을 수 있습니다:', error)
      setIsConnected(false)
    }

    stompClient.onWebSocketClose = () => {
      console.log('STOMP WebSocket 연결 해제됨')
      setIsConnected(false)
      
      // 연결이 끊어졌을 때 정리 작업
      if (typingPollingRef.current) {
        clearInterval(typingPollingRef.current)
      }
      if (onlineUsersPollingRef.current) {
        clearInterval(onlineUsersPollingRef.current)
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }

    setClient(stompClient)
    stompClient.activate()

    return () => {
      // 컴포넌트 언마운트 시 정리 작업
      isDisconnectingRef.current = true
      
      // 타이핑 폴링 중지
      if (typingPollingRef.current) {
        clearInterval(typingPollingRef.current)
      }
      
      // 온라인 사용자 폴링 중지
      if (onlineUsersPollingRef.current) {
        clearInterval(onlineUsersPollingRef.current)
      }
      
      // 타이핑 타이머 정리
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      
      // 사용자 나감 처리 (백엔드 WebSocketEventListener와 연동)
      if (stompClient.connected) {
        try {
          stompClient.publish({
            destination: '/app/chat.removeUser',
            body: JSON.stringify({
              roomId: roomId,
              userId: currentUserId,
              userName: currentUserName
            })
          })
        } catch (error) {
          console.warn('사용자 나감 메시지 전송 실패:', error)
        }
      }
      
      // STOMP 클라이언트 비활성화
      try {
        stompClient.deactivate()
      } catch (error) {
        console.warn('STOMP 클라이언트 비활성화 실패:', error)
      }
    }
  }, [roomId, currentUserId, currentUserName])

  // 타이핑 상태 폴링 함수
  const startTypingPolling = useCallback((roomId) => {
    // 기존 폴링 중지
    if (typingPollingRef.current) {
      clearInterval(typingPollingRef.current)
    }

    // 3초마다 타이핑 상태 확인
    typingPollingRef.current = setInterval(async () => {
      if (isDisconnectingRef.current) return
      
      try {
        const response = await fetch(`http://localhost:3001/api/chat/rooms/${roomId}/typing`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.users) {
            // 현재 사용자 제외하고 타이핑 상태 업데이트
            const otherTypingUsers = data.users.filter(user => user.userId !== currentUserId)
            setTypingUsers(otherTypingUsers)
          }
        }
      } catch (error) {
        console.warn('타이핑 상태 폴링 오류:', error)
      }
    }, 3000)
  }, [currentUserId])

  // 온라인 사용자 폴링 함수
  const startOnlineUsersPolling = useCallback((roomId) => {
    // 기존 폴링 중지
    if (onlineUsersPollingRef.current) {
      clearInterval(onlineUsersPollingRef.current)
    }

    // 5초마다 온라인 사용자 상태 확인
    onlineUsersPollingRef.current = setInterval(async () => {
      if (isDisconnectingRef.current) return
      
      try {
        const response = await fetch(`http://localhost:3001/api/chat/rooms/${roomId}/users/online`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.users) {
            setOnlineUsers(data.users)
          }
        }
      } catch (error) {
        console.warn('온라인 사용자 폴링 오류:', error)
      }
    }, 5000)
  }, [])

  // 타이핑 상태 전송
  const handleTyping = useCallback(() => {
    if (!client || !isConnected || isDisconnectingRef.current) return

    // 타이핑 시작 알림
    client.publish({
      destination: '/app/chat.typing',
      body: JSON.stringify({
        roomId: roomId,
        userId: currentUserId,
        userName: currentUserName,
        isTyping: true
      })
    })

    // 타이핑 중지 타이머 리셋
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (client && isConnected && !isDisconnectingRef.current) {
        client.publish({
          destination: '/app/chat.typing',
          body: JSON.stringify({
            roomId: roomId,
            userId: currentUserId,
            userName: currentUserName,
            isTyping: false
          })
        })
      }
    }, 1000)
  }, [client, isConnected, roomId, currentUserId, currentUserName])

  // 메시지 전송
  const sendMessage = useCallback((content) => {
    if (!client || !isConnected || !content.trim() || isDisconnectingRef.current) return

    // 메시지 전송
    client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify({
        roomId: roomId,
        userId: currentUserId,
        userName: currentUserName,
        content: content.trim()
      })
    })

    // 로컬 메시지 목록에 추가 (백엔드에서 응답을 받으면 업데이트됨)
    const localMessage = {
      id: Date.now(),
      content: content.trim(),
      sender: { id: currentUserId, name: currentUserName },
      time: new Date().toISOString(),
      isMe: true,
      type: 'message'
    }
    setMessages(prev => [...prev, localMessage])

    // 타이핑 상태 제거
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    client.publish({
      destination: '/app/chat.typing',
      body: JSON.stringify({
        roomId: roomId,
        userId: currentUserId,
        userName: currentUserName,
        isTyping: false
      })
    })
  }, [client, isConnected, roomId, currentUserId, currentUserName])

  return {
    messages,
    typingUsers,
    onlineUsers,
    sendMessage,
    handleTyping,
    isConnected
  }
} 