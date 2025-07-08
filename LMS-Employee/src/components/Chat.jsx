"use client"
import { useState, useRef, useEffect } from "react"
import "../styles/Chat.css"

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "김선생님",
      message: "안녕하세요! 오늘 과제 관련해서 질문이 있습니다.",
      time: "14:30",
      isMe: false,
      avatar: "👩‍🏫",
    },
    {
      id: 2,
      sender: "나",
      message: "네, 무엇이든 물어보세요!",
      time: "14:32",
      isMe: true,
      avatar: "👤",
    },
    {
      id: 3,
      sender: "김선생님",
      message: "React 컴포넌트 과제에서 useState 사용법이 헷갈립니다.",
      time: "14:33",
      isMe: false,
      avatar: "👩‍🏫",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [activeChat, setActiveChat] = useState("김선생님")
  const messagesEndRef = useRef(null)

  const chatList = [
    { name: "김선생님", lastMessage: "React 컴포넌트 과제에서...", time: "14:33", unread: 2, avatar: "👩‍🏫" },
    { name: "이학생", lastMessage: "과제 제출했습니다.", time: "13:45", unread: 0, avatar: "👨‍🎓" },
    { name: "박강사", lastMessage: "다음 주 강의 일정 확인 부탁드립니다.", time: "12:20", unread: 1, avatar: "👨‍🏫" },
    { name: "전체 공지", lastMessage: "시험 일정이 변경되었습니다.", time: "11:30", unread: 5, avatar: "📢" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const now = new Date()
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "나",
          message: newMessage,
          time: timeString,
          isMe: true,
          avatar: "👤",
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <h3>채팅</h3>
          <button className="new-chat-btn">+</button>
        </div>
        <div className="chat-list">
          {chatList.map((chat) => (
            <div
              key={chat.name}
              className={`chat-item ${activeChat === chat.name ? "active" : ""}`}
              onClick={() => setActiveChat(chat.name)}
            >
              <div className="chat-avatar">{chat.avatar}</div>
              <div className="chat-info">
                <div className="chat-name">
                  {chat.name}
                  {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                </div>
                <div className="chat-last-message">{chat.lastMessage}</div>
              </div>
              <div className="chat-time">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-main-header">
          <div className="chat-user-info">
            <div className="chat-user-avatar">👩‍🏫</div>
            <div className="chat-user-details">
              <div className="chat-user-name">{activeChat}</div>
              <div className="chat-user-status">온라인</div>
            </div>
          </div>
          <div className="chat-actions">
            <button className="chat-action-btn">📞</button>
            <button className="chat-action-btn">📹</button>
            <button className="chat-action-btn">⚙️</button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isMe ? "message-me" : "message-other"}`}>
              {!message.isMe && <div className="message-avatar">{message.avatar}</div>}
              <div className="message-content">
                {!message.isMe && <div className="message-sender">{message.sender}</div>}
                <div className="message-bubble">{message.message}</div>
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <div className="chat-input-container">
            <button type="button" className="attachment-btn">
              📎
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="chat-input"
            />
            <button type="button" className="emoji-btn">
              😊
            </button>
            <button type="submit" className="send-btn">
              ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat
